'use client'; // Mark as Client Component
import Add_to_cart from '../functional_Components/add_to_cart';
import React, { useState } from 'react';
import Image from "next/image";
import { useWishlist } from "./context/WishlistContext";
import { IoBagOutline } from "react-icons/io5";

interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
}

const productData: Product[] = [
  {
    id: 1,
    image: "/card images/cardimage1.gif",
    oldPrice: "3000",
    discount: "-200.00%",
    price: "90000",
    description: "Test Product 1",
  },
  {
    id: 2,
    image: "/card images/cardimage2.gif",
    oldPrice: "2500",
    discount: "-15.00%",
    price: "2125",
    description: "Test Product 2",
  },
  {
    id: 3,
    image: "/card images/cardimage3.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 3",
  },
  {
    id: 4,
    image: "/card images/cardimage4.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 4",
  },
  // Add more products as needed
];

const Card: React.FC = () => {
  const { addToWishlist } = useWishlist();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true); // Show the cart modal
  };

  const closeCartHandler = () => {
    setShowCart(false); // Close the cart modal
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productData.map((product) => (
        <div key={product.id} className="w-full border p-4 rounded shadow">
          {/* Image */}
          <div className="w-full h-64 relative">
            <Image
              src={product.image}
              alt={`Product ${product.id}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded"
            />
          </div>

          {/* Prices */}
          <div className="mt-2">
            <del className="text-gray-500">{product.oldPrice}</del>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">{product.discount}</span>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2">
            <h3 className="text-md font-medium">{product.description}</h3>
          </div>

          {/* Additional Info (e.g., indicators) */}
          <div className="flex gap-1 mt-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 my-2"></div>

          {/* Add to Wishlist and Cart Buttons */}
          <div className="flex justify-between items-center">
            {/* Placeholder for any text or label */}
            <div className="text-sm text-gray-600">Choose Options</div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button onClick={showCartHandler} className="bg-blue-500 text-white px-4 py-2 rounded">
                <IoBagOutline className="inline-block mr-2" /> Add to Cart
              </button>
              <button onClick={() => addToWishlist(product)} className="bg-green-500 text-white px-4 py-2 rounded">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Show the Add to Cart Modal if showCart is true */}
      <Add_to_cart showCart={showCart} onClose={closeCartHandler} />
    </div>
  );
};

export default Card;