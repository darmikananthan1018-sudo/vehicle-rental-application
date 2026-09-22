from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class BookingCreate(BaseModel):
    vehicle_id: int
    start_date: date
    end_date: date


class BookingUpdate(BaseModel):
    status: Optional[str] = None


class BookingResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int
    start_date: date
    end_date: date
    days: int
    price_per_day: float
    total_price: float
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }