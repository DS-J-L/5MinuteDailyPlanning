# 5MinuteDailyPlanning

`docs/` 명세를 기준으로 구현한 5분 데일리 플래닝 풀스택 프로젝트입니다.

하루 계획을 복잡하게 세우는 대신, 짧은 시간 안에 생각을 정리하고 중요한 3가지에 집중할 수 있도록 설계했습니다.

## 주요 기능

- 브레인 덤프: 해야 할 일과 떠오르는 생각을 빠르게 기록
- Big 3 선택: 브레인 덤프 목록에서 오늘 가장 중요한 3가지 선택
- 예상 시간 입력: 선택한 3개 작업의 소요 시간을 분 단위로 입력
- 오늘 계획 확인: Big 3, 총 예상 시간, 완료 상태를 한 화면에서 확인
- 하루 회고 작성: 하루를 마무리하며 짧은 메모 저장
- 기록 조회: 날짜별 계획과 회고를 최신순으로 확인

## 기술 스택

- 프런트엔드: React + Vite + TypeScript + Tailwind CSS
- 백엔드: FastAPI + SQLAlchemy + SQLite

## 프로젝트 구조

- `frontend/`: 사용자 화면과 라우팅, API 연동, UI 컴포넌트
- `backend/`: API 서버, 라우터, DB 모델, 스키마
- `docs/`: PRD, 아키텍처, API, DB, 구현 계획 문서

간단한 구조:

```text
5MinuteDailyPlanning/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ lib/
│  │  └─ types/
│  ├─ package.json
│  └─ vercel.json
├─ backend/
│  ├─ routers/
│  ├─ main.py
│  ├─ app.py
│  ├─ models.py
│  ├─ schemas.py
│  ├─ database.py
│  └─ requirements.txt
└─ docs/
```

## 로컬 실행

### 백엔드

저장소 루트에서 실행:

```powershell
backend\.venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir backend
```

가상환경이 없다면 먼저:

```powershell
python -m venv backend/.venv
backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
```

SQLite 파일은 `backend/planner.db` 로 자동 생성됩니다.

### 프런트엔드

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

기본 프런트엔드 주소는 `http://localhost:5173`, 기본 API 주소는 `http://localhost:8000` 입니다.

다른 API 주소를 쓰려면 `frontend/.env` 파일을 만들고 아래 값을 넣으세요.

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 빌드

```powershell
cd frontend
npm.cmd run build
```

## 구현된 API

- `GET /api/today`
- `GET /api/brain-dump?date=YYYY-MM-DD`
- `POST /api/brain-dump`
- `DELETE /api/brain-dump/{id}`
- `GET /api/daily-plan?date=YYYY-MM-DD`
- `POST /api/daily-plan`
- `PATCH /api/big3-task/{id}`
- `GET /api/review?date=YYYY-MM-DD`
- `POST /api/review`
- `GET /api/history`

## Vercel 배포 준비

현재 구조는 `frontend` 와 `backend` 를 각각 별도 Vercel 프로젝트로 연결하는 방식에 맞춰 준비했습니다.

### 프런트엔드 프로젝트

- Vercel에서 Root Directory를 `frontend` 로 설정
- `frontend/vercel.json` 으로 React Router SPA 새로고침 경로를 `index.html` 로 rewrite
- 환경 변수 `VITE_API_BASE_URL` 에 백엔드 배포 URL 설정

### 백엔드 프로젝트

- Vercel에서 Root Directory를 `backend` 로 설정
- `backend/app.py` 에서 FastAPI `app` 을 export 하므로 Vercel이 엔트리포인트를 바로 인식 가능
- `backend/.python-version` 으로 Python 3.12 고정
- 필요하면 `CORS_ORIGINS` 환경 변수에 프런트엔드 도메인을 쉼표로 구분해 설정

예시:

```env
CORS_ORIGINS=https://your-frontend-project.vercel.app,http://localhost:5173
```

## SQLite와 Vercel 주의사항

이 프로젝트는 명세에 맞춰 SQLite로 구현되어 로컬 실행에는 적합합니다.

다만 Vercel Functions 환경에서는 SQLite 같은 로컬 파일 기반 DB를 영구 저장소로 사용할 수 없습니다. 실제 운영 배포까지 고려한다면, 백엔드는 나중에 PostgreSQL 계열(예: Neon, Supabase Postgres)로 바꾸는 것이 안전합니다. 프런트엔드는 지금 상태 그대로 Vercel에 배포해도 문제 없습니다.
