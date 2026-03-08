# Implementation Plan

이 문서는 LLM이 프로젝트를 구현할 때 따를 단계별 계획을 정의한다.
목표는 전체 시스템을 안정적으로 생성하는 것이다.

---

# Phase 1: Project Setup

## Backend

backend 폴더 생성

필수 파일

backend/
main.py
database.py
models.py
schemas.py

routers/
brain_dump.py
daily_plan.py
review.py
history.py

requirements.txt

설치 패키지

fastapi
uvicorn
sqlalchemy
pydantic

---

## Frontend

frontend 폴더 생성

Vite + React + TypeScript 프로젝트

설치

npm create vite@latest
React + TypeScript 선택

추가 패키지

react-router-dom
tailwindcss

---

# Phase 2: Database Layer

SQLAlchemy 모델 생성

models.py

테이블

BrainDumpEntry
DailyPlan
Big3Task
DailyReview

관계

DailyPlan → Big3Task (1:N)

---

# Phase 3: Backend API

FastAPI router 생성

routers/

brain_dump.py
daily_plan.py
review.py
history.py

각 router는 다음 API를 포함한다.

Brain Dump

GET /api/brain-dump
POST /api/brain-dump
DELETE /api/brain-dump/{id}

Daily Plan

POST /api/daily-plan
GET /api/daily-plan

Big3 Task

PATCH /api/big3-task/{id}

Review

GET /api/review
POST /api/review

History

GET /api/history

---

# Phase 4: Frontend Layout

React Router 설정

Pages

Home
BrainDump
PickBig3
Estimate
Today
Review
History

---

# Phase 5: Brain Dump Feature

BrainDump 페이지 구현

기능

- 입력 필드
- 항목 추가
- 항목 삭제
- 목록 표시
- 2분 타이머

API 연결

POST /api/brain-dump

---

# Phase 6: Big 3 Selection

PickBig3 페이지 구현

기능

- Brain Dump 목록 표시
- 최대 3개 선택
- 선택 강조
- 정확히 3개 선택해야 다음 단계 가능

---

# Phase 7: Time Estimation

Estimate 페이지 구현

기능

각 Big3에 대해

estimated_minutes 입력

총 예상 시간 계산

예

약 2시간 30분

---

# Phase 8: Today Plan Page

Today 페이지 구현

표시

- Big3
- 예상 시간
- 완료 체크박스

API

PATCH /api/big3-task/{id}

---

# Phase 9: Daily Review

Review 페이지 구현

textarea 제공

기능

- 회고 작성
- 저장
- 수정

API

POST /api/review

---

# Phase 10: History Page

History 페이지 구현

표시

날짜 카드

카드 내용

- 날짜
- Big3
- 예상 시간
- 완료 상태
- 회고 메모

정렬

최신 날짜 먼저

---

# Phase 11: API Integration

frontend/services/api.ts 생성

함수

getToday()
createBrainDump()
createDailyPlan()
updateBig3Task()
createReview()
getHistory()

---

# Phase 12: Final Checks

확인 사항

- Backend 정상 실행
- Frontend 정상 실행
- API 연결 정상
- SQLite 자동 생성
- 데이터 정상 저장

---

# Expected Result

완성된 앱은 다음 기능을 제공한다.

1. Brain Dump
2. Big 3 선택
3. 예상 시간 입력
4. 오늘 계획 확인
5. 완료 체크
6. 하루 회고
7. 기록 조회

---

# Out of Scope

이번 MVP에서는 다음 기능 제외

- 로그인
- 알림
- 팀 협업
- 뽀모도로 타이머
- 통계 차트
- 캘린더