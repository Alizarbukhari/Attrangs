
'use client'; // Mark as Client Component
import Add_to_cart from '../functional_Components/add_to_cart';
import React, { useState } from 'react';
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import Link from 'next/link';
import Cart_Button from './cart_button';
import Whishlist_Button from './whishlist_button';

interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
  link?:string;
}



const Card = (props:Product) => {
  // const [showCart, setShowCart] = useState(false);

  // const showCartHandler = () => {
  //   setShowCart(true); // Show the cart modal
  // };

  // const closeCartHandler = () => {
  //   setShowCart(false); // Close the cart modal
  // };

  return (
    <div className="mb-8">
      
        <div key={props.id} className="w-full md:w-[370px]">
          {/* Image */}
          <div className="w-full h-96 relative group">
  <Image
    src={props.image}
    alt={`Product ${props.id}`}
    fill
    
    className="rounded"
  />
  {/* Transparent overlay for hover effect */}
  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
  {/* Text in the center */}
 
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border border-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
  <Link href={`/product/${props.link}`}>Hovered Text</Link>
  </div>
</div>

          {/* Prices */}
          <div className="mt-2">
            <del className="text-gray-500">{props.oldPrice}</del>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">{props.discount}</span>
              <span className="text-lg font-semibold">{props.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2">
            <h3 className="text-md font-medium">{props.description}</h3>
          </div>

          {/* Additional Info (e.g., indicators) */}
          <div className="flex gap-1 mt-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-red-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-950 rounded-full"></div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 my-2"></div>
             <div className='text-red-200'>Best</div>
          {/* Add to Wishlist and Cart Buttons */}
          <div className="flex justify-between items-center">
            {/* Placeholder for any text or label */}
            <div className="text-sm text-gray-600">Choose Options</div>

        {/* Buttons */}
        <div className="flex gap-4">
         {/* <Whishlist_Button /> */}
          <button  className="  rounded">
          <FaRegHeart className='text-[24px] text-gray-500'/>
          </button>
          <Cart_Button/>
        </div>
      </div>
    </div>
  

      {/* Show the Add to Cart Modal if showCart is true */}
      {/* <Add_to_cart showCart={showCart} onClose={closeCartHandler} /> */}
    </div>
  );
};

export default Card;


























// 'use client'; // Mark as Client Component
// import Add_to_cart from '../functional_Components/add_to_cart';
// import React, { useState } from 'react';
// import Image from "next/image";
// import { FaRegHeart } from "react-icons/fa";
// import { useWishlist } from "./context/WishlistContext";
// import { IoBagOutline } from "react-icons/io5";
// import { CalendarDays } from 'lucide-react';
// import Cart_Button from './cart_button';

// interface Product {
//   id: number;
//   image: string;
//   oldPrice: string;
//   discount: string;
//   price: string;
//   description: string;
//   link?: string;
// }

// const productData: Product[] = [
//   {
//     id: 1,
//     image: "/card images/cardimage1.gif",
//     oldPrice: "3000",
//     discount: "-200.00%",
//     price: "90000",
//     description: "Test Product 1",
//   },
//   {
//     id: 2,
//     image: "/card images/cardimage2.gif",
//     oldPrice: "2500",
//     discount: "-15.00%",
//     price: "2125",
//     description: "Test Product 2",
//   },
//   {
//     id: 3,
//     image: "/card images/cardimage3.webp",
//     oldPrice: "3500",
//     discount: "-10.00%",
//     price: "3150",
//     description: "Test Product 3",
//   },
//   {
//     id: 4,
//     image: "/card images/cardimage4.webp",
//     oldPrice: "3500",
//     discount: "-10.00%",
//     price: "3150",
//     description: "Test Product 4",
//   },
//   // Add more products as needed
// ];

// const Card = (props:Product) => {
//   const { addToWishlist } = useWishlist();
//   const [showCart, setShowCart] = useState(false);

//   const showCartHandler = () => {
//     setShowCart(true); // Show the cart modal
//   };

//   const closeCartHandler = () => {
//     setShowCart(false); // Close the cart modal
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 mb-8 lg:grid-cols-4 gap-4">
//       {productData.map((product) => (
//         <div key={product.id} className="w-full  p-8  ">
//           {/* Image */}
//           <div className="w-full h-64 relative group">
//   <Image
//     src={product.image}
//     alt={`Product ${product.id}`}
//     fill
//     style={{ objectFit: 'cover' }}
//     className="rounded"
//   />
//   {/* Transparent overlay for hover effect */}
//   <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
//   {/* Text in the center */}
//   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//     Hovered Text
//   </div>
// </div>

//           {/* Prices */}
//           <div className="mt-2">
//             <del className="text-gray-500">{product.oldPrice}</del>
//             <div className="flex items-center">
//               <span className="text-red-500 mr-2">{product.discount}</span>
//               <span className="text-lg font-semibold">{product.price}</span>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-2">
//             <h3 className="text-md font-medium">{product.description}</h3>
//           </div>

//           {/* Additional Info (e.g., indicators) */}
//           <div className="flex gap-1 mt-2">
//             <div className="w-3 h-3 bg-black rounded-full"></div>
//             <div className="w-3 h-3 bg-[#CFCFCF] rounded-full"></div>
//             <div className="w-3 h-3 bg-[#E4CBAD] rounded-full"></div>
//             <div className="w-3 h-3 bg-[#FAC8C8] rounded-full"></div>
//           </div>

//           {/* Divider */}
//           <div className="w-full h-px bg-gray-300 my-2"></div>
//              <div className='text-red-200'>Best</div>
//           {/* Add to Wishlist and Cart Buttons */}
//           <div className="flex justify-between items-center">
//             {/* Placeholder for any text or label */}
//             <div className="text-sm text-gray-600">Choose Options</div>

//         {/* Buttons */}
//         <div className="flex gap-4">
//         <button onClick={() => addToWishlist(product)} className="  rounded">
//           <FaRegHeart className='text-[24px] text-gray-500'/>
//           </button>
// {/*           
//           <button onClick={showCartHandler} className=" text-white flex item-center  rounded">
//             <IoBagOutline className="inline-block text-[24px] text-gray-500" /> 
//           </button> */}
//          <Cart_Button/>
//         </div>
//       </div>
//     </div>
//   ))}

//       {/* Show the Add to Cart Modal if showCart is true */}
//       <Add_to_cart showCart={showCart} onClose={closeCartHandler} />
//     </div>
//   );
// };

// export default Card;