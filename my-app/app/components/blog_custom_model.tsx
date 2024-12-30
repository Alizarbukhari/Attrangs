"use client";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Blog_Custom_Model() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("S"); // State to store the selected size

  // Function to handle size selection
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div>
      {/* Trigger Icon */}
      <FaChevronRight
        className="cursor-pointer text-lg"
        onClick={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg relative">
            {/* Close Icon */}
            <AiOutlineClose
              className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl"
              onClick={() => setIsModalOpen(false)}
            />
             {/* Title */}
             <div className="text-lg md:text-2xl font-bold mb-4 border-b border-gray-300 pb-4">
                Product and model size information
              </div>
            {/* Modal Content */}
            <div>
              {/* body div */}
              <div className="flex justify-between">
                {/* Size Selection */}
              <div className="mb-4">
                <div className="text-sm mb-2">Please select a size</div>
                <div className="flex gap-2">
                    {/* Size Buttons */}
                    <button
                  className={`w-10 h-10 sm:w-12 sm:h-12 border text-sm sm:text-base ${
                    selectedSize === "S"
                      ? "bg-[#e5aaa3] text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => handleSizeSelection("S")}
                >
                  S
                </button>
                <button
                  className={`w-10 h-10 sm:w-12 sm:h-12 border text-sm sm:text-base ${
                    selectedSize === "M"
                      ? "bg-[#e5aaa3] text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => handleSizeSelection("M")}
                >
                  M
                </button>
                <button
                  className={`w-10 h-10 sm:w-12 sm:h-12 border text-sm sm:text-base ${
                    selectedSize === "L"
                      ? "bg-[#e5aaa3] text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => handleSizeSelection("L")}
                >
                  L
                </button>
                </div>
              </div>
                 {/* Product Info */}
                 <div className="text-sm text-gray-700 space-y-4 w-[50%] ">
                <div className="font-bold text-sm md:text-[16px] border-b border-gray-300 py-4">Category: </div>
                <div className=" border-b md:text-2xl text-sm  border-gray-300 py-6"> <span className="font-bold text-sm md:text-[16px]">Size:</span> S/M/L</div>
                <div className="font-bold text-sm md:text-[16px] border-b border-gray-300 py-4"><span className="font-bold text-sm md:text-[16px]">Fabric</span>: </div>
                <div className=" border-b border-gray-300 py-4">
                  <div className="font-bold text-sm md:text-[16px]">Model wearing: starring</div>
                   <p className="flex  text-[#4B5563] md:text-lg text-sm ml-[32%] "> Height: 167cm Top: 44/S</p>
                 <p  className="flex  text-[#4B5563] md:text-lg text-sm ml-[32%] ">Pants: 25inch/S Shoes: 245mm</p>
                </div>
              </div>
              </div>

             

           

              {/* Notes */}
              <div className="text-sm md:text-lg text-gray-500 mt-4">
                * There may be an error of 1-3cm in size depending on the
                measurement method or location.
                <br />
                * Half high neck and polo neck are the same size except for neck
                height.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
