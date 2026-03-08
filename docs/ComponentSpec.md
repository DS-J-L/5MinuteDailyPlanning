# React Component Specification

## Component Structure

frontend/src/

components/
pages/
services/
types/

---

# Components

## Layout

공통 레이아웃

포함

- 상단 날짜
- 페이지 컨텐츠 영역

---

## BrainDumpInput

역할

Brain Dump 항목 입력

기능

- 텍스트 입력
- 항목 추가
- 항목 삭제

Props

entries  
onAdd  
onDelete

---

## BrainDumpTimer

2분 타이머

기능

- 120초 카운트다운
- UI 표시

---

## TaskList

Brain Dump 목록 표시

Props

tasks

---

## Big3Selector

3개 선택 UI

기능

- 최대 3개 선택
- 선택 강조

Props

tasks  
selectedTasks  
onToggle

---

## TimeEstimateInput

각 Big3 시간 입력

Props

task  
onChange

---

## TotalTimeDisplay

총 예상 시간 표시

예

약 2시간 40분

---

## Big3Card

Today 화면 카드

내용

- task 이름
- 예상 시간
- 완료 체크

Props

task  
onComplete

---

## ReviewEditor

하루 회고 입력

Props

memo  
onChange

---

## HistoryCard

기록 카드

내용

- 날짜
- Big3
- 완료 상태
- 회고

---

# Services

services/api.ts

역할

API 호출

예

getToday()

createBrainDump()

createDailyPlan()

updateTask()

createReview()

getHistory()

---

# Types

types/

BrainDumpEntry

DailyPlan

Big3Task

DailyReview