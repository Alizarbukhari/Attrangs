from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
import requests
from sqlmodel import Session, select # type: ignore
from typing import List
from ..database.db import get_session
from ..schema.schema import Product, ProductCreate, ProductUpdate
from dotenv import load_dotenv

load_dotenv()

router4 = APIRouter(tags=["product"])

@router4.get("/products")
def get_products():
    return {"message": "Hello, World!"}

SUPABASE_BUCKET_NAME = 'New'
SUPABASE_ENDPOINT = "https://ewrtlcqucjbafojeyjem.supabase.co"
SUPABASE_SERVICE_ROLE_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cnRsY3F1Y2piYWZvamV5amVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjYzNjYzOSwiZXhwIjoyMDQ4MjEyNjM5fQ.-_SCPST1EIoWe2VAZRuiToDYrj93uumvxdQTtXSYovk'  # Make sure to replace with your actual token

@router4.get("/get-signed-url")
async def get_signed_url(filename: str):
    # Construct the URL for signed URL request
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/sign/{SUPABASE_BUCKET_NAME}/{filename}"

    # Set expiry in seconds
    params = {
        "expiresIn": 3600,  # Expiry in seconds (1 hour)
        "token": SUPABASE_SERVICE_ROLE_TOKEN  # Token directly as a query param
    }

    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}"
    }
    
    # Use GET method to request the signed URL
    response = requests.get(url, headers=headers, params=params)

    # Check if signed URL generation was successful
    if response.status_code == 200:
        signed_url = response.json().get("signedURL")
        return {"signed_url": signed_url}
    else:
        # Raise an HTTP exception if signed URL generation fails
        raise HTTPException(
            status_code=response.status_code,
            detail={
                "error": "Failed to generate signed URL",
                "details": response.json()
            }
        )




@router4.post("/upload")
async def upload(file: UploadFile = File(...)):
    # Define headers for Supabase authorization
    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}",
        "Content-Type": "application/octet-stream"
    }
    
    # Construct the correct Supabase URL for file upload
    url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{file.filename}"
    
    # Read file content
    file_content = await file.read()
    
    # Make a request to upload the file
    response = requests.post(url, headers=headers, data=file_content)

    # Check if upload was successful
    if response.status_code == 200 or response.status_code == 201:
        return {"message": "File uploaded successfully"}
    else:
        return {
            "error": "File upload failed",
            "details": response.json() if response.content else response.text
        }

@router4.post("/products", response_model=Product)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    db_product = Product.from_orm(product)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router4.get("/products", response_model=List[Product])
def get_products(session: Session = Depends(get_session)):
    products = session.exec(select(Product)).all()
    return products

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

# Product with image upload
@router4.post("/products/with-image")
async def create_product_with_image(
    name: str,
    slug: str,
    price: float,
    description: str = None,
    old_price: float = None,
    discount: float = None,
    file: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    # Handle image upload if file is provided
    image_url = None
    if file:
        # Upload file to Supabase
        headers = {
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_TOKEN}",
            "Content-Type": "application/octet-stream"
        }
        
        url = f"{SUPABASE_ENDPOINT}/storage/v1/object/{SUPABASE_BUCKET_NAME}/{file.filename}"
        file_content = await file.read()
        response = requests.post(url, headers=headers, data=file_content)
        
        if response.status_code not in (200, 201):
            raise HTTPException(status_code=400, detail="Failed to upload image")
            
        image_url = f"{SUPABASE_ENDPOINT}/storage/v1/object/public/{SUPABASE_BUCKET_NAME}/{file.filename}"

    # Create product with image URL
    product_data = {
        "name": name,
        "slug": slug,
        "price": price,
        "description": description,
        "image": image_url,
        "old_price": old_price,
        "discount": discount
    }
    
    db_product = Product(**product_data)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    
    return db_product