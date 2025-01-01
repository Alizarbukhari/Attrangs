from sqlmodel import Session, SQLModel, create_engine, select  # type: ignore
from ..schema.schema import Product
from .Product_crud import create_product
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)

def init_db():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        # Sample products
        products = [
            Product(name="Apple iPhone 14", slug="iphone-14", description="Latest iPhone model", price=999.99),
            Product(name="Samsung Galaxy S22", slug="galaxy-s22", description="Latest Galaxy model", price=899.99),
            Product(name="Google Pixel 7", slug="pixel-7", description="Latest Pixel model", price=799.99),
            Product(name="OnePlus 10 Pro", slug="oneplus-10-pro", description="High-end OnePlus phone", price=749.99),
            Product(name="Sony WH-1000XM4", slug="sony-wh-1000xm4", description="Noise-cancelling headphones", price=349.99),
            Product(name="Dell XPS 13", slug="dell-xps-13", description="Powerful ultrabook", price=1199.99),
            # Add more products as needed
        ]
        for product in products:
            existing = session.exec(select(Product).where(Product.name == product.name)).first()
            if not existing:
                create_product(session, product)

if __name__ == "__main__":
    init_db()
    print("Database initialized and dummy products added.")
