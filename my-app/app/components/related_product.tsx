import React from 'react'
import PageCard from './pagecard'

export default function Related_Product() {
      // Mock data array
  const products = [
    {
  id: 1,
  image: "/card images/cardimage1.gif",
  oldPrice: "3000",
  discount: "-200.00%",
  price: "90000",
  description: "Test Product 1",
  link:"/product/Chiffon-Wrap-Aurora-Dress",
},
{
  id: 2,
  image: "/card images/cardimage2.gif",
  oldPrice: "2500",
  discount: "-15.00%",
  price: "2125",
  description: "Test Product 2",
  link:"/product/Pocket-Trim-Oversized-Long-Sleeve-Tee",
},
{
  id: 3,
  image: "/card images/cardimage3.webp",
  oldPrice: "3500",
  discount: "-10.00%",
  price: "3150",
  description: "Test Product 3",
  link:"/product/Bodywarm-Functional-Turtleneck-Tee",
  
},
{
  id: 4,
  image: "/card images/cardimage4.webp",
  oldPrice: "3500",
  discount: "-10.00%",
  price: "3150",
  description: "Test Product 4",
  link:"/product/Qubeen-Pitch-Fleece-Lined-Lettering-Trim-T-shirt",
},
{
  id: 5,
  image: "/card images/cardimage4.webp",
  oldPrice: "3500",
  discount: "-10.00%",
  price: "3150",
  description: "Test Product 4",
  link:"/product/Qubeen-Pitch-Fleece-Lined-Lettering-Trim-T-shirt",
},
  // Add more products as needed
];
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
          {products.map((product) => (
            <PageCard
              key={product.id}
              id={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              price={product.price}
              description={product.description}
              link={product.link}
            />
          ))}
        </div>
      </div>
      </div>
    
    
  )
}