'use client'
import React, { useState } from 'react';
import Button from './button';
import SearchBar from './productSearchBar';

export default function Productheader() {
  const [showFilters, setShowFilters] = useState(false); 

  const handleShowFiltersClick = () => {
    setShowFilters(!showFilters); 
  };

  return (
    <div className="bg-[#f6f4ee] mt-3 py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-[600]">All Products</h2>
          <Button 
            tittle={showFilters ? 'Hide Filters' : 'Show Filters'} 
            onClick={handleShowFiltersClick} 
          />
        </div>
        {showFilters && (
          <div className="w-full">
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
}
