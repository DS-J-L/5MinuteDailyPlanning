from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, selectinload

import models
import schemas
from api_response import success_response
from database import get_db


router = APIRouter(prefix="/api/history", tags=["history"])


@router.get("")
def get_history(db: Session = Depends(get_db)) -> dict:
    plans = (
        db.query(models.DailyPlan)
        .options(selectinload(models.DailyPlan.tasks))
        .order_by(models.DailyPlan.date.desc())
        .all()
    )
    reviews_by_date = {
        review.date: review.memo
        for review in db.query(models.DailyReview).order_by(models.DailyReview.date.desc()).all()
    }

    payload = [
        schemas.HistoryItem(
            date=plan.date,
            tasks=[schemas.Big3TaskRead.model_validate(task) for task in plan.tasks],
            review=reviews_by_date.get(plan.date, ""),
        ).model_dump(mode="json")
        for plan in plans
    ]
    return success_response(payload)
