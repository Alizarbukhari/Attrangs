// lib/api.ts

export interface Product {
    id: number;
    image: string;
    oldPrice: string;
    discount: string;
    price: string;
    description: string;
    link: string;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/products', {
        cache: 'no-store',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/products?category=${category}`, {
        cache: 'no-store',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category: ${category}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  };
  