// types/Product.ts
export interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
  link: string;
  category?: string;
  slug?: string;
  name?: string;
  updated_at?: string; 
  created_at?: string; 
  sale?: boolean;
  order_quantity?:number;
}


export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/products', {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn('Failed to fetch products: Response status', response.status);
      return []; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching products:', error.message);
    } else {
        console.error('Unexpected error fetching products:', error);
    }
    return [];   }
};
export const fetchProductsByCategory = async (category: string, limit: number = 1): Promise<Product[]> => {
  try {
    // Assuming your backend supports sorting by 'created_at' descending and limiting results
    const response = await fetch(`http://127.0.0.1:8000/products?category=${category}&sort=created_at_desc&limit=${limit}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`Failed to fetch products for category: ${category} - Response status`, response.status);
      return []; 
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching products for category ${category}:`, error.message);
    } else {
      console.error(`Unexpected error fetching products for category ${category}:`, error);
    }
    return []; 
  }
};
