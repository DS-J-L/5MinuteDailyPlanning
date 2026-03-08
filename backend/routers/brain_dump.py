from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

import models
import schemas
from api_response import success_response
from database import get_db


router = APIRouter(prefix="/api/brain-dump", tags=["brain-dump"])


@router.get("")
def get_brain_dump(selected_date: date = Query(alias="date"), db: Session = Depends(get_db)) -> dict:
    entries = (
        db.query(models.BrainDumpEntry)
        .filter(models.BrainDumpEntry.date == selected_date)
        .order_by(models.BrainDumpEntry.created_at.asc(), models.BrainDumpEntry.id.asc())
        .all()
    )
    payload = [schemas.BrainDumpEntryRead.model_validate(entry).model_dump(mode="json") for entry in entries]
    return success_response(payload)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_brain_dump(entry: schemas.BrainDumpCreate, db: Session = Depends(get_db)) -> dict:
    brain_dump_entry = models.BrainDumpEntry(date=entry.date, content=entry.content)
    db.add(brain_dump_entry)
    db.commit()
    db.refresh(brain_dump_entry)
    payload = schemas.BrainDumpEntryRead.model_validate(brain_dump_entry).model_dump(mode="json")
    return success_response(payload)


@router.delete("/{entry_id}")
def delete_brain_dump(entry_id: int, db: Session = Depends(get_db)) -> dict:
    entry = db.get(models.BrainDumpEntry, entry_id)
    if entry is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="브레인 덤프 항목을 찾을 수 없습니다.")

    db.delete(entry)
    db.commit()
    return success_response({"deleted_id": entry_id})
