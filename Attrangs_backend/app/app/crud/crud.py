# crud.py


from sqlalchemy.orm import Session
from ..schema.schema import User_Register,User_Create_Register
from passlib.context import CryptContext  # type: ignore

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, userNameId: str):
    return db.query(User_Register).filter(User_Register.user_name_id == userNameId).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User_Register).filter(User_Register.email == email).first()

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
