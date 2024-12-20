
import { APP_LINKS } from "../utils/constant";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FcCloseUpMode } from "react-icons/fc";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

import { MdKeyboardArrowDown } from "react-icons/md";
import ShowNav from "./shownav";
import NavArrowBar from "./navarrowbar";
export default function Navbar3() {
  return (
    <>
    <div className="w-full h-auto bg-white">
    <div className='w-full h-auto md:h-[80px] hidden md:flex gap-6 bg-white items-center justify-center'>
      {/* name div */}
      <div className="text-3xl tracking-[5px] text-[#877b73] font-semibold">ATTRANGS</div>
      {/* link page div */}
      <div className="flex gap-4">
          {APP_LINKS.map((link, index) => (
            <Link href={link.href} key={index}>
              <p className="font-medium text-[#877b73]">{link.name}</p>
            </Link>
          ))}
        </div>
      {/* icons div */}
      <div className="text-2xl flex text-[#877b73] gap-5 -mt-3">
  <Link href={"/login"}><div className="w-[18px] h-[18px]"><FiUser /></div></Link>
  <div className="w-[18px] h-[18px]"><RiShoppingBag3Line /></div>
  <div className="w-[18px] h-[18px]"><FaRegHeart /></div>
  <div className="w-[18px] h-[18px]"><FiSearch /></div>
</div>
    </div>
    {/* mobile view div start */}
    <div className="px-4 md:hidden">
      {/* first div */}
    <div className='w-[100%] h-[80px]  flex flex-wrap justify-between  bg-white items-center '>
      {/* 1st icon div */}
      <div className="text-3xl flex text-[#877b73] gap-3">
        <div><ShowNav/></div>
        <div><FaRegHeart/></div>
      </div>
      {/* name div */}
      <div className="text-xl tracking-[5px] text-[#877b73] font-semibold">ATTRANGS</div>
      
      {/* icons div */}
      <div className="text-3xl flex text-[#877b73] gap-3">
      <div><CiSearch/></div>
        <div><FiUser/></div>
        <div> <IoBagOutline/></div>
      </div>

    </div>
     {/* 2nd div */}
     <div className="flex justify-between  mt-4">
      <div className="text-xl text-[#877b73]  flex gap-4">
        <div>BEST</div>
        <div>NEWS</div>
        <div className="flex gap-1 items-center">FLOWER <span><FcCloseUpMode className="text-2xl"/></span></div>
        <div>N in</div>
      </div>
      {/* right div */}
      <div><NavArrowBar bgColor="bg-white"/></div>
      
    </div>

    
    </div>
   
    </div>
    
    
    </>
  )
}


// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
 
// export default function Navbar3() {
//   return (
//     <div className="hidden md:flex place-content-center bg-white items-center space-x-7 text-black   py-4 top-0 left-0 right-0 z-50">
//       {/* Logo Section */}
//       <Link href="/" className="text-[20px] tracking-[5px] text-black">
//         ATTRANGS
//       </Link>

//       {/* Navigation Links */}
//       <div className="hidden md:flex gap-3 items-center">
//         <div className="flex gap-3 text-black items-center">
//           <Link href="/" className="group relative custom-font whitespace-nowrap text-[13px]">
//             Home
//           </Link>
//           <Link href="/category/Dresses" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Dresses
//           </Link>
//           <Link href="/category/Tops" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Tops
//           </Link>
//           <Link href="/category/Sweatshirts-&-Hoodies" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Sweatshirts &amp; Hoodies
//           </Link>
//           <Link href="/category/Outerwear" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Outerwear
//           </Link>
//           <Link href="/category/Skirts" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Skirts
//           </Link>
//           <Link href="/category/Pants" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Pants
//           </Link>
//           <Link href="/shop" className="group relative custom-font whitespace-nowrap text-[13px] ">
//             Shop
//           </Link>
//         </div>

//         {/* Icon Links */}
//         <div className="flex gap-2 ml-8 justify-center items-center">
//           <Link href="/account" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-black w-[30px]"
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
//               className="stroke-black w-[30px]"
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
//               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//               <line x1="3" y1="6" x2="21" y2="6"></line>
//               <path d="M16 10a4 4 0 0 1-8 0"></path>
//             </svg>
//           </Link>

//           <Link href="/wishlist" className="w-full flex justify-center items-center">
//             {/* SVG Icon */}
//             <svg
//               className="stroke-black w-[30px]"
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
//               className="stroke-black w-[30px]"
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

