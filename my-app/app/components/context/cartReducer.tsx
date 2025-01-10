import { CartState, CartAction, CartItem } from '../../types/cartType';

export const initialCartState: CartState = {
  cart: [],
};

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'INIT_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: action.payload.quantity },
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) {
        return state; // Prevent invalid quantity
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};
