export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  price: string;
  category?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/products', {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn('Failed to fetch products: Response status', response.status);
      return []; // Return an empty array to handle gracefully
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching products:', error.message);
    } else {
        console.error('Unexpected error fetching products:', error);
    }
    return []; // Return an empty array in case of an error
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/products?category=${category}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`Failed to fetch products for category: ${category} - Response status`, response.status);
      return []; // Return an empty array to handle gracefully
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error(`Error fetching products for category ${category}:`, error.message);
    } else {
        console.error(`Unexpected error fetching products for category ${category}:`, error);
    }
    return []; // Return an empty array in case of an error
  }
};
