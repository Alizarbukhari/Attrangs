"use client";

import React, { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Navbar3 from './navbar3';
import Navbar1 from './navbar1';
import SearchModal from './_searching-component/searchModel';

export default function Navbar4() {

  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 100) { // Scroll threshold (when to hide Navbar2 and show Navbar3)
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  


  return (
    <div className="w-full">
      <div className="relative">
        
        {/* Navbar2 Ko Include Karein (Visible until scrolled) */}
        <div className={`fixed z-20 ${isScrolled ? 'hidden' : 'block'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
              <Navbar1 />
              <Navbar3 onSearchOpen={() => setIsSearchOpen(true)} />
            </div>
          </div>
        </div>

        {/* Navbar3 Ko Include Karein (Visible after scrolling) */}
        <div className={`fixed z-20 top-0 ${isScrolled ? 'block' : 'hidden'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
            <Navbar3 onSearchOpen={() => setIsSearchOpen(true)} />
            </div>
          </div>
        </div>
       
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
