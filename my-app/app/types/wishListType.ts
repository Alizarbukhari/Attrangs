// context/types.ts

export interface Product {
  id: number;
  image: string;
  oldPrice?: string;
  discount?: string;
  price: string;
  description: string;
  slug?: string;
}

export interface WishlistState {
  wishlist: Product[];
}

export type WishlistAction =
  | { type: 'INIT_WISHLIST'; payload: Product[] }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: { id: number } };
