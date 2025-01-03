from sqlalchemy import text
from sqlmodel import Session, select # type: ignore
from typing import List
from ..schema.schema import Product



def create_product(session: Session, product: Product) -> Product:
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


def search_products(session: Session, query: str) -> List[Product]:
    statement = select(Product).where(Product.name.ilike(f"%{query}%")) # type: ignore
    results = session.exec(statement).all()
    return list(results) 

