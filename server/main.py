import uvicorn
from deta import Deta  # Import Deta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

import crud
from schemas import GuestConfirmationRequest, GuestRejectionRequest, GuestArrivalRequest

# Initialize with a Project Key
deta = Deta("a08nipdj_VoMCWXnP82wpoYtuF2FbVYCPEC5M4jDi")
# This how to connect to or create a database.
db = deta.Base("guests")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/guests')
def get_all_guests():
    return crud.get_all_guests(db)


@app.post('/guests/confirm')
def confirm_guest(request: GuestConfirmationRequest):
    crud.confirm_guest(db, request)
    return {"ko_ovo_gleda": "duckator je"}


@app.post('/guests/reject')
def reject_guest(request: GuestRejectionRequest):
    crud.guest_rejection(db, request)
    return {"ko_ovo_gleda": "mega duckator je"}


@app.get('/guests/confirmed')
def get_confirmed_guests():
    return crud.get_confirmed_guests(db)


@app.post('/guests/arrival')
def confirm_guest_arrival(request: GuestArrivalRequest):
    crud.guest_arrived(db, request)
    return {"response": "OK"}


@app.get('/guests/count')
def count_confirmed_guests():
    return crud.count_confirmed_guests(db)


# mount the frontend after the routes so we can use the api also
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
