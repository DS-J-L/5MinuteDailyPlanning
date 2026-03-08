# 5MinuteDailyPlanning

Fullstack MVP for the 5-Minute Daily Planning App defined in `docs/`.

## Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: FastAPI + SQLAlchemy + SQLite

## Project Structure

- `frontend/` React SPA with route flow for Home, Brain Dump, Pick Big 3, Estimate, Today, Review, and History
- `backend/` FastAPI API with router-based structure, SQLAlchemy models, SQLite persistence, and JSON responses
- `docs/` product and implementation specifications used to generate the app

## Run Backend

From the repository root:

```powershell
backend\.venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir backend
```

If the local virtual environment does not exist yet:

```powershell
python -m venv backend/.venv
backend\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
```

The SQLite database file is created automatically at `backend/planner.db`.

## Run Frontend

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

The frontend runs on `http://localhost:5173` and targets `http://localhost:8000` by default.

To override the API base URL, create `frontend/.env` with:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Production Build

```powershell
cd frontend
npm.cmd run build
```

## Implemented API

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
