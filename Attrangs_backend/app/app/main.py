from fastapi import FastAPI
from .routes import register
from .routes import login
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database.db import create_table
import uvicorn


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

app = FastAPI(
    title="Attrangs API",
    description="Backend API for Attrangs e-commerce platform",
    version="1.0.0",
    openapi_tags=tags
)

@app.get('/')
def root():
    return {"names" : "attrangs"}

app.include_router(register.router1,tags=["register"])
app.include_router(login.router,tags=["login"])
def start():
    # create_tables()
    uvicorn.run("app.main:app",host="127.0.0.1", port=8000, reload=True)   
