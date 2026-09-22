from datetime import datetime

from sqlalchemy import Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    vehicle_id = Column(
        Integer,
        ForeignKey("vehicles.id"),
        nullable=False
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    days = Column(
        Integer,
        nullable=False
    )

    price_per_day = Column(
        Float,
        nullable=False
    )

    total_price = Column(
        Float,
        nullable=False
    )

    status = Column(
        String(30),
        default="Pending",
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="bookings"
    )

    vehicle = relationship(
        "Vehicle",
        back_populates="bookings"
    )