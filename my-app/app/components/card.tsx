'use client'; // Mark as Client Component
import Add_to_cart from '../functional_Components/add_to_cart';
import React, { useState } from 'react';
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { useWishlist } from "./context/WishlistContext";
import { IoBagOutline } from "react-icons/io5";

interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
}

const productData: Product[] = [
  {
    id: 1,
    image: "/card images/cardimage1.gif",
    oldPrice: "3000",
    discount: "-200.00%",
    price: "90000",
    description: "Test Product 1",
  },
  {
    id: 2,
    image: "/card images/cardimage2.gif",
    oldPrice: "2500",
    discount: "-15.00%",
    price: "2125",
    description: "Test Product 2",
  },
  {
    id: 3,
    image: "/card images/cardimage3.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 3",
  },
  {
    id: 4,
    image: "/card images/cardimage4.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 4",
  },
  // Add more products as needed
];

const Card: React.FC = () => {
  const { addToWishlist } = useWishlist();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true); // Show the cart modal
  };

  const closeCartHandler = () => {
    setShowCart(false); // Close the cart modal
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {productData.map((product) => (
        <div key={product.id} className="w-full border p-4 rounded shadow">
          {/* Image */}
          <div className="w-full h-64 relative group">
  <Image
    src={product.image}
    alt={`Product ${product.id}`}
    fill
    style={{ objectFit: 'cover' }}
    className="rounded"
  />
  {/* Transparent overlay for hover effect */}
  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
  {/* Text in the center */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    Hovered Text
  </div>
</div>

          {/* Prices */}
          <div className="mt-2">
            <del className="text-gray-500">{product.oldPrice}</del>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">{product.discount}</span>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2">
            <h3 className="text-md font-medium">{product.description}</h3>
          </div>

          {/* Additional Info (e.g., indicators) */}
          <div className="flex gap-1 mt-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
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
          <button onClick={showCartHandler} className=" text-white flex item-center  rounded">
            <IoBagOutline className="inline-block text-[24px] text-gray-500" /> 
          </button>
          <button onClick={() => addToWishlist(product)} className="  rounded">
          <FaRegHeart className='text-[24px] text-gray-500'/>
          </button>
        </div>
      </div>
    </div>
  ))}

      {/* Show the Add to Cart Modal if showCart is true */}
      <Add_to_cart showCart={showCart} onClose={closeCartHandler} />
    </div>
  );
};

export default Card;


//   const [isShow, setIsShow] = useState(false);

//   const handleShow = () => {
//     setIsShow(true);
//   };

//   const handleClose = () => {
//     setIsShow(false);
//   };

//   return (
//     <>
//       <div className="w-full h-auto ">
//         {/* Desktop View */}
//         <div className="w-full h-auto md:h-[80px] hidden md:flex gap-6 items-center justify-center bg-black">
//           {/* Name Div */}
//           <div className="text-3xl tracking-[5px] text-white font-semibold">ATTRANGS</div>
          
//           {/* Link Page Div */}
//           <div className="flex gap-4">
//             {APP_LINKS.map((link, index) => (
//               <Link href={link.href} key={index}>
//                 <p className="font-medium text-white hover:text-gray-300">{link.name}</p>
//               </Link>
//             ))}
//           </div>
          
//           {/* Icons Div */}
//           <div className="text-2xl flex text-white gap-5 -mt-3">
//             <Link href="/login">
//               <div className="w-[18px] h-[18px]">
//                 <FiUser />
//               </div>
//             </Link>
//             <Link href="/cart">
//               <div className="w-[18px] h-[18px]">
//                 <RiShoppingBag3Line />
//               </div>
//             </Link>
//             <Link href="/wishlist">
//               <div className="w-[18px] h-[18px]">
//                 <FaRegHeart />
//               </div>
//             </Link>
//             <div className="w-[18px] h-[18px]">
//               <FiSearch />
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile View */}
//         <div className="px-4 md:hidden">
//           {/* Top Bar */}
//           <div className="w-full h-[80px] flex justify-between items-center bg-black">
//             {/* Left Icons */}
//             <div className="text-3xl flex text-white gap-3">
//               <HiOutlineBars3 onClick={handleShow} className="cursor-pointer" />
//               <FaRegHeart />
//             </div>
            
//             {/* Brand Name */}
//             <div className="text-xl text-white tracking-[5px] font-semibold">ATTRANGS</div>
            
//             {/* Right Icons */}
//             <div className="text-3xl flex text-white gap-3">
//               <FiSearch />
//               <FiUser />
//               <RiShoppingBag3Line />
//             </div>
//           </div>
          
//           {/* Sidebar Overlay */}
//           {isShow && (
//             <div className="fixed inset-0 bg-white z-50 flex flex-col">
//               {/* Close Icon */}
//               <div className="flex justify-end p-4">
//                 <HiOutlineX onClick={handleClose} className="text-2xl cursor-pointer" />
//               </div>
              
//               {/* Navigation Links */}
//               <div className="flex flex-col items-center space-y-6 mt-10">
//                 {APP_LINKS.map((link, index) => (
//                   <Link href={link.href} key={index}>
//                     <p className="text-xl text-black hover:text-gray-700">{link.name}</p>
//                   </Link>
//                 ))}
//                 {/* Additional Links (e.g., Home, About) */}
//                 <Link href="/">
//                   <p className="text-xl text-black hover:text-gray-700">Home</p>
//                 </Link>
//                 <Link href="/about">
//                   <p className="text-xl text-black hover:text-gray-700">About</p>
//                 </Link>
//                 <Link href="/services">
//                   <p className="text-xl text-black hover:text-gray-700">Services</p>
//                 </Link>
//                 <Link href="/contact">
//                   <p className="text-xl text-black hover:text-gray-700">Contact</p>
//                 </Link>
//                 {/* Add more links as needed */}
//               </div>
//             </div>
//           )}
          
//           {/* Additional Mobile Menu (if needed) */}
//           <div className="flex justify-between mt-4">
//             <div className="text-xl text-white flex gap-4">
//               <Link href="/best">
//                 <div>BEST</div>
//               </Link>
//               <Link href="/news">
//                 <div>NEWS</div>
//               </Link>
//               <Link href="/flower">
//                 <div className="flex gap-1 items-center">
//                   FLOWER <FcCloseUpMode className="text-2xl" />
//                 </div>
//               </Link>
//               <Link href="/nin">
//                 <div>N in</div>
//               </Link>
//             </div>
            
//             {/* Right Div */}
//             <div className="text-white flex text-xl items-center">
//               <MdKeyboardArrowDown />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




