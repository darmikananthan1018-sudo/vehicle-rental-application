from typing import Optional

from pydantic import BaseModel


class VehicleCreate(BaseModel):
    name: str
    brand: str
    model: str
    manufacturing_year: int
    registration_number: str
    category: str
    transmission: str
    fuel: str
    seats: int
    price_per_day: float
    image: Optional[str] = None
    mileage: Optional[float] = None
    color: Optional[str] = None
    availability_status: str = "Available"
    vehicle_status: str = "Active"


class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    manufacturing_year: Optional[int] = None
    registration_number: Optional[str] = None
    category: Optional[str] = None
    transmission: Optional[str] = None
    fuel: Optional[str] = None
    seats: Optional[int] = None
    price_per_day: Optional[float] = None
    image: Optional[str] = None
    mileage: Optional[float] = None
    color: Optional[str] = None
    availability_status: Optional[str] = None
    vehicle_status: Optional[str] = None


class VehicleResponse(BaseModel):
    id: int
    name: str
    brand: str
    model: str
    manufacturing_year: int
    registration_number: str
    category: str
    transmission: str
    fuel: str
    seats: int
    price_per_day: float
    image: Optional[str]
    mileage: Optional[float]
    color: Optional[str]
    availability_status: str
    vehicle_status: str

    model_config = {
        "from_attributes": True
    }