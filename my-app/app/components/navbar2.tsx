"use client"
import { APP_LINKS } from "../utils/constant";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { HiOutlineBars3  } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import { FcCloseUpMode } from "react-icons/fc";

import { useState } from "react";

import NavArrowBar from "./navarrowbar";
export default function Navbar2() {
    const [isShow, setIsShow] = useState(false);

    const handleShow = () => {
      setIsShow(true);
    };
  
    const handleClose = () => {
      setIsShow(false);
    };
  return (
    <>
    <div className="w-full h-auto ">
    <div className='w-full h-auto md:h-[80px] hidden md:flex gap-6  items-center justify-center'>
      {/* name div */}
      <div className="text-3xl tracking-[5px] text-white font-semibold">
       <Link href={"/"}>  ATTRANGS </Link>
        </div>
      {/* link page div */}
      <div className="flex gap-4">
          {APP_LINKS.map((link, index) => (
            <Link href={link.href} key={index}>
              <p className="font-medium text-white">{link.name}</p>
            </Link>
          ))}
        </div>
      {/* icons div */}
  <div className="text-2xl flex text-white gap-5 -mt-3">
  <Link href={"/login"}><div className="w-[18px] h-[18px]"><FiUser /></div></Link>
  <div className="w-[18px] h-[18px]"><RiShoppingBag3Line /></div>
  <div className="w-[18px] h-[18px]"><FaRegHeart /></div>
  <div className="w-[18px] h-[18px]"><FiSearch /></div>
</div>

    </div>
    {/* mobile view div start */}
    <div className="px-4 md:hidden">
      {/* first div */}
    <div className='w-[100%] h-[80px]  flex flex-wrap justify-between items-center '>
      {/* 1st icon div */}
      <div className="text-3xl flex text-white gap-3">
        <div><HiOutlineBars3 onClick={handleShow} className="cursor-pointer"/></div>
        <div><FaRegHeart/></div>
      </div>
          {/* Sidebar Overlay */}
           {isShow && (
            <div className="fixed inset-0 bg-white h-screen z-20 flex flex-col">
              {/* Close Icon */}
              <div className="flex justify-end p-4">
                <HiOutlineX onClick={handleClose} className="text-2xl cursor-pointer" />
              </div>
              
              {/* Navigation Links */}
              <div className="flex flex-col mx-8 items-start gap-8 mt-6">
                {APP_LINKS.map((link, index) => (
                  <Link href={link.href} key={index}>
                    <p className="text-xl text-black hover:text-gray-700">{link.name}</p>
                  </Link>
                ))}

              </div>
            </div>
          )}
      {/* name div */}
      <div className="text-xl text-white tracking-[5px] font-semibold">ATTRANGS</div>
      
      {/* icons div */}
      <div className="text-3xl flex text-white gap-3">
      <div><FiSearch/></div>
        <div><FiUser/></div>
        <div> <RiShoppingBag3Line/></div>
      </div>

    </div>
     {/* 2nd div */}
     <div className="flex justify-between  mt-4">
      <div className="text-xl text-white flex gap-4">
        <div>BEST</div>
        <div>NEWS</div>
        <div className="flex gap-1 items-center">FLOWER <span><FcCloseUpMode className="text-2xl"/></span></div>
        <div>N in</div>
      </div>
      {/* right div */}
      <div><NavArrowBar bgColor=""/></div>
    </div>

    
    </div>
   
    </div>
    
    
    </>
  )
}



// "use client";

// import { APP_LINKS } from "../utils/constant";
// import Link from "next/link";
// import { FaRegHeart } from "react-icons/fa";
// import { RiShoppingBag3Line } from "react-icons/ri";
// import { FiSearch, FiUser } from "react-icons/fi";
// import { HiOutlineBars3 } from "react-icons/hi2";
// import { FcCloseUpMode } from "react-icons/fc";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { HiOutlineX } from "react-icons/hi"; // Import Close Icon
// import { useState } from "react";
// // import Navbar3 from "./navbar3"; // Assuming you don't need this
// // import ShowNav from "./showNav"; // We will handle sidebar here

// export default function Navbar2() {
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





// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
 
// export default function Navbar2() {
//   return (
//     <div className="hidden md:flex place-content-center items-center space-x-7   py-4 top-0 left-0 right-0 z-50">
//       {/* Logo Section */}
//       <Link href="/" className="text-[20px] tracking-[5px] text-white">
//         ATTRANGS
//       </Link>

//       {/* Navigation Links */}
//       <div className="hidden md:flex gap-3 items-center">
//         <div className="flex gap-3 text-black items-center">
//           <Link href="/" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Home
//           </Link>
//           <Link href="/category/Dresses" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Dresses
//           </Link>
//           <Link href="/category/Tops" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Tops
//           </Link>
//           <Link href="/category/Sweatshirts-&-Hoodies" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Sweatshirts &amp; Hoodies
//           </Link>
//           <Link href="/category/Outerwear" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Outerwear
//           </Link>
//           <Link href="/category/Skirts" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Skirts
//           </Link>
//           <Link href="/category/Pants" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Pants
//           </Link>
//           <Link href="/shop" className="group relative custom-font whitespace-nowrap text-[13px] text-white">
//             Shop
//           </Link>
//         </div>

//         {/* Icon Links */}
//         <div className="flex gap-2 ml-8 justify-center items-center">
//           <Link href="/account" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-white w-[30px]"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//               <circle cx="12" cy="7" r="4"></circle>
//             </svg>
//           </Link>

//           <Link href="/cart" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-white w-[30px]"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             ><a class="text-[#877b73] whitespace-nowrap text-sm" href="#">BEST</a>
//               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//               <line x1="3" y1="6" x2="21" y2="6"></line>
//               <path d="M16 10a4 4 0 0 1-8 0"></path>
//             </svg>
//           </Link>

//           <Link href="/wishlist" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-white w-[30px]"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//             </svg>
//           </Link>

//           <Link href="#" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-white w-[30px]"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

