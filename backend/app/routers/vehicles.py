from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.security import require_admin
from app.database import get_db
from app.models.user import User
from app.models.vehicle import Vehicle
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleResponse
)


router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)


# GET ALL VEHICLES + SEARCH + FILTER
@router.get(
    "/",
    response_model=list[VehicleResponse]
)
def get_vehicles(
    brand: Optional[str] = None,
    category: Optional[str] = None,
    transmission: Optional[str] = None,
    fuel: Optional[str] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Vehicle)

    # Brand filter
    if brand:
        query = query.filter(
            Vehicle.brand.ilike(f"%{brand}%")
        )

    # Category filter
    if category:
        query = query.filter(
            Vehicle.category.ilike(f"%{category}%")
        )

    # Transmission filter
    if transmission:
        query = query.filter(
            Vehicle.transmission.ilike(f"%{transmission}%")
        )

    # Fuel filter
    if fuel:
        query = query.filter(
            Vehicle.fuel.ilike(f"%{fuel}%")
        )

    # Maximum price filter
    if max_price is not None:
        query = query.filter(
            Vehicle.price_per_day <= max_price
        )

    return query.all()


# GET ONE VEHICLE
@router.get(
    "/{vehicle_id}",
    response_model=VehicleResponse
)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    return vehicle


# CREATE VEHICLE - ADMIN ONLY
@router.post(
    "/",
    response_model=VehicleResponse,
    status_code=201
)
def create_vehicle(
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    existing_vehicle = (
        db.query(Vehicle)
        .filter(
            Vehicle.registration_number
            == vehicle_data.registration_number
        )
        .first()
    )

    if existing_vehicle:
        raise HTTPException(
            status_code=400,
            detail="Registration number already exists"
        )

    new_vehicle = Vehicle(
        **vehicle_data.model_dump()
    )

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return new_vehicle


# UPDATE VEHICLE - ADMIN ONLY
@router.put(
    "/{vehicle_id}",
    response_model=VehicleResponse
)
def update_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    update_data = vehicle_data.model_dump(
        exclude_unset=True
    )

    if "registration_number" in update_data:
        existing_vehicle = (
            db.query(Vehicle)
            .filter(
                Vehicle.registration_number
                == update_data["registration_number"],
                Vehicle.id != vehicle_id
            )
            .first()
        )

        if existing_vehicle:
            raise HTTPException(
                status_code=400,
                detail="Registration number already exists"
            )

    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.commit()
    db.refresh(vehicle)

    return vehicle


# DELETE VEHICLE - ADMIN ONLY
@router.delete(
    "/{vehicle_id}"
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    db.delete(vehicle)
    db.commit()

    return {
        "message": "Vehicle deleted successfully"
    }