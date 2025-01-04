import { FaRegHeart } from "react-icons/fa";
import { useWishlist } from "./context/WishlistContext";
import Product from "../shop/page";

interface Product {
    id: number;
    image: string;
    oldPrice: string;
    discount: string;
    price: string;
    description: string;
    link?:string;
  }

export default function Whishlist_Button() {
    const { addToWishlist } = useWishlist();
  return (
    <>
    <button onClick={() => addToWishlist()} className="  rounded">
          <FaRegHeart className='text-[24px] text-gray-500'/>
          </button>
    
    
    
    
    </>
  )
}
