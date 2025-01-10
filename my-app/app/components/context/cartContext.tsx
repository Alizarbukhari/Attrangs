// context/CartContext.tsx

'use client'; // Ensure this is a Client Component

import React, { createContext, useReducer, ReactNode, Dispatch, useEffect, useState } from 'react';
import { CartState, CartAction, CartItem } from '../../types/cartType';
import { cartReducer, initialCartState } from './cartReducer';

interface CartContextProps {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps>({
  state: initialCartState,
  dispatch: () => null,
});

interface ProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const persisted = localStorage.getItem('cartState');
      if (persisted) {
        try {
          const parsed = JSON.parse(persisted);
          // Ensure parsed data structure is correct
          if (parsed && Array.isArray(parsed.cart)) {
            dispatch({ type: 'INIT_CART', payload: parsed.cart });
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
      setHydrated(true);
    }
  }, []);

  // Persist cart to localStorage when state changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cartState', JSON.stringify(state));
    }
  }, [state, hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
