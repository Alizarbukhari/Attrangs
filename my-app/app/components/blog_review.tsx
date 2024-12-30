import React from 'react'
import { FaHeart } from 'react-icons/fa';

export default function Blog_Review() {
  return (
    <div className='flex flex-col '>
        {/* title */}
        <div className='text-2xl font-bold flex md:justify-start justify-center'>Product Review</div>
        {/* text */}
        <div className='text-sm bg-gray-50 md:w-[1200px] w-[350px] h-[44px] flex justify-center items-center'>You must log in to write a review.</div>
        {/* review */}
        <div className='flex justify-center items-center'>
        <div className='flex flex-col md:flex-row md:w-[1104px] w-full'>
            {/* total customer rating */}
            <div className='w-[357px] flex flex-col md:justify-start justify-center items-center'>
                <div className='text-2xl font-bold'>Total Customer Rating</div>
                <div className='text-[40px] font-bold'>0</div>
                <div className='flex gap-2 text-[40px] text-[#D1D5DB]'>
                <FaHeart />
                <FaHeart />
                <FaHeart />
                <FaHeart />
                <FaHeart />
                </div>
            </div>
            {/* rating ratio */}
            <div className='md:w-[747px] w-full'>
                <div className='text-center text-2xl font-bold'>Rating ratio</div>
                {/* color div */}
                <div className='flex items-center gap-8 px-4 mt-4'>
                    <div className='text-lg '>color</div>
                    <div className="flex-1 bg-gray-200 h-3 sm:h-4 rounded-full overflow-hidden"></div>
                    <div className='text-lg'>0%</div>
                </div>
                <div className='text-center text-lg mt-4 text-[#4B5563]'>The color is the same</div>
                {/* size div */}
                <div className='flex items-center gap-8 px-4 mt-4'>
                    <div className='text-lg'>size</div>
                    <div className="flex-1 bg-gray-200 h-3 sm:h-4 rounded-full overflow-hidden"></div>
                    <div className='text-lg'>0%</div>
                </div>
                <div className='text-center text-lg text-[#4B5563] mt-4'>The size fits well.</div>
                {/* quality div */}
                <div className='text-center text-[#6B7380] mt-4'>Click on a review to see reviews of similar body types!</div>
            </div>
        </div>
        </div>
        {/* button */}
        <div className='flex gap-4 mt-6'>
            <div><button className="px-2  sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#fc7e8d] text-[#fc7e8d] text-xs sm:text-sm">Option Color</button></div>            
            <div><button className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#fc7e8d] text-[#fc7e8d] text-xs sm:text-sm"> Option Size</button></div>
            <div><button className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#fc7e8d] text-[#fc7e8d] text-xs sm:text-sm">Latest</button></div>
        </div>
    </div>
  )
}