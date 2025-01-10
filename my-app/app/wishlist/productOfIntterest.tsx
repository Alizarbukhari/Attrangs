// components/ProductsOfInterest.tsx

'use client'; // Ensure this is a Client Component

import React from 'react';
import { useWishlist } from '../components/context/useWishList'; // Adjust the path as needed
import Image from 'next/image';
import Link from 'next/link';
import { FaTrashAlt } from 'react-icons/fa'; // Icon for removing from wishlist
import { toast } from 'react-toastify'; // For toast notifications
import { supabaseKey } from '../utils/config';
interface Product {
  id: number;
  image: string;
  oldPrice?: string;
  discount?: string;
  price: string;
  description: string;
  slug?: string;
}

const ProductsOfInterest: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (id: number, description: string) => {
    removeFromWishlist(id);
    toast.info(`${description} removed from wishlist`);
  };

  return (
    <div>
      <div className="flex w-full py-8 mt-40 md:mt-24 bg-[#f6f4ee] justify-center">
        <h2 className="text-2xl text-center">Products of Interest</h2>
      </div>
      <div className="container mx-auto py-8">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="w-20 h-20 mb-4 bg-gray-300 rounded-full"></div>
            <p className="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
            <p className="text-sm text-gray-400">
              Add the products you are interested in to your wish list
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((item: Product) => (
              <div key={item.id} className="border p-4 rounded shadow">
                {/* Image */}
                <div className="w-full h-48 relative group">
                  <Image
                    src={`${supabaseKey}${item.image}`}
                    alt={`Product ${item.id}`}
                    fill
                    className="rounded"
                  />
                  {/* Transparent overlay for hover effect */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
                  {/* Text in the center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border border-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link href={`/product/${item.slug}`}>
                      <li className="text-white">View Product</li>
                    </Link>
                  </div>
                </div>

                {/* Prices */}
                <div className="mt-2">
                  {item.oldPrice && <del className="text-gray-500">{item.oldPrice}</del>}
                  <div className="flex items-center">
                    {item.discount && <span className="text-red-500 mr-2">{item.discount}</span>}
                    <span className="text-lg font-semibold">{item.price}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-2">
                  <h3 className="text-md font-medium">{item.description}</h3>
                </div>

                {/* Additional Info (e.g., indicators) */}
                <div className="flex gap-1 mt-2">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-orange-950 rounded-full"></div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-300 my-2"></div>
                <div className="text-red-200">Best</div>

                {/* Add to Cart and Remove from Wishlist Buttons */}
                <div className="flex justify-between items-center">
                  {/* Placeholder for any text or label */}
                  <div className="text-sm text-gray-600">Choose Options</div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {/* Add to Cart Button */}
                    <Link href={`/product/${item.slug}`}>
                      <li className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</li>
                    </Link>

                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => handleRemove(item.id, item.description)}
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                      aria-label="Remove from Wishlist"
                    >
                      <FaTrashAlt className="mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsOfInterest;
