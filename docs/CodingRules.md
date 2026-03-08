# Coding Rules

이 문서는 LLM이 코드를 생성할 때 지켜야 하는 규칙을 정의한다.

---

# General Rules

- 코드 가독성을 최우선으로 한다
- 불필요한 라이브러리 사용 금지
- 작은 파일로 분리
- 하나의 파일이 너무 커지지 않도록 한다

---

# Backend Rules

FastAPI

- router 기반 구조 사용
- API endpoint는 routers 폴더에 작성
- models / schemas 분리

SQLAlchemy

- ORM 모델은 models.py에 작성
- Base 사용

Pydantic

- 요청 / 응답 모델 정의

---

# API Rules

모든 API는 JSON 반환

HTTP status code 사용

200 success  
400 bad request  
404 not found

---

# Frontend Rules

React

- Functional component 사용
- Hooks 사용

폴더 구조

components  
pages  
services  
types

---

# Styling

TailwindCSS 사용

규칙

- 인라인 스타일 금지
- Tailwind 클래스 사용

---

# Naming Convention

React Component

PascalCase

예

BrainDumpInput  
Big3Card

함수

camelCase

예

getTodayPlan

파일

kebab-case 또는 camelCase

---

# TypeScript

가능한 모든 데이터에 타입 정의

any 사용 최소화

---

# Error Handling

Frontend

- API 실패 시 사용자 메시지 표시

Backend

- 예외 발생 시 JSON error 반환

---

# Code Generation Goal

코드는 다음 조건을 만족해야 한다

- 바로 실행 가능
- 의존성 최소화
- 구조 명확
- 확장 가능