from fastapi import FastAPI
from .routes import register    
from .routes import login
from .routes import search_rout
from .routes import product
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database.db import create_table
import uvicorn #type: ignore


@asynccontextmanager
async def lifespan(app:FastAPI):
    create_table()
    print("table create succesfully")
    yield
    

app = FastAPI(lifespan=lifespan)


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tags = [
    {
        "name": "register",
        "description": "User registration operations"
    },
    {
        "name": "login", 
        "description": "User authentication operations"
    },
    {
        "name": "update_user",
        "description": "User profile update operations"
    }
]


@app.get('/')
def root():
    return {"names" : "attrangs"}

app.include_router(register.router1,tags=["register"])
app.include_router(login.router,tags=["login"])
app.include_router(search_rout.router3,tags=["search"])
app.include_router(product.router4,tags=["product"])
def start():
    # create_tables()
    uvicorn.run("app.main:app",host="127.0.0.1", port=8000, reload=True)   
