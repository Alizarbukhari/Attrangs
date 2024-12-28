# dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session # type: ignore
from jose import JWTError # type: ignore
from ..auth.auth import decode_access_token
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
    user = db.query(User_Register).filter(User_Register.id == token_data.user_id).first()
    if user is None:
        raise credentials_exception
    return user

