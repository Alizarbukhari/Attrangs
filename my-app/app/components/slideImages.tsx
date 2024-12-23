"use client"
import React from 'react'
import Image from 'next/image'
import { slideData } from '../data/slideImageData'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

// Import required modules
import { Autoplay } from 'swiper/modules'

export default function SlideImages() {
  return (
    <div className='px-12'>
      <Swiper
        // Configure Swiper to use modules
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation  {/* Removed navigation prop */}
        pagination={{ clickable: false }}
        loop={true}
        autoplay={{
          delay: 10000, 
          disableOnInteraction: false,
        }}
        breakpoints={{
         
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className='mySwiper'
      >
        {slideData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='flex flex-col justify-center w-full mb-4'>
              <div className='h-[192px]  w-full'>
                <Image 
                  src={item.image} 
                  alt={item.alt} 
                  width={300} 
                  height={192} 
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex justify-center items-center text-center mt-2'>
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
