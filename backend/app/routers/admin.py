from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.security import require_admin
from app.database import get_db
from app.models.booking import Booking
from app.models.user import User
from app.models.vehicle import Vehicle
from app.schemas.user import UserResponse, UserStatusUpdate


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# =========================
# ADMIN - Get All Users
# =========================

@router.get(
    "/users",
    response_model=list[UserResponse]
)
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    users = (
        db.query(User)
        .all()
    )

    return users


# =========================
# ADMIN - Update User Status
# =========================

@router.put(
    "/users/{user_id}/status",
    response_model=UserResponse
)
def update_user_status(
    user_id: int,
    user_data: UserStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.is_active = user_data.is_active

    db.commit()
    db.refresh(user)

    return user


# =========================
# ADMIN - Dashboard Statistics
# =========================

@router.get("/statistics")
def get_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    total_users = (
        db.query(User)
        .count()
    )

    total_vehicles = (
        db.query(Vehicle)
        .count()
    )

    total_bookings = (
        db.query(Booking)
        .count()
    )

    confirmed_bookings = (
        db.query(Booking)
        .filter(
            Booking.status == "Confirmed"
        )
        .count()
    )

    completed_bookings = (
        db.query(Booking)
        .filter(
            Booking.status == "Completed"
        )
        .count()
    )

    cancelled_bookings = (
        db.query(Booking)
        .filter(
            Booking.status == "Cancelled"
        )
        .count()
    )

    total_revenue = (
        db.query(Booking)
        .filter(
            Booking.status == "Completed"
        )
        .with_entities(
            Booking.total_price
        )
        .all()
    )

    revenue = sum(
        booking[0]
        for booking in total_revenue
    )

    return {
        "total_users": total_users,
        "total_vehicles": total_vehicles,
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed_bookings,
        "completed_bookings": completed_bookings,
        "cancelled_bookings": cancelled_bookings,
        "total_revenue": revenue
    }