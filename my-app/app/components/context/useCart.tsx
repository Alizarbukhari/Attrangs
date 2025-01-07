// context/useCart.ts

import { useContext } from 'react';
import { CartContext } from './cartContext';
import { Product,CartItem } from '../../types/cartType';

interface UseCartHook {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCart = (): UseCartHook => {
  const context = useContext(CartContext);

  if (!context) {
    console.error("useCart must be used within a CartProvider");
    throw new Error("useCart must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return { cart: state.cart, addToCart, removeFromCart, updateQuantity };
};
