from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.security import get_current_user, require_admin
from app.database import get_db
from app.models.booking import Booking
from app.models.user import User
from app.models.vehicle import Vehicle
from app.schemas.booking import BookingCreate, BookingResponse, BookingUpdate


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


# =========================
# CUSTOMER - Create Booking
# =========================

@router.post(
    "/",
    response_model=BookingResponse,
    status_code=201
)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.id == booking_data.vehicle_id)
        .first()
    )

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    if booking_data.start_date >= booking_data.end_date:
        raise HTTPException(
            status_code=400,
            detail="End date must be after start date"
        )

    if vehicle.vehicle_status != "Active":
        raise HTTPException(
            status_code=400,
            detail="Vehicle is not active"
        )

    existing_booking = (
        db.query(Booking)
        .filter(
            Booking.vehicle_id == booking_data.vehicle_id,
            Booking.status.in_(
                ["Pending", "Confirmed", "Active"]
            ),
            Booking.start_date < booking_data.end_date,
            Booking.end_date > booking_data.start_date
        )
        .first()
    )

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="Vehicle is already booked for these dates"
        )

    days = (
        booking_data.end_date
        - booking_data.start_date
    ).days

    total_price = days * vehicle.price_per_day

    new_booking = Booking(
        user_id=current_user.id,
        vehicle_id=booking_data.vehicle_id,
        start_date=booking_data.start_date,
        end_date=booking_data.end_date,
        days=days,
        price_per_day=vehicle.price_per_day,
        total_price=total_price,
        status="Pending"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return new_booking


# =========================
# CUSTOMER - Get Own Bookings
# =========================

@router.get(
    "/",
    response_model=list[BookingResponse]
)
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    bookings = (
        db.query(Booking)
        .filter(
            Booking.user_id == current_user.id
        )
        .all()
    )

    return bookings


# =========================
# CUSTOMER - Get One Booking
# =========================

@router.get(
    "/{booking_id}",
    response_model=BookingResponse
)
def get_my_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id,
            Booking.user_id == current_user.id
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    return booking


# =========================
# ADMIN - Get All Bookings
# =========================

@router.get(
    "/admin/all",
    response_model=list[BookingResponse]
)
def get_all_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    bookings = (
        db.query(Booking)
        .all()
    )

    return bookings


# =========================
# ADMIN - Update Booking Status
# =========================

@router.put(
    "/admin/{booking_id}",
    response_model=BookingResponse
)
def update_booking_status(
    booking_id: int,
    booking_data: BookingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    if booking_data.status is not None:
        allowed_statuses = [
            "Pending",
            "Confirmed",
            "Active",
            "Completed",
            "Cancelled"
        ]

        if booking_data.status not in allowed_statuses:
            raise HTTPException(
                status_code=400,
                detail="Invalid booking status"
            )

        booking.status = booking_data.status

    db.commit()
    db.refresh(booking)
    
    
    # CUSTOMER - Cancel Own Booking
@router.put(
    "/{booking_id}/cancel",
    response_model=BookingResponse
)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = (
        db.query(Booking)
        .filter(
            Booking.id == booking_id,
            Booking.user_id == current_user.id
        )
        .first()
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    if booking.status not in ["Pending", "Confirmed"]:
        raise HTTPException(
            status_code=400,
            detail="This booking cannot be cancelled"
        )

    booking.status = "Cancelled"

    db.commit()
    db.refresh(booking)

    return booking

    