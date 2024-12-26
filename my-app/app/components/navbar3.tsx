// components/Navbar3.tsx
"use client";

import React, { useContext } from 'react';
import { APP_LINKS } from "../utils/constant";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FcCloseUpMode } from "react-icons/fc";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

import ShowNav from "./shownav";
import NavArrowBar from "./navarrowbar";

import { AuthContext } from '../login/_components/Aouthcontext'; // Correct path to AuthContext
import { useRouter } from 'next/navigation'; // For programmatic navigation

export default function Navbar3() {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const router = useRouter(); // Initialize router for navigation

  const handleUserIconClick = () => {
    if (user) {
      router.push('/mypage'); // Redirect to MyPage if user is logged in
    } else {
      router.push('/login'); // Redirect to Login if user is not logged in
    }
  };

  return (
    <>
      <div className="w-full h-auto bg-white">
        {/* Desktop View */}
        <div className='w-full h-auto md:h-[80px] hidden md:flex gap-6 bg-white items-center justify-center'>
          {/* Brand Name */}
          <div className="text-3xl tracking-[5px] text-[#877b73] font-semibold">ATTRANGS</div>
          
          {/* Navigation Links */}
          <div className="flex gap-4">
            {APP_LINKS.map((link, index) => (
              <Link href={link.href} key={index}>
                <p className="font-medium text-[#877b73]">{link.name}</p>
              </Link>
            ))}
          </div>
          
          {/* Icons */}
          <div className="text-2xl flex text-[#877b73] gap-5 -mt-3">
            {/* User Icon */}
            <div className="w-[18px] h-[18px]">
              <FiUser onClick={handleUserIconClick} className="cursor-pointer" />
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
              <FiSearch />
            </div>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="px-4 md:hidden">
          {/* Top Mobile Navbar */}
          <div className='w-full h-[80px] flex justify-between bg-white items-center'>
            {/* Left Icons */}
            <div className="text-3xl flex text-[#877b73] gap-3">
              <ShowNav />
              <FaRegHeart />
            </div>
            
            {/* Brand Name */}
            <div className="text-xl tracking-[5px] text-[#877b73] font-semibold">ATTRANGS</div>
            
            {/* Right Icons */}
            <div className="text-3xl flex text-[#877b73] gap-3">
              <CiSearch />
              <FiUser onClick={handleUserIconClick} className="cursor-pointer" />
              <IoBagOutline />
            </div>
          </div>
          
          {/* Bottom Mobile Navbar */}
          <div className="flex justify-between mt-4">
            {/* Navigation Links */}
            <div className="text-xl text-[#877b73] flex gap-4">
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
    </>
  )
}
