# routers/register.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session,select # type: ignore
from typing import Optional
from pydantic import BaseModel
from ..schema.schema import User_Create_Register,User_Update,User_Register
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



@router1.put("/update-user/{user_id}", response_model=User_Update)

def update_user_data(user_id: int, update_data: User_Update, db: Session = Depends(get_session)):
    # db.execute returns a Result object, we need the actual user
    db_user = db.scalar(select(User_Register).where(User_Register.id == user_id))
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    update_dict = update_data.dict(exclude_unset=True)
    
    # Handle password hashing if password is being updated
    if "password" in update_dict:
        update_dict["password"] = pwd_context.hash(update_dict["password"])
    
    # Update only the fields provided
    for key, value in update_dict.items():
        setattr(db_user, key, value)
    
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

   
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
    # Get the user object using scalar() instead of execute()
    update_user = db.scalar(select(User_Register).where(User_Register.id == current_user.id))
    if not update_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user fields
    if request.first_name:
        update_user.first_name = request.first_name
    if request.last_name:
        update_user.last_name = request.last_name
    if request.phone:
        update_user.phone = request.phone
    if request.new_password:
        update_user.password = get_password_hash(request.new_password)
    
    # Save changes
    db.commit()
    db.refresh(update_user)
    return update_user

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