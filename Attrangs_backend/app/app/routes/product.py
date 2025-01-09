from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Query  # type: ignore
import httpx  # type: ignore
from sqlmodel import Session, select  # type: ignore
from typing import List, Optional
from ..database.db import get_session
from ..schema.schema import Product, ProductCreate, ProductUpdate
from dotenv import load_dotenv  # type: ignore
import os
import uuid
import asyncio
from datetime import datetime

load_dotenv()

router4 = APIRouter(tags=["product"])

SUPABASE_BUCKET_NAME = os.getenv("SUPABASE_BUCKET_NAME")
SUPABASE_ENDPOINT = os.getenv("SUPABASE_ENDPOINT")
SUPABASE_SERVICE_ROLE_TOKEN = os.getenv("SUPABASE_SERVICE_ROLE_TOKEN")






@router4.get("/product/{slug}")
def get_product(slug: str, db: Session = Depends(get_session)):
    product = db.query(Product).filter(Product.slug == slug).first() # type: ignore
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product




@router4.get("/get-signed-url")
async def get_signed_url(filename: str):
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/sign/{SUPABASE_BUCKET_NAME}/{filename}"
    headers = {"Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}"}
    params = {"expiresIn": 3600}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)

    if response.status_code == 200:
        signed_url = response.json().get("signedURL")
        return {"signed_url": signed_url}
    else:
        raise HTTPException(
            status_code=response.status_code,
            detail={"error": "Failed to generate signed URL", "details": response.json()}
        )



# Increase timeout settings
TIMEOUT_SECONDS = 120

# Retry mechanism for uploads
async def upload_with_retry(file_content, url, headers, retries=3):
    for attempt in range(retries):
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
                print(f"Attempt {attempt + 1}: Uploading to {url}")  # Debug log
                response = await client.post(url, headers=headers, content=file_content)
                print(f"Response status: {response.status_code}")  # Debug log

                if response.status_code in (200, 201):
                    return response
                else:
                    print(f"Error response: {response.text}")  # Debug log
                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
        except Exception as e:
            print(f"Upload attempt {attempt + 1} failed: {str(e)}")  # Debug log
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
    raise HTTPException(
        status_code=500,
        detail="All upload attempts failed"
    )

async def check_existing_file(filename):
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{filename}"
    headers = {"Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}"}

    async with httpx.AsyncClient() as client:
        response = await client.head(url, headers=headers)
        return response.status_code == 200
    

@router4.post("/products", response_model=Product)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    try:
        db_product = Product(**product.model_dump(), created_at=datetime.utcnow(), updated_at=datetime.utcnow())
        session.add(db_product)
        session.commit()
        session.refresh(db_product)
        return db_product
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating product: {str(e)}")

@router4.get("/products", response_model=List[Product])
def get_products(
    session: Session = Depends(get_session),
    category: Optional[str] = Query(None, description="Filter by category"),
    sort_by: Optional[str] = Query("created_at", description="Sort by field"),
    order: Optional[str] = Query("asc", description="Order: asc or desc"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price")
):
    try:
        query = select(Product)

        # Apply category filtering
        if category:
            query = query.where(Product.category == category)

        # Apply price filtering
        if min_price is not None:
            query = query.where(Product.price >= min_price)
        if max_price is not None:
            query = query.where(Product.price <= max_price)

        # Apply sorting
        if sort_by:
            sort_column = getattr(Product, sort_by, None)
            if sort_column is None:
                raise HTTPException(status_code=400, detail=f"Invalid sort field: {sort_by}")
            if order == "desc":
                query = query.order_by(sort_column.desc())
            else:
                query = query.order_by(sort_column.asc())

        products = session.execute(query).scalars().all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")

@router4.get("/products/{product_id}", response_model=Product)
def get_producting(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router4.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate, session: Session = Depends(get_session)):
    try:
        db_product = session.get(Product, product_id)
        if not db_product:
            raise HTTPException(status_code=404, detail="Product not found")

        product_data = product_update.dict(exclude_unset=True)
        for key, value in product_data.items():
            setattr(db_product, key, value)

        db_product.updated_at = datetime.utcnow()  # Update the timestamp
        session.add(db_product)
        session.commit()
        session.refresh(db_product)
        return db_product
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating product: {str(e)}")

@router4.delete("/products/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    try:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        session.delete(product)
        session.commit()
        return {"message": "Product deleted successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting product: {str(e)}")


@router4.post("/products/with-image")
async def create_product_with_image(
    name: str,
    slug: str,
    price: float,
    category: str,
    description: str = None,  # type: ignore
    old_price: float = None,  # type: ignore
    discount: str = None,  # type: ignore
    stock: float = None,  # type: ignore
    sale: bool = False,  # type: ignore

    file: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    filename = None  # Only filename will be saved in DB
    if file:
        headers = {
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}",
            "Content-Type": "application/octet-stream"
        }

        original_filename = file.filename

        # Check if the file already exists
        file_exists = await check_existing_file(original_filename)
        if file_exists:
            unique_filename = f"{uuid.uuid4()}_{original_filename}"
        else:
            unique_filename = original_filename # type: ignore

        url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{unique_filename}"

        file_content = await file.read()

        response = await upload_with_retry(file_content, url, headers)

        if response.status_code in (200, 201):
            # Save only the filename in the database
            filename = unique_filename

    product_data = {
        "name": name,
        "slug": slug,
        "price": price,
        "description": description,
        "category": category,
        "image": filename,  # Only filename saved here
        "old_price": old_price,
        "discount": discount,
        "stock": stock,
        "sale" :sale
    }

    db_product = Product(**product_data)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return db_product
