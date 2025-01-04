from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import HTTPException, status
from ..schema.schema import User_Register,User_Create_Register,User_Update
from passlib.context import CryptContext  # type: ignore

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password_hash(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

def get_user_by_username(db: Session, userNameId: str):
    return db.query(User_Register).filter(User_Register.user_name_id == userNameId).first() # type: ignore

def get_user_by_email(db: Session, email: str):
    return db.query(User_Register).filter(User_Register.email == email).first() # type: ignore

def create_user(db: Session, user: User_Create_Register):
    hashed_password = pwd_context.hash(user.password)
    db_user = User_Register(
        first_name=user.firstName,
        last_name=user.lastName,
        user_name_id=user.userNameId,
        password=hashed_password,
        phone_prefix=user.phonePrefix,
        phone=user.phone,
        birth_year=user.birthYear,
        birth_month=user.birthMonth,
        birth_day=user.birthDay,
        receive_sms=user.receiveSms,
        email=user.email,
        receive_email=user.receiveEmail,
        referrer_id=user.referrerId
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and pwd_context.verify(password, user.password):
        return user
    return False

def update_user_data(db: Session, user_id: int, update_data: User_Update):
    # db.execute returns a Result object, we need the actual user
    db_user = db.scalar(select(User_Register).where(User_Register.id == user_id)) # type: ignore
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
