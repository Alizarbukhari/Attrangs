// addtocart/layout.tsx

'use client'; // Ensure this is a Client Component

import React, { ReactNode } from 'react';
import { WishlistProvider } from '../components/context/wishListContext'; // Import WishlistProvider

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WishlistProvider>
      {children}
    </WishlistProvider>
  );
};

export default Providers;
