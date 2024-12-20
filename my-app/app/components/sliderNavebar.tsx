"use client";

import React, { useEffect, useState } from "react";
import SliderComponent from "./navbar1";
import Navbar3 from "./navbar3";



const PageLayout: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <div className="w-full h-auto">
        {/* Slider always visible at the top initially */}
        <div className={`w-full z-10 ${isScrolled ? "hidden" : "block"}`}>
          <SliderComponent />
        </div>
  
        {/* Navbar always visible, fixed at the top */}
        <div
          className={`fixed top-0 w-full z-20 bg-white  ${
            isScrolled ? "mt-0" : "mt-[50px]"
          }`}
        >
          <Navbar3 />
        </div>
      </div>
    );
  };
  
  export default PageLayout;