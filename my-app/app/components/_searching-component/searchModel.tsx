// frontend/components/SearchModal.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { supabaseKey } from '@/app/utils/config';


interface Product {
  id: number;
  name: string;
  image?:string
  slug: string;
  description?: string;
  price: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setIsLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/search?query=${encodeURIComponent(searchQuery)}&limit=10`);
        
        if (!response.ok) {
          throw new Error('Search failed');
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-full inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
      <div className="w-full h-full bg-white p-4">
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
          {isLoading ? (
            <div className="text-center text-[#877b73]">Searching...</div>
          ) : (
            
            results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((product) => (
                  <div key={product.id} className="border p-3 rounded">
                    <a href={`/product/${product.slug}`} className="block"> 
                    <div className='flex gap-2'>
                      <div className='w-[48px] h-[48px]'>
                        <Image 
                      src={`${supabaseKey}${product.image}`}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="w-full h-full "
                      />
                     
                      </div>
                      <div>
                      <h3 className="font-medium text-[#877b73]">{product.description}</h3>
                      <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                      
                    </a>
                  </div>
                ))}
              </div>
            )
          )}
          {!isLoading && searchQuery && results.length === 0 && (
            <div className="text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
