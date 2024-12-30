// components/Navbar3.tsx
"use client";

import React, { useContext, useState } from 'react';
import { APP_LINKS } from "../utils/constant";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FcCloseUpMode } from "react-icons/fc";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { getCookie } from 'cookies-next';

import ShowNav from "./shownav";
import NavArrowBar from "./navarrowbar";
import SearchModal from './_searching-component/searchModel';

import { AuthContext } from '../../context/Aouthcontext'; // Correct path to AuthContext
import { useRouter } from 'next/navigation'; // For programmatic navigation

interface Navbar2Props {
  onSearchOpen: () => void;
}

export default function Navbar3({ onSearchOpen }: Navbar2Props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleUserIconClick = () => {
    const userCookie = getCookie('user_data');
    if (user || userCookie) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full h-auto ">
        {/* Desktop View */}
        <div className='w-full h-auto md:h-[80px] hidden md:flex gap-6  items-center justify-center'>
          {/* Brand Name */}
          <div className="text-3xl tracking-[5px] text-white font-semibold">ATTRANGS</div>
          
          {/* Navigation Links */}
          <div className="flex gap-4">
            {APP_LINKS.map((link, index) => (
              <Link href={link.href} key={index}>
                <p className="font-medium text-white">{link.name}</p>
              </Link>
            ))}
          </div>
          
          {/* Icons */}
          <div className="text-2xl flex text-white gap-5 -mt-3">
            {/* User Icon with visual feedback */}
            <div className="w-[18px] h-[18px]">
              <FiUser 
                onClick={handleUserIconClick} 
                  className={`cursor-pointer ${user ? 'text-white' : 'text-white'}`} 
              />
            </div>
            
            {/* Shopping Bag Icon */}
            <div className="w-[18px] h-[18px]">
              <RiShoppingBag3Line />
            </div>
            
            {/* Heart Icon */}
            <div className="w-[18px] h-[18px]">
              <FaRegHeart />
            </div>
            
            {/* Search Icon */}
            <div className="w-[18px] h-[18px]">
              <FiSearch onClick={onSearchOpen} className="cursor-pointer" />
            </div>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="px-4 md:hidden">
          {/* Top Mobile Navbar */}
          <div className='w-full h-[80px] flex justify-between  items-center'>
            {/* Left Icons */}
            <div className="text-3xl flex text-white gap-3">
              <ShowNav />
              <FaRegHeart />
            </div>
            
            {/* Brand Name */}
              <div className="text-xl tracking-[5px] text-white font-semibold">ATTRANGS</div>
            
            {/* Right Icons */}
            <div className="text-3xl flex text-white gap-3">
              <CiSearch onClick={onSearchOpen} className="cursor-pointer" />
              <FiUser 
                onClick={handleUserIconClick} 
                className={`cursor-pointer ${user ? 'text-white' : 'text-white'}`}
                title={user ? `Welcome, ${user.firstName}` : 'Login'} 
              />
              <IoBagOutline />
            </div>
          </div>
          
          {/* Bottom Mobile Navbar */}
          <div className="flex justify-between mt-4">
            {/* Navigation Links */}
            <div className="text-xl text-white flex gap-4">
              <div>BEST</div>
              <div>NEWS</div>
              <div className="flex gap-1 items-center">
                FLOWER 
                <FcCloseUpMode className="text-2xl"/>
              </div>
              <div>N in</div>
            </div>
            
            {/* Additional Navigation */}
            <div>
              <NavArrowBar bgColor="bg-white"/>
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isOpen} onClose={handleClose} />
    </>
  )
}



















// "use client"

// import { APP_LINKS } from "@/app/utils/constant";
// import { AuthContext } from '../../context/Aouthcontext';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { getCookie } from 'cookies-next';
// import { useContext, useState } from 'react';
// import { FaRegHeart } from "react-icons/fa";
// import { RiShoppingBag3Line } from "react-icons/ri";
// import { FiSearch } from "react-icons/fi";
// import { FiUser } from "react-icons/fi";
// import { HiOutlineBars3  } from "react-icons/hi2";
// import { HiOutlineX } from "react-icons/hi";
// import { FcCloseUpMode } from "react-icons/fc";
// import NavArrowBar from "./navarrowbar";

// export default function Navbar2() {

//   const [isShow, setIsShow] = useState(false);


//   const handleShow = () => {
//     setIsShow(true);
//   };

//   const handleClose = () => {
//     setIsShow(false);
//   };
//   const { user } = useContext(AuthContext);
//   const router = useRouter();

//   const handleUserIconClick = () => {
//     const userCookie = getCookie('user_data');
//     console.log("Cookie data:", userCookie);
//     console.log("Context user:", user);

//     if (user || userCookie) {
//       console.log("User found, going to mypage");
//       router.push('/mypage');
//     } else {
//       console.log("No user found, going to login");
//       router.push('/login');
//     }
//   };

//   return (
//     <>
//     <div className="w-full h-auto ">
//     <div className='w-full h-auto md:h-[80px] hidden md:flex gap-6  items-center justify-center'>
//       {/* name div */}
//       <div className="text-3xl tracking-[5px] text-white font-semibold">
//        <Link href={"/"}>  ATTRANGS </Link>
//         </div>
//       {/* link page div */}
//       <div className="flex gap-4">
//           {APP_LINKS.map((link, index) => (
//             <Link href={link.href} key={index}>
//               <p className="font-medium text-white">{link.name}</p>
//             </Link>
//           ))}
//         </div>
//       {/* icons div */}
//   <div className="text-2xl flex text-white gap-5 -mt-3">
//   <Link href={"/login"}><div className="w-[18px] h-[18px]"><FiUser /></div></Link>
//   <div className="w-[18px] h-[18px]"><RiShoppingBag3Line /></div>
//   <div className="w-[18px] h-[18px]"><FaRegHeart /></div>
//   <div className="w-[18px] h-[18px]"><FiSearch /></div>
// </div>

//     </div>
//     {/* mobile view div start */}
//     <div className="px-4 md:hidden">
//       {/* first div */}
//     <div className='w-[100%] h-[80px]  flex flex-wrap justify-between items-center '>
//       {/* 1st icon div */}
//       <div className="text-3xl flex text-white gap-3">
//         <div><HiOutlineBars3 onClick={handleShow} className="cursor-pointer"/></div>
//         <div><FaRegHeart/></div>
//       </div>
//           {/* Sidebar Overlay */}
//            {isShow && (
//             <div className="fixed inset-0 bg-white h-screen z-20 flex flex-col">
//               {/* Close Icon */}
//               <div className="flex justify-end p-4">
//                 <HiOutlineX onClick={handleClose} className="text-2xl cursor-pointer" />
//               </div>
              
//               {/* Navigation Links */}
//               <div className="flex flex-col mx-8 items-start gap-8 mt-6">
//                 {APP_LINKS.map((link, index) => (
//                   <Link href={link.href} key={index}>
//                     <p className="text-xl text-black hover:text-gray-700">{link.name}</p>
//                   </Link>
//                 ))}

//               </div>
//             </div>
//           )}
//       {/* name div */}
//       <div className="text-xl text-white tracking-[5px] font-semibold">ATTRANGS</div>
      
//       {/* icons div */}
//       <div className="text-3xl flex text-white gap-3">
//       <div><FiSearch/></div>
//       <FiUser 
//                 onClick={handleUserIconClick} 
//                 className={`cursor-pointer ${user ? 'text-[#e5aaa3]' : 'text-[#877b73]'}`}
//                 title={user ? `Welcome, ${user.firstName}` : 'Login'} 
//               />
//         <div> <RiShoppingBag3Line/></div>
//       </div>

//     </div>
//      {/* 2nd div */}
//      <div className="flex justify-between  mt-4">
//       <div className="text-xl text-white flex gap-4">
//         <div>BEST</div>
//         <div>NEWS</div>
//         <div className="flex gap-1 items-center">FLOWER <span><FcCloseUpMode className="text-2xl"/></span></div>
//         <div>N in</div>
//       </div>
//       {/* right div */}
//       <div><NavArrowBar bgColor=""/></div>
//     </div>

    
//     </div>
   
//     </div>
    
    
//     </>
//   )
// }

