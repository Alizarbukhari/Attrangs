// components/CartButton.tsx

'use client';

import React, { useState } from 'react';
import { Product } from '../types/cartType';
import { toast } from 'react-toastify';
import { IoBagOutline } from "react-icons/io5";
import AddToCart from './cartPop'; // Ensure correct path

interface CartButtonProps {
  product: Product;
}

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
  const [showCart, setShowCart] = useState(false);

  const handleAddToCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleAddToCart = (quantity: number) => {
    // Import the useCart hook inside the component to access the addToCart method
    // Or alternatively, pass the addToCart function as a prop to AddToCart
    // Here, we'll assume that AddToCart uses the useCart hook internally
    toast.success(`${product.description} added to cart`);
    setShowCart(false);
  };

  return (
    <>
      <button
        onClick={handleAddToCartClick}
        className="inline-block -mt-1 text-[24px] text-gray-500"
        aria-label={`Add ${product.name} to cart`}
      >
        <IoBagOutline />
      </button>
      
      {showCart && (
        <AddToCart
          showCart={showCart}
          onClose={handleCloseCart}
          product={product}
        />
      )}
    </>
  );
};

export default CartButton;
