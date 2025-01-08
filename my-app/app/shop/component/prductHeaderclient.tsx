'use client'

import React, { useState } from 'react';
import Button from './button';

export function ProductheaderClient() {
  const [showFilters, setShowFilters] = useState(false); // State to toggle visibility of filters

  const handleShowFiltersClick = () => {
    setShowFilters(!showFilters); // Toggle the visibility of SearchBar
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Button 
        tittle={showFilters ? 'Hide Filters' : 'Show Filters'} // Change button text based on state
        onClick={handleShowFiltersClick} 
      />

      {/* Conditionally render SearchBar and ensure it has the same width as the container */}
      {showFilters && (
        <div className="w-full ml-4"> {/* Ensure the SearchBar has the same width as the container */}
      
        </div>
      )}
    </div>
  );
}
