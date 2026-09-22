from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class UserStatusUpdate(BaseModel):
    is_active: bool