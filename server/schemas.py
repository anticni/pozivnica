from pydantic import BaseModel


class GuestConfirmationRequest(BaseModel):
    first_name: str
    last_name: str
    guest_first_name: str = None
    guest_last_name: str = None
