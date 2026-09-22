from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.booking import Booking

from app.routers.auth import router as auth_router
from app.routers.vehicles import router as vehicle_router
from app.routers.bookings import router as booking_router
from app.routers.users import router as user_router
from app.routers.admin import router as admin_router


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Vehicle Rental Management API"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth_router)
app.include_router(vehicle_router)
app.include_router(booking_router)
app.include_router(user_router)
app.include_router(admin_router)


@app.get("/")
def root():
    return {
        "message": "Vehicle Rental API is running"
    }