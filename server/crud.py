import unicodedata

from deta import _Base
from fastapi import HTTPException

from schemas import GuestConfirmationRequest, GuestRejectionRequest, GuestArrivalRequest


def get_all_guests(db: _Base):
    return db.fetch().items


def confirm_guest(db: _Base, request: GuestConfirmationRequest):
    first_name = unicodedata.normalize('NFKD', request.first_name.upper()).encode("ascii", "ignore").decode(
        "utf-8").replace(" ", "")
    last_name = unicodedata.normalize('NFKD', request.last_name.upper()).encode("ascii", "ignore").decode(
        "utf-8").replace(" ", "")
    query = db.fetch({"first_name": first_name, "last_name": last_name})
    if query.count == 0:
        raise HTTPException(status_code=404, detail="Nema ovog duckatora.")
    guest = query.items[0]
    updates = {
        "confirmed": True,
        "escort_name": None
    }
    if request.guest_first_name or request.guest_last_name:
        guest_first_name = None
        guest_last_name = None
        if request.guest_first_name:
            guest_first_name = unicodedata.normalize('NFKD', request.guest_first_name.upper()).encode("ascii",
                                                                                                      "ignore").decode(
                "utf-8").replace(" ", "")
        if request.guest_last_name:
            guest_last_name = unicodedata.normalize('NFKD', request.guest_last_name.upper()).encode("ascii",
                                                                                                    "ignore").decode(
                "utf-8").replace(" ", "")
        updates[
            "escort_name"] = f'{guest_first_name if guest_first_name else ""} {guest_last_name if guest_last_name else ""}'.strip()
    db.update(updates, guest.key)


def guest_rejection(db: _Base, request: GuestRejectionRequest):
    first_name = unicodedata.normalize('NFKD', request.first_name.upper()).encode("ascii", "ignore").decode(
        "utf-8").replace(" ", "")
    last_name = unicodedata.normalize('NFKD', request.last_name.upper()).encode("ascii", "ignore").decode(
        "utf-8").replace(" ", "")
    query = db.fetch({"first_name": first_name, "last_name": last_name})
    if query.count == 0:
        raise HTTPException(status_code=404, detail="Nema ovog duckatora.")
    guest = query.items[0]
    updates = {
        "confirmed": False,
        "reject_reason": request.reject_reason
    }
    db.update(updates, guest.key)


def get_confirmed_guests(db: _Base):
    return db.fetch({"confirmed": True}).items


def guest_arrived(db: _Base, request: GuestArrivalRequest):
    guest = db.get(request.key)
    if not guest:
        raise HTTPException(status_code=404, detail="Not Found!")
    if request.is_escort:
        db.update({"escort_arrived": True}, request.key)
    else:
        db.update({"guest_arrived": True}, request.key)


def count_confirmed_guests(db: _Base):
    guests = get_confirmed_guests(db)
    confirmed_guests = 0
    arrived_guests = 0
    for guest in guests:
        confirmed_guests += 1
        if guest.get("guest_arrived", None):
            arrived_guests += 1
        if guest.get("escort_arrived", None):
            arrived_guests += 1
        if guest.get("escort_name", None):
            confirmed_guests += 1
    return {"confirmed_guests": confirmed_guests,
            "arrived_guests": arrived_guests
            }
