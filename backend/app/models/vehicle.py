from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    brand = Column(
        String(100),
        nullable=False
    )

    model = Column(
        String(100),
        nullable=False
    )

    manufacturing_year = Column(
        Integer,
        nullable=False
    )

    registration_number = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    category = Column(
        String(50),
        nullable=False
    )

    transmission = Column(
        String(30),
        nullable=False
    )

    fuel = Column(
        String(30),
        nullable=False
    )

    seats = Column(
        Integer,
        nullable=False
    )

    price_per_day = Column(
        Float,
        nullable=False
    )

    image = Column(
        String(255),
        nullable=True
    )

    mileage = Column(
        Float,
        nullable=True
    )

    color = Column(
        String(50),
        nullable=True
    )

    availability_status = Column(
        String(30),
        default="Available",
        nullable=False
    )

    vehicle_status = Column(
        String(30),
        default="Active",
        nullable=False
    )

    bookings = relationship(
        "Booking",
        back_populates="vehicle"
    )