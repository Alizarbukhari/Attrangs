"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { fetchProductsByCategory, Product } from "@/app/api/search/productRout";
import { supabaseKey } from '../utils/config';

// Define the categories you want to display and their respective links
const categories: { name: string; link: string }[] = [
  { name: 'dresses', link: 'dresses' },
  { name: 'skirts', link: 'skirts' },
  { name: 'top', link: 'tops' },
  { name: 'outerwear', link: 'outerwear' },
  { name: 'swearts-hodis', link: 'sweatshirts-&-Hoodies' },
  { name: 'pants', link: 'pants' }

];

interface CategorySlide {
  category: string;
  product?: Product;
}

const SlideImages: React.FC = () => {
  const [categorySlides, setCategorySlides] = useState<CategorySlide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch one product per category
    const fetchCategorySlides = async () => {
      try {
        const fetchPromises = categories.map(async (category) => {
          const products = await fetchProductsByCategory(category.name, 1);
          return {
            category: category.link,
            product: products[0], // Get the first product
          };
        });

        const results = await Promise.all(fetchPromises);
        setCategorySlides(results);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching category slides:", err);
        setError("Failed to load category slides.");
        setIsLoading(false);
      }
    };

    fetchCategorySlides();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-gray-500'>Loading slides...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='px-12'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: false }}
        loop={true}
        autoplay={{
          delay: 5000, 
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
        {categorySlides.map((slide, index) => {
          if (!slide.product) {
            // If no product found for the category, skip rendering this slide
            return null;
          }

          return (
            <SwiperSlide key={index}>
              <Link href={`/category/${slide.category}`} passHref>
                <li className='block'>
                  <div className='flex flex-col justify-center w-full mb-4'>
                    <div className='h-[192px] w-full'>
                      <Image 
                        src={`${supabaseKey}${slide.product.image}`}
                        alt={slide.product.name || slide.category} 
                        width={300} 
                        height={192} 
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex justify-center items-center text-center mt-2'>
                      <p className='text-black text-lg font-semibold capitalize'>{slide.category.replace('-', ' ')}</p>
                    </div>
                  </div>
                </li>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideImages;
