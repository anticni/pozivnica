import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.staticfiles import StaticFiles

import crud
import models
from database import SessionLocal, engine
from schemas import GuestConfirmationRequest

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/guests')
def get_all_guests(db: Session = Depends(get_db)):
    return crud.get_guests(db)


@app.post('/guests/confirm')
def read_user(request: GuestConfirmationRequest, db: Session = Depends(get_db)):
    crud.confirm_guest(db, request)
    return {"ko_ovo_gleda": "duckator je"}


# mount the frontend after the routes so we can use the api also
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
