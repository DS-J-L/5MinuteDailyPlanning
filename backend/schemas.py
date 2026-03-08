from datetime import date, datetime
from typing import Any

from pydantic import BaseModel, Field, field_validator


class BrainDumpCreate(BaseModel):
    date: date
    content: str = Field(min_length=1, max_length=500)

    @field_validator("content")
    @classmethod
    def strip_content(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("내용을 입력해주세요.")
        return cleaned


class BrainDumpEntryRead(BaseModel):
    id: int
    date: date
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class Big3TaskCreate(BaseModel):
    content: str = Field(min_length=1, max_length=255)
    estimated_minutes: int = Field(gt=0, le=1440)

    @field_validator("content")
    @classmethod
    def strip_content(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("작업 내용을 입력해주세요.")
        return cleaned


class DailyPlanCreate(BaseModel):
    date: date
    tasks: list[Big3TaskCreate]

    @field_validator("tasks")
    @classmethod
    def validate_tasks(cls, value: list[Big3TaskCreate]) -> list[Big3TaskCreate]:
        if len(value) != 3:
            raise ValueError("하루 계획에는 정확히 3개의 작업이 필요합니다.")
        return value


class Big3TaskUpdate(BaseModel):
    estimated_minutes: int | None = Field(default=None, gt=0, le=1440)
    is_completed: bool | None = None

    @field_validator("is_completed", mode="before")
    @classmethod
    def validate_non_empty_update(cls, value: Any) -> Any:
        return value

    def has_updates(self) -> bool:
        return self.estimated_minutes is not None or self.is_completed is not None


class Big3TaskRead(BaseModel):
    id: int
    content: str
    estimated_minutes: int
    is_completed: bool
    sort_order: int

    model_config = {"from_attributes": True}


class DailyPlanRead(BaseModel):
    id: int
    date: date
    created_at: datetime
    tasks: list[Big3TaskRead]

    model_config = {"from_attributes": True}


class ReviewCreate(BaseModel):
    date: date
    memo: str = Field(default="", max_length=5000)


class DailyReviewRead(BaseModel):
    id: int
    date: date
    memo: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class TodayData(BaseModel):
    date: date
    brain_dump_entries: list[BrainDumpEntryRead]
    daily_plan: DailyPlanRead | None
    review: DailyReviewRead | None


class HistoryItem(BaseModel):
    date: date
    tasks: list[Big3TaskRead]
    review: str
