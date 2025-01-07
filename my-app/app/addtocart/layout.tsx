// context/providers.tsx

'use client'; // Ensure this is a Client Component

import React, { ReactNode } from 'react';
import { WishlistProvider } from '../components/context/wishListContext';
import { CartProvider } from '../components/context/cartContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </WishlistProvider>
  );
};

export default Providers;
