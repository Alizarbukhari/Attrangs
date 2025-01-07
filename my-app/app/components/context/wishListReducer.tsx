// context/WishlistReducer.ts

import { WishlistState, WishlistAction } from '../../types/wishListType';

export const initialWishlistState: WishlistState = {
  wishlist: [],
};

export const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (exists) {
        return state; // Product already in wishlist
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};
