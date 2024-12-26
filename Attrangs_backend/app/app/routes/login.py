from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session  # type: ignore
from fastapi.security import OAuth2PasswordRequestForm
from ..schema.schema import Token, User_Out, User_Login
from ..crud.crud import authenticate_user
from ..auth.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from ..database.db import get_session

router = APIRouter()

@router.post("/login", response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_session)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"user_id": user.id}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "firstName": user.first_name,
        "lastName": user.last_name
        # Include username in the response
    }
