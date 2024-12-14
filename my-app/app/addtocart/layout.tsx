// components/Providers.tsx
'use client'; // This marks the component as a Client Component

import React, { ReactNode } from 'react';
import { WishlistProvider } from '../components/context/WishlistContext';

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
