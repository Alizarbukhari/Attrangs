// context/WishlistContext.tsx

'use client'; // Ensure this is a Client Component

import React, { createContext, useReducer, ReactNode, Dispatch, useEffect, useState } from 'react';
import { WishlistState, WishlistAction, Product } from '../../types/wishListType';
import { wishlistReducer, initialWishlistState } from './wishListReducer';

interface WishlistContextProps {
  state: WishlistState;
  dispatch: Dispatch<WishlistAction>;
}

export const WishlistContext = createContext<WishlistContextProps>({
  state: initialWishlistState,
  dispatch: () => null,
});

interface ProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialWishlistState);
  const [hydrated, setHydrated] = useState(false);

  // Load wishlist from localStorage on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const persisted = localStorage.getItem('wishlistState');
      if (persisted) {
        const parsed = JSON.parse(persisted);
        // Ensure parsed data structure is correct
        if (parsed && Array.isArray(parsed.wishlist)) {
          dispatch({ type: 'INIT_WISHLIST', payload: parsed.wishlist });
        }
      }
      setHydrated(true);
    }
  }, []);

  // Persist wishlist to localStorage when state changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('wishlistState', JSON.stringify(state));
    }
  }, [state, hydrated]);

  if (!hydrated) {
    // Optionally, render a loading indicator or nothing
    return null;
  }

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
