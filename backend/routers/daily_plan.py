from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

import models
import schemas
from api_response import success_response
from database import get_db


router = APIRouter(tags=["daily-plan"])


def serialize_daily_plan(plan: models.DailyPlan | None) -> dict | None:
    if plan is None:
        return None
    return schemas.DailyPlanRead.model_validate(plan).model_dump(mode="json")


@router.get("/api/today")
def get_today_data(
    selected_date: date | None = Query(default=None, alias="date"),
    db: Session = Depends(get_db),
) -> dict:
    target_date = selected_date or date.today()

    entries = (
        db.query(models.BrainDumpEntry)
        .filter(models.BrainDumpEntry.date == target_date)
        .order_by(models.BrainDumpEntry.created_at.asc(), models.BrainDumpEntry.id.asc())
        .all()
    )
    plan = db.query(models.DailyPlan).filter(models.DailyPlan.date == target_date).first()
    review = db.query(models.DailyReview).filter(models.DailyReview.date == target_date).first()

    payload = schemas.TodayData(
        date=target_date,
        brain_dump_entries=[schemas.BrainDumpEntryRead.model_validate(entry) for entry in entries],
        daily_plan=schemas.DailyPlanRead.model_validate(plan) if plan else None,
        review=schemas.DailyReviewRead.model_validate(review) if review else None,
    ).model_dump(mode="json")
    return success_response(payload)


@router.post("/api/daily-plan")
def create_daily_plan(
    plan_data: schemas.DailyPlanCreate,
    response: Response,
    db: Session = Depends(get_db),
) -> dict:
    existing_plan = db.query(models.DailyPlan).filter(models.DailyPlan.date == plan_data.date).first()

    if existing_plan is None:
        plan = models.DailyPlan(date=plan_data.date)
        db.add(plan)
        db.flush()
    else:
        plan = existing_plan
        plan.tasks.clear()
        db.flush()

    for index, task in enumerate(plan_data.tasks):
        plan.tasks.append(
            models.Big3Task(
                content=task.content,
                estimated_minutes=task.estimated_minutes,
                is_completed=False,
                sort_order=index,
            )
        )

    db.commit()
    db.refresh(plan)
    payload = serialize_daily_plan(plan)
    response.status_code = status.HTTP_200_OK if existing_plan else status.HTTP_201_CREATED
    return success_response(payload)


@router.get("/api/daily-plan")
def get_daily_plan(selected_date: date = Query(alias="date"), db: Session = Depends(get_db)) -> dict:
    plan = db.query(models.DailyPlan).filter(models.DailyPlan.date == selected_date).first()
    return success_response(serialize_daily_plan(plan))


@router.patch("/api/big3-task/{task_id}")
def update_big3_task(task_id: int, task_update: schemas.Big3TaskUpdate, db: Session = Depends(get_db)) -> dict:
    if not task_update.has_updates():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="수정할 항목을 하나 이상 보내주세요.")

    task = db.get(models.Big3Task, task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="작업을 찾을 수 없습니다.")

    if task_update.estimated_minutes is not None:
        task.estimated_minutes = task_update.estimated_minutes
    if task_update.is_completed is not None:
        task.is_completed = task_update.is_completed

    db.commit()
    db.refresh(task)
    payload = schemas.Big3TaskRead.model_validate(task).model_dump(mode="json")
    return success_response(payload)
