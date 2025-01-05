import React from 'react'
import PageCard from './pagecard'

interface Realted_Page_Type{
  Category:string
}

export default async function Related_Product(props:Realted_Page_Type) {
  const getProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/products', {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const allProducts = await getProducts();
  const filteredProducts = allProducts.filter((product:any) => product.category === props.Category);

  return (
      <div className='w-full'>
        {/* related product */}
        <div className='flex justify-center'>
            <h3 className='font-bold text-xl'>Related Products</h3>
        </div>
          {/* Product Cards */}
      <div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filteredProducts.map((product:any) => (
            <PageCard
              key={product.id}
              id={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              price={product.price}
              description={product.description}
              link={product.slug}
            />
          ))}
        </div>
      </div>
      </div>
    
    
  )
}
