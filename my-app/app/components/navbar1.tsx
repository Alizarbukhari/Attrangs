"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  maintitle: string;
}

const slides: Slide[] = [
  {
    id: 0,
    maintitle: "50% OFF on all clothes! Limited time only. Shop now!",
  },
  {
    id: 1,
    maintitle: "여기에서 세일 받아가세요",
  },
  {
    id: 2,
    maintitle: "세일 받아가세요",
  },
  {
    id: 3,
    maintitle: "역기에서 세일받아가세요123213",
  },
];

const SliderComponent: React.FC = () => (
  <div className="flex justify-center items-center h-[50px] bg-[#e5aaa3] text-white">
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20} // Adjusted space between slides
      slidesPerView={1}
      autoplay={{
        delay: 3000, // 3 seconds delay
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="flex justify-center items-center h-full">
            <a
              href={`/sale-${slide.id}`}
              className="transition-transform duration-300 hover:scale-105 text-center"
            >
              {slide.maintitle}
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default SliderComponent;
