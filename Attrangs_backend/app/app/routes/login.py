from fastapi import APIRouter, Depends, HTTPException, status, Body # type: ignore
from sqlmodel import Session  # type: ignore
from fastapi.security import OAuth2PasswordRequestForm # type: ignore
from ..crud.crud import authenticate_user
from ..auth.auth import create_access_token, SECRET_KEY, ALGORITHM
from datetime import timedelta
from ..database.db import get_session
from ..crud.dependency import create_access_token
from jose import jwt, JWTError # type: ignore
from fastapi import Request # type: ignore

router = APIRouter()

@router.post("/login")
async def login(
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
    access_token = create_access_token(
        data={"user_id": user.id},
        expires_delta=timedelta(minutes=1)
    )
    refresh_token = create_access_token(
        data={"user_id": user.id},
        expires_delta=timedelta(minutes=1)
    )
    
    print("Generated tokens:", {
        "access_token": access_token,
        "refresh_token": refresh_token
    })
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "firstName": user.first_name,
        "lastName": user.last_name
    }

@router.post("/refresh")
async def refresh_token(
    refresh_token: dict = Body(...),
    db: Session = Depends(get_session)
):
    try:
        # Debug print
        print("Received refresh request with data:", refresh_token)
        
        token = refresh_token.get("refresh_token")
        if not token:
            print("No refresh token in request")
            raise HTTPException(status_code=401, detail="No refresh token provided")

        # Debug print
        print("Attempting to decode token:", token)
        
        payload = jwt.decode(
            token,
            SECRET_KEY,  # Make sure this matches your login endpoint
            algorithms=[ALGORITHM]
        )
        
        print("Decoded payload:", payload)
        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token format")

        # Create new tokens
        new_access_token = create_access_token(
            data={"user_id": user_id},
            expires_delta=timedelta(minutes=2)
        )
        
        new_refresh_token = create_access_token(
            data={"user_id": user_id},
            expires_delta=timedelta(minutes=5)
        )

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token
        }

    except JWTError as e:
        print(f"JWT Error: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid refresh token: {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
