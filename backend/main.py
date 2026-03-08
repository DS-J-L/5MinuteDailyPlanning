from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api_response import error_response
from database import Base, engine
from routers import brain_dump, daily_plan, history, review


Base.metadata.create_all(bind=engine)

app = FastAPI(title="5-Minute Daily Planning API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(brain_dump.router)
app.include_router(daily_plan.router)
app.include_router(review.router)
app.include_router(history.router)


@app.get("/")
def read_root() -> dict:
    return {"success": True, "data": {"message": "5-Minute Daily Planning API"}}


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content=error_response(str(exc.detail)))


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    first_error = exc.errors()[0]["msg"] if exc.errors() else "Validation error."
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=error_response(first_error),
    )


@app.exception_handler(Exception)
async def general_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response(str(exc)),
    )
