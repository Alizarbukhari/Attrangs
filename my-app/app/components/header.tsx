"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Slide from './slide';
import { slideData } from '../data/slidedata';
import { SlideData_Types } from '@/app/types/slidetype';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import Navbar2 from './navbar2';
import Navbar3 from './navbar3';

export default function Header() {
  const swiperRef = useRef<SwiperType | null>(null); // Swiper reference

  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled

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

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Navigate to next slide
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Navigate to previous slide
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        
        {/* Navbar2 Ko Include Karein (Visible until scrolled) */}
        <div className={`fixed z-20 ${isScrolled ? 'hidden' : 'block'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
              <Navbar2 />
            </div>
          </div>
        </div>

        {/* Navbar3 Ko Include Karein (Visible after scrolling) */}
        <div className={`fixed z-20 top-0 ${isScrolled ? 'block' : 'hidden'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
              <Navbar3 />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute hidden inset-0 items-center px-40 z-10 md:flex justify-between">
          <button onClick={handlePrev} className="focus:outline-none">
            <MdOutlineArrowBackIosNew
              className="text-white text-4xl md:text-5xl lg:text-6xl hover:text-gray-300 transition-colors duration-300"
            />
          </button>
          <button onClick={handleNext} className="focus:outline-none">
            <MdOutlineArrowForwardIos
              className="text-white text-4xl md:text-5xl lg:text-6xl hover:text-gray-300 transition-colors duration-300"
            />
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper; // Initialize swiper instance
          }}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Keep autoplay even after interaction
          }}
          pagination={{ clickable: true }}
          loop={true}
          navigation={false} // Disable default navigation
          className="mySwiper"
        >
          {slideData.map((item: SlideData_Types) => (
            <SwiperSlide key={item.id}>
              <Slide
                image={item.image}
                title={item.title}
                maintitle={item.maintitle}
                price={item.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
