from datetime import date

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

import models
import schemas
from api_response import success_response
from database import get_db


router = APIRouter(prefix="/api/review", tags=["review"])


@router.get("")
def get_review(selected_date: date = Query(alias="date"), db: Session = Depends(get_db)) -> dict:
    review = db.query(models.DailyReview).filter(models.DailyReview.date == selected_date).first()
    payload = schemas.DailyReviewRead.model_validate(review).model_dump(mode="json") if review else None
    return success_response(payload)


@router.post("")
def create_review(review_data: schemas.ReviewCreate, response: Response, db: Session = Depends(get_db)) -> dict:
    review = db.query(models.DailyReview).filter(models.DailyReview.date == review_data.date).first()

    if review is None:
        review = models.DailyReview(date=review_data.date, memo=review_data.memo)
        db.add(review)
        response.status_code = status.HTTP_201_CREATED
    else:
        review.memo = review_data.memo
        response.status_code = status.HTTP_200_OK

    db.commit()
    db.refresh(review)
    payload = schemas.DailyReviewRead.model_validate(review).model_dump(mode="json")
    return success_response(payload)
