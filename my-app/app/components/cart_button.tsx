import { IoBagOutline } from "react-icons/io5";
import { useState } from "react";
import Add_to_cart from "../functional_Components/add_to_cart";
export default function Cart_Button() {
    const [showCart, setShowCart] = useState(false);

    const showCartHandler = () => {
        setShowCart(true); // Show the cart modal
      };
    
      const closeCartHandler = () => {
        setShowCart(false); // Close the cart modal
      };

  return (
    <>
    <div>
    <button onClick={showCartHandler} className=" text-white flex item-center  rounded">
            <IoBagOutline className="inline-block text-[24px] text-gray-500" /> 
          </button>
    </div>
    <Add_to_cart showCart={showCart} onClose={closeCartHandler} />
    
    
    
    </>
  )
}
