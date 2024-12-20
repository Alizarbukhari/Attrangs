"use client"
import { HiOutlineBars3 } from 'react-icons/hi2'
import { HiOutlineX } from "react-icons/hi";
import { APP_LINKS } from "../utils/constant";
import Link from 'next/link';
import { useState } from "react";

export default function ShowNav() {
      const [isShow, setIsShow] = useState(false);
  
      const handleShow = () => {
        setIsShow(true);
      };
    
      const handleClose = () => {
        setIsShow(false);
      };
  return (
    <>
    <div className='text-3xl text-[#877b73]'>
    <div><HiOutlineBars3 onClick={handleShow} className="cursor-pointer"/></div>
       {/* Sidebar Overlay */}
       {isShow && (
            <div className="fixed inset-0 bg-white h-screen  transition-transform duration-300 ease-in-out z-20 flex flex-col">
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
    </div>
    
    
    </>
  )
}
