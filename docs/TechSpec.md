# Technical Specification

## Overview

이 프로젝트는 개인용 생산성 웹앱이다.

목표:
사용자가 하루 5분만 투자하여 다음 루틴을 실행하도록 돕는다.

1. Brain Dump
2. Big 3 선택
3. 예상 시간 입력
4. 오늘 계획 실행
5. 하루 회고

Frontend와 Backend가 분리된 구조를 사용한다.

---

# Tech Stack

Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- React Router

Backend
- FastAPI
- SQLAlchemy
- Pydantic

Database
- SQLite

Communication
- REST API
- JSON

---

# Backend Design

## FastAPI 구조

backend/

main.py  
API 엔트리

database.py  
DB 연결

models.py  
SQLAlchemy 모델

schemas.py  
Pydantic 모델

routers/

brain_dump.py  
daily_plan.py  
review.py  
history.py

---

# Database Initialization

앱 실행 시 다음 동작 수행

1. SQLite 파일 생성
2. SQLAlchemy Base.metadata.create_all 실행
3. 테이블 자동 생성

---

# Date Handling

모든 데이터는 date 기준으로 관리한다.

형식

YYYY-MM-DD

예

2026-03-08

---

# Error Handling

다음 상황 처리 필요

- Big3가 3개 미만일 때
- Big3가 3개 초과일 때
- 존재하지 않는 task 수정 요청
- 잘못된 date 형식

---

# Backend Response Format

모든 API는 JSON 반환

예

{
  "success": true,
  "data": {}
}

오류

{
  "success": false,
  "error": "message"
}

---

# Frontend Architecture

React SPA

Pages

- Home
- BrainDump
- PickBig3
- EstimateTime
- Today
- Review
- History

---

# State Strategy

초기 MVP에서는 간단한 방식 사용

- React useState
- API 호출로 데이터 로드
- 페이지 이동 시 상태 갱신

---

# Styling

TailwindCSS 사용

목표

- 심플한 UI
- 카드 기반 레이아웃
- 모바일 대응

---

# Performance

MVP이므로 다음은 고려하지 않는다

- SSR
- 캐싱
- CDN
- 최적화