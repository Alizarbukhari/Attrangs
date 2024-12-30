"use client";

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Close icon from react-icons

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="fixed w-full h-full inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
      <div className="w-full h-full bg-white p-4 ">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium text-[#877b73]">
            <span>Search</span>
          </div>
          <button onClick={onClose}>
            <AiOutlineClose className="w-[30px] h-[30px] text-[#877b73]" />
          </button>
        </div>
        <div className="flex">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-4">
          {/* Optional extra content, if needed */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
