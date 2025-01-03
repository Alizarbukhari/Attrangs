from fastapi import APIRouter, Depends, HTTPException, File, UploadFile #type: ignore    
import httpx #type: ignore
from sqlmodel import Session, select #type: ignore
from typing import List
from ..database.db import get_session
from ..schema.schema import Product, ProductCreate, ProductUpdate
from dotenv import load_dotenv #type: ignore
import os
import uuid

load_dotenv()

router4 = APIRouter(tags=["product"])

SUPABASE_BUCKET_NAME = os.getenv("SUPABASE_BUCKET_NAME")
SUPABASE_ENDPOINT = os.getenv("SUPABASE_ENDPOINT")
SUPABASE_SERVICE_ROLE_TOKEN = os.getenv("SUPABASE_SERVICE_ROLE_TOKEN")

# Increase timeout settings
TIMEOUT_SECONDS = 30

@router4.get("/get-signed-url")
async def get_signed_url(filename: str):
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/sign/{SUPABASE_BUCKET_NAME}/{filename}"

    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}"
    }

    params = {"expiresIn": 3600}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

    if response.status_code == 200:
        signed_url = response.json().get("signedURL")
        return {"signed_url": signed_url}
    else:
        raise HTTPException(
            status_code=response.status_code,
            detail={
                "error": "Failed to generate signed URL",
                "details": response.json()
            }
        )

async def upload_file(file_content, url, headers):
    async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
        response = await client.post(url, headers=headers, content=file_content)
    return response

@router4.post("/upload")
async def upload(file: UploadFile = File(...)):
    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}",
        "Content-Type": "application/octet-stream"
    }

    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{unique_filename}"

    file_content = await file.read()

    try:
        response = await upload_file(file_content, url, headers)
        
        if response.status_code in (200, 201):
            return {
                "message": "File uploaded successfully", 
                "file_url": f"{SUPABASE_ENDPOINT}/storage/v1/object/public/{SUPABASE_BUCKET_NAME}/{unique_filename}"
            }
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="File upload failed"
            )
    except httpx.ReadTimeout:
        raise HTTPException(
            status_code=504,
            detail="Upload timed out. Please try again."
        )

@router4.post("/products", response_model=Product)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    db_product = Product(**product.model_dump())
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router4.get("/products", response_model=List[Product])
def get_products(session: Session = Depends(get_session)):
    try:
        products = session.exec(select(Product)).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router4.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router4.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate, session: Session = Depends(get_session)):
    db_product = session.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    product_data = product_update.dict(exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)

    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router4.delete("/products/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    session.delete(product)
    session.commit()
    return {"message": "Product deleted successfully"}
@router4.post("/products/with-image")
async def create_product_with_image(
    name: str,
    slug: str,
    price: float,
    category: str,
    description: str = None,
    old_price: float = None,
    discount:str = None,
    file: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    image_url = None
    if file:
        headers = {
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}",
            "Content-Type": "application/octet-stream"
        }

        # Using the original filename
        original_filename = file.filename
        url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{original_filename}"

        file_content = await file.read()

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, content=file_content)

        if response.status_code not in (200, 201):
            raise HTTPException(status_code=400, detail="Failed to upload image")

        image_url = f"{SUPABASE_ENDPOINT}/storage/v1/object/public/{SUPABASE_BUCKET_NAME}/{original_filename}"

    product_data = {
        "name": name,
        "slug": slug,
        "price": price,
        "description": description,
        "category": category,
        "image": image_url,
        "old_price": old_price,
        "discount": discount
    }

    db_product = Product(**product_data)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return db_product
