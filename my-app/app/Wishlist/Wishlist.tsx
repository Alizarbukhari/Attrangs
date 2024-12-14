// components/Wishlist/Wishlist.tsx
'use client'; // Mark as Client Component

import React from 'react';
import { useWishlist } from "@/app/components/context/WishlistContext";
import Image from 'next/image';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <div className="p-4">Your wishlist is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            {/* Image */}
            <div className="w-full h-48 relative">
              <Image
                src={product.image}
                alt={product.description}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded"
              />
            </div>

            {/* Description */}
            <div className="mt-2">
              <h3 className="text-lg font-medium">{product.description}</h3>
              <p className="text-gray-500">Price: {product.price}</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
