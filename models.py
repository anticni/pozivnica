from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from database import Base


class Guest(Base):
    __tablename__ = 'guests'

    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    guest_name = Column(String)
    confirmed = Column(Boolean)
