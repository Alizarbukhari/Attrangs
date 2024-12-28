# routers/register.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session # type: ignore
from typing import Optional
from pydantic import BaseModel
from ..schema.schema import User_Create_Register,User_Update
from ..crud.crud import get_user_by_username, get_user_by_email, create_user,update_user_data
from ..crud.dependency import get_current_user
from ..database.db import get_session
from passlib.context import CryptContext # type: ignore

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password_hash(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)
router1 = APIRouter()

@router1.post("/register_user_register", )
def register_user(user: User_Create_Register, db: Session = Depends(get_session)):
    if user.password != user.verifyPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    existing_user = get_user_by_username(db, user.userNameId)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    existing_email = get_user_by_email(db, user.email)
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = create_user(db, user)
    return db_user



@router1.put("/update-user", response_model=User_Update)
def update_user_route(
    update_data: User_Update,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_session)
):
    
    updated_user = update_user_data(db=db,update_data=update_data,user_id=current_user.id)
    return updated_user

class PasswordVerifyRequest(BaseModel):
    current_password: str

class UpdateProfileRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    new_password: Optional[str] = None

@router1.post("/verify-password")
async def verify_password(
    request: PasswordVerifyRequest,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    # Verify current password
    if not verify_password_hash(request.current_password, current_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect"
        )
    return {"status": "success"}

@router1.put("/update-profile")
async def update_profile(
    request: UpdateProfileRequest,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    try:
        update_data = User_Update(
            first_name=request.first_name if request.first_name else current_user.first_name,
            last_name=request.last_name if request.last_name else current_user.last_name,
            email=current_user.email,  # email remains unchanged
            phone=request.phone if request.phone else current_user.phone,
            password=get_password_hash(request.new_password) if request.new_password else current_user.password
        )
        
        updated_user = update_user_data(
            db=db,
            update_data=update_data,
            user_id=current_user.id
        )
        
        return {"status": "success", "message": "Profile updated successfully"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}"
        )

@router1.get("/get-current-user")
async def get_current_user_data(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    return {
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "user_name_id": current_user.user_name_id,
        "email": current_user.email,
        "phone": current_user.phone,
        "password": current_user.password
    }