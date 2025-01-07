// context/WishlistContext.tsx

'use client';

import React, { createContext, useReducer, ReactNode, Dispatch, useEffect, useState } from 'react';
import { WishlistState, WishlistAction } from '../../types/wishListType';
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
        try {
          const parsed = JSON.parse(persisted);
          if (parsed && Array.isArray(parsed.wishlist)) {
            dispatch({ type: 'INIT_WISHLIST', payload: parsed.wishlist });
          }
        } catch (error) {
          console.error("Failed to parse wishlist from localStorage:", error);
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
    return null; // Prevents hydration mismatch
  }

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
