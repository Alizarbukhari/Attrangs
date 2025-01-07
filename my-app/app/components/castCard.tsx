// components/Card.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './context/useCart';
import { Product } from '../types/wishListType';
import { toast } from 'react-toastify';

interface CardProps {
  id: number;
  image: string;
  oldPrice?: string;
  discount?: string;
  price: string;
  description: string;
  slug?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  image,
  oldPrice,
  discount,
  price,
  description,
  slug,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, image, oldPrice, discount, price, description, slug });
    toast.success(`${description} added to cart`);
  };

  return (
    <div className="border p-4 rounded shadow">
      {/* Image */}
      <div className="w-full h-48 relative group">
        <Image
          src={image}
          alt={`Product ${id}`}
          fill
          className="rounded"
        />
        {/* Transparent overlay for hover effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
        {/* Text in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border border-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link href={`/product/${slug}`}>
            <li className="text-white">View Product</li>
          </Link>
        </div>
      </div>

      {/* Prices */}
      <div className="mt-2">
        {oldPrice && <del className="text-gray-500">{oldPrice} won</del>}
        <div className="flex items-center">
          {discount && <span className="text-red-500 mr-2">{discount}</span>}
          <span className="text-lg font-semibold">{price} won</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-2">
        <h3 className="text-md font-medium">{description}</h3>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
