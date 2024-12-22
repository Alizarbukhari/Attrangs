from fastapi import FastAPI
from .routes import register
from .routes import login
from contextlib import asynccontextmanager
from .database.db import create_table
import uvicorn


@asynccontextmanager
async def lifespan(app:FastAPI):
    create_table()
    print("table create succesfully")
    yield
    

app = FastAPI(lifespan=lifespan)



@app.get('/')
def root():
    return {"names" : "attrangs"}

app.include_router(register.router1)
app.include_router(login.router)

def start():
    # create_tables()
    uvicorn.run("app.main:app",host="127.0.0.1", port=8000, reload=True)   
