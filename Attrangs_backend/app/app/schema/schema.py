from sqlmodel import SQLModel,Field # type: ignore

from pydantic import BaseModel, EmailStr # type: ignore                                                                                                             
from typing import Optional
from datetime import datetime


class User_Register(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    first_name: str = Field(nullable=False)
    last_name: str = Field(nullable=False)
    user_name_id: str = Field(unique=True, nullable=False, index=True)
    password: str = Field(nullable=False)
    phone_prefix: str = Field(nullable=False)
    phone: str = Field(nullable=False)
    birth_year: int = Field(nullable=False)
    birth_month: int = Field(nullable=False)
    birth_day: int = Field(nullable=False)
    receive_sms: bool = Field(default=False)
    email: str = Field(unique=True, nullable=False, index=True)
    receive_email: bool = Field(default=False)
    referrer_id: str = Field(default=None, nullable=True)

class User_Create_Register(BaseModel):
    firstName: str
    lastName: str
    userNameId: str
    password: str
    verifyPassword: str
    phonePrefix: str
    phone: str
    birthYear: int
    birthMonth: int
    birthDay: int
    receiveSms: bool
    email: EmailStr
    receiveEmail: bool
    referrerId: Optional[str] = None

class User_Login(BaseModel):
    userNameId: str
    password: str

class User_Out(BaseModel):
    id: int
    firstName: str
    lastName: str
    userNameId: str
    email: EmailStr


class TokenData(BaseModel):
    user_id: Optional[int] = None



class UserLogin(BaseModel):
    user_name_id: str
    password: str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    user_name_id: str
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str
    firstName: str 
    lastName: str


class User_Update(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    password: Optional[str]
    phone: Optional[str] 
    email: Optional[EmailStr]







# Product Schema
class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    slug: str
    category: str   
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    old_price: Optional[float] = None
    discount: Optional[str] = None
    stock: Optional[float] = None
    sale:bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    order_quantity:Optional[int] = None

class ProductCreate(BaseModel):
    name: str
    slug: str
    category: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    old_price: Optional[float] = None
    discount: Optional[str] = None
    stock: Optional[float] = None
    sale : Optional[bool] = False
    order_quantity:Optional[int] = None
    
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    old_price: Optional[float] = None
    discount: Optional[str] = None
    stock: Optional[float] = None
    sale : Optional[bool] = False
    order_quantity:Optional[int] = None

    
    

