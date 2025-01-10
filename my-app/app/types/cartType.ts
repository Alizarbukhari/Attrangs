// context/types.ts

export interface Product {
    id: number;
    image: string;
    name?:string;
    oldPrice?: string;
    discount?: string;
    price: string;
    description: string;
    slug?: string;
    sale?:boolean;
    category?:string
    quantity?:number
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface CartState {
    cart: CartItem[];
  }
  
  export type CartAction =
  | { type: 'INIT_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: Product & { quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

  
  export interface WishlistState {
    wishlist: Product[];
  }
  
  export type WishlistAction =
    | { type: 'INIT_WISHLIST'; payload: Product[] }
    | { type: 'ADD_TO_WISHLIST'; payload: Product }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: { id: number } };
  