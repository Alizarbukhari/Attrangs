// components/WishlistButton.tsx

'use client'; // This is a Client Component

import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useWishlist } from './context/useWishList';
import { Product } from '../types/wishListType';
import { toast } from 'react-toastify';

interface WishlistButtonProps {
  product: Product;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.description} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.description} added to wishlist`);
    }
  };

  return (
    <button onClick={handleWishlistClick} className="text-[24px] text-gray-500">
      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default WishlistButton;
