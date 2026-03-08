# API Specification

## Get Today Data

GET /api/today

Return
- brain_dump_entries
- daily_plan
- review


## Brain Dump

GET /api/brain-dump?date=YYYY-MM-DD

POST /api/brain-dump

Body

{
  "date": "2026-03-08",
  "content": "FastAPI 공부"
}

DELETE /api/brain-dump/{id}


## Daily Plan

POST /api/daily-plan

Body

{
  "date": "2026-03-08",
  "tasks": [
    {
      "content": "FastAPI 공부",
      "estimated_minutes": 120
    }
  ]
}


GET /api/daily-plan?date=YYYY-MM-DD


## Big3 Task Update

PATCH /api/big3-task/{id}

Body

{
  "estimated_minutes": 90,
  "is_completed": true
}


## Review

GET /api/review?date=YYYY-MM-DD

POST /api/review

Body

{
  "date": "2026-03-08",
  "memo": "오늘은 집중이 잘됐다"
}


## History

GET /api/history

Return

[
  {
    "date": "2026-03-08",
    "tasks": [],
    "review": ""
  }
]