// components/CartButton.tsx

'use client';

import React from 'react';
import { useCart } from './context/useCart';
import { Product } from '../types/wishListType';
import { toast } from 'react-toastify';
import { IoBagOutline } from "react-icons/io5";

interface CartButtonProps {
  product: Product;
}

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.description} added to cart`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="inline-block -mt-1 text-[24px] text-gray-500" 
    >
 <IoBagOutline />
    </button>
  );
};

export default CartButton;
