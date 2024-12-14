// components/Header/Header.tsx
'use client'; // Mark as Client Component

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';

const Header1: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <Link href="/">
        <li className="text-xl font-bold">My Store</li>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/wishlist">
          <li className="relative">
            <span className="text-2xl">❤️</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </li>
        </Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
}

export default Header1;
