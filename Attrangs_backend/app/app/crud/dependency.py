# dependencies.py

from datetime import timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session # type: ignore
from jose import JWTError # type: ignore
from ..auth.auth import decode_access_token, create_access_token
from ..schema.schema import User_Register
from ..database.db import get_session
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = decode_access_token(token)
    if token_data is None:
        raise credentials_exception
    user = db.query(User_Register).filter(User_Register.id == token_data.user_id).first() # type: ignore
    if user is None:
        raise credentials_exception
    return user

async def refresh_token(refresh_token: str, db: Session = Depends(get_session)):
    try:
        # Verify refresh token
        token_data = decode_access_token(refresh_token)
        if not token_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Get user from database
        user = db.query(User_Register).filter(
            User_Register.id == token_data.user_id # type: ignore
        ).first() # type: ignore
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        # Create new access token
        access_token = create_access_token(
            data={"user_id": user.id},
            expires_delta=timedelta(minutes=1)  # Short lived access token
        )
        
        # Create new refresh token
        new_refresh_token = create_access_token(
            data={"user_id": user.id},
            expires_delta=timedelta(minutes=1)  # Longer lived refresh token
        )
        
        return {
            "access_token": access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer"
        }
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate refresh token"
        )

