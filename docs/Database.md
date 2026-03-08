# Database Schema

## BrainDumpEntry

사용자가 Brain Dump 단계에서 입력한 항목

Fields

- id
- date
- content
- created_at


## DailyPlan

하루 계획

Fields

- id
- date
- created_at


## Big3Task

DailyPlan에 포함된 Big 3 작업

Fields

- id
- daily_plan_id
- content
- estimated_minutes
- is_completed
- sort_order


## DailyReview

하루 회고

Fields

- id
- date
- memo
- created_at
- updated_at


## Relationships

DailyPlan
1
↓
3 Big3Task

BrainDumpEntry
여러 개 가능

DailyReview
하루 하나