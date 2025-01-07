import Image from 'next/image';
import Link from 'next/link';
import { CiCircleInfo } from 'react-icons/ci'; // Add this import statement


export default function ShoppingCart() {
  return (
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
                  src="/_next/image?url=https%3A%2F%2Fsa6r6rteccgfi51n.public.blob.vercel-storage.com%2F1732611238_0-Iei7mB0JsfqgpCUAnwUMT4ucp4rfG8.jpg&w=3840&q=75"
                />
              </div>
              <div className="flex-1 ml-6">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-2">test</h3>
                  </div>
                  <div className="flex mr-20 gap-4 items-center">
                    <p className="text-sm font-semibold">90000 won</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center border rounded">
                      <button className="px-4 py-1 hover:bg-gray-50">−</button>
                      <span className="px-4 py-1 min-w-[40px] text-center">2</span>
                      <button className="px-4 py-1 hover:bg-gray-50">+</button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Image
                        alt="Add to wishlist"
                        loading="lazy"
                        width={16}
                        height={16}
                        src="/assets/icons/heart.svg"
                      />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-700 transition-colors">
                      <Image
                        alt="Remove item"
                        loading="lazy"
                        width={16}
                        height={16}
                        src="/assets/icons/close.svg"
                      />
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
  );
}
