"use client"
import Image from 'next/image';
import Link from 'next/link';
import { CiCircleInfo } from 'react-icons/ci'; // Add this import statement
import React, { useState } from "react";
import WishlistButton from '../components/whishlist_button';
import { IoIosClose } from 'react-icons/io';
import Card from '../components/pagecard';


interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
  link?: string;
}

export default function ShoppingCart(props:any) {
  const [quantity, setQuantity] = useState(1);

  

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
  const products: Product[] = [
    {
      id: 1,
      image: "/card images/cardimage1.gif",
      oldPrice: "3000",
      discount: "-200.00%",
      price: "90000",
      description: "Test Product 1",
    },
    {
      id: 2,
      image: "/card images/cardimage2.gif",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    {
      id: 3,
      image: "/card images/cardimage3.webp",
      oldPrice: "3500",
      discount: "-10.00%",
      price: "3150",
      description: "Test Product 3",
    },
    {
      id: 4,
      image: "/card images/cardimage4.webp",
      oldPrice: "3500",
      discount: "-10.00%",
      price: "3150",
      description: "Test Product 4",
    },
    {
      id: 5,
      image: "/card images/cardimage2.gif",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    {
      id: 6,
      image: "/card images/cardimage3.webp",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    {
      id: 7,
      image: "/card images/cardimage4.webp",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    // Add more products as needed
  ];
  return (
    <div className='bg-white'>
    <div className="bg-[#f6f4ee] py-10 sm:py-20 w-full mt-40 md:mt-20">
         <div  className="flex justify-center item-center gap-2">

         <h2 className=' text-2xl sm:text-[38px] font-semibold '>
        Shopping Cart
       

      </h2>
      <CiCircleInfo className='text-xl sm:text-[30px]  mt-2 ' />
      

         </div>
      <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
        <Link href="/order">
          <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
            Order/Delivery Inquiry
          </p>
        </Link>
        <Link href="/inquiry">
          <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
            Recently Viewed Products
          </p>
        </Link>
        <Link href="/cart">
          <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
            Shopping Cart
          </p>
        </Link>
        <Link href="/great">
          <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">great</p>
        </Link>
      </div>

      <div className="mt-10 sm:mt-28 w-[95%] sm:w-[80%] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-[10px] flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <input className="w-[15px] h-[15px] mr-[4px]" type="checkbox" />
              <label className="text-[10px] sm:text-xs">Select all products</label>
            </div>
          </div>
        </div>

        <div className="w-full pb-4 my-6 bg-white rounded-lg">
          {/* first div product */}
          <div className="border-b bg-white border-gray-100 hover:bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center p-4">
              <input className="mt-2 w-4 h-4 mr-4" type="checkbox" />
              <div className="relative w-[120px] h-[120px] flex-shrink-0">
                <Image
                  alt="test"
                  loading="lazy"
                  layout="fill"
                  className="rounded"
                  src="/card images/cardimage1.gif"
                />
              </div>
              <div className="flex-1 ml-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-2">Lace Shirring Wool Pajama Set</h3>
                  </div>
                  <div className="flex mr-20 gap-4 items-center">
                    <p className="text-sm font-semibold">
                    55.05 won</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[110px] flex justify-between border-2 border-gray-300 rounded-md gap-4">
                    <button
            onClick={decreaseQuantity}
            className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
                      <button
            onClick={increaseQuantity}
            className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
          >
            +
          </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                     <WishlistButton product={props} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                    <IoIosClose className="text-[24px] text-gray-500"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] sm:w-[60%] mx-auto mt-8">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Selected Products (0)</span>
              <span className="text-lg font-semibold">0 won</span>
            </div>
            <div className="flex justify-center gap-4">
              <button
                disabled
                className="px-8 py-3 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-400"
              >
                Select Order (0)
              </button>
              <button className="px-8 py-3 bg-[#c7918a] text-white rounded-lg text-sm hover:bg-[#b17f79]">
                Total Orders (0)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* second page */}
    <div className='w-full'>
      {/* text div */}
      <div className='text-center text-2xl font-semibold'>Views are skyrocketing! Now on sale!</div>
      {/* cards div */}
      <div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              price={product.price}
              description={product.description}
              slug={product.link}
            />
          ))}
        </div>
      </div>

    </div>
    </div>
  );
}
