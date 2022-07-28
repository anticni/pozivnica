import unicodedata

from sqlalchemy.orm import Session


from schemas import GuestConfirmationRequest
from fastapi import HTTPException

import models


def get_guests(db: Session):
    return db.query(models.Guest).all()


def confirm_guest(db: Session, request: GuestConfirmationRequest):
    first_name = unicodedata.normalize('NFKD', request.first_name.upper()).encode("ascii", "ignore").decode("utf-8")
    last_name = unicodedata.normalize('NFKD', request.last_name.upper()).encode("ascii", "ignore").decode("utf-8")
    guest = db.query(models.Guest).filter(
        models.Guest.first_name == first_name, models.Guest.last_name == last_name).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Nema ovog duckatora.")
    guest.confirmed = True
    if request.guest_first_name or request.guest_last_name:
        guest.guest_name = f'{request.guest_first_name.upper()} {request.guest_last_name.upper()}'
    db.commit()
