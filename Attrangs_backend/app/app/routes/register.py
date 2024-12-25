# routers/register.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session # type: ignore
from ..schema.schema import User_Create_Register
from ..crud.crud import get_user_by_username, get_user_by_email, create_user
from ..database.db import get_session

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
