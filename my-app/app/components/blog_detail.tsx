import React from 'react'
import Image from 'next/image'
import { supabaseKey } from '../utils/config'
export default function Blog_Detail(prop:any) {
  return (
    <div className='flex flex-col justify-center items-center '>
        {/* text */}
        <div className='text-2xl font-bold'>Product Description</div>
        {/* image */}
        <div className='md:w-[896px] md:h-[1400px] w-[350px] h-[400px] bg-gray-300 mt-2'>
         
            <Image 
            src={`${supabaseKey}${prop.image}`}
            alt='anything'
            width={896}
             height={1400} 
             className='h-full w-full'
            />
        
        </div>
    </div>
  )
}
