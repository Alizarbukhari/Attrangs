// components/SlideImagesClient.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../api/search/productRout';
import { supabaseKey } from '../utils/config';


// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// Swiper modules
import { Autoplay, Pagination } from 'swiper/modules';

interface SlideImagesClientProps {
  products: Product[];
}

const SlideImagesClient: React.FC<SlideImagesClientProps> = ({ products }) => {
  return (
    <div className="px-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="mySwiper"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col justify-center items-center w-full mb-4">
              <div className="h-[192px] w-full relative rounded-lg overflow-hidden">
                <Image
                   src={`${supabaseKey}${item.image}`} // Ensure images are in public/images/
                  alt={item.name || 'Product Image'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-center items-center text-center mt-2">
                {item.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideImagesClient;
