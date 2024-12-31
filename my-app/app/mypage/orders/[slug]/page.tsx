// app/mypage/orders/[slug]/page.tsx
"use client"
import React from 'react';
import { useParams } from 'next/navigation'; 
import MainContent from './_component/main-content';
import PageLayout from '@/app/components/sliderNavebar';
import { slugData } from './_component/slugData';

const SlugPage = () => {
    const { slug } = useParams(); 
    const slugKey = Array.isArray(slug) ? slug[0] : slug;
  
   
    const content = slugData[slugKey as 'processing' | 'in-transit' | 'delivery-completed' | 'cancelled' | 'refunded'] || {
      title: 'Unknown Order Status',
      description: 'The selected order status is not recognized.',
    };
  
    return (
      <div>
        <PageLayout/>
        <div className='w-full h-[100px] '></div>
        <MainContent title={content.title} description={content.description} />
      </div>
    );
  };
  
  export default SlugPage;