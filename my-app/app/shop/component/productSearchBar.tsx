import React, { useState } from 'react';

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('created_at:desc');
  const [inStock, setInStock] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleInStockChange = () => {
    setInStock(!inStock);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('created_at:desc');
    setInStock(false);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (minPrice) queryParams.append('min_price', minPrice);
    if (maxPrice) queryParams.append('max_price', maxPrice);
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      queryParams.append('sort_by', field);
      queryParams.append('order', order);
    }
    if (inStock) queryParams.append('in_stock', 'true');

    onSearch(queryParams.toString());
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm mb-1">Search</label>
          <input
            placeholder="Search products..."
            className="w-full p-2 border rounded"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              placeholder="Min"
              className="w-1/2 p-2 border rounded"
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              placeholder="Max"
              className="w-1/2 p-2 border rounded"
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Sort By</label>
          <select
            className="w-full p-2 border rounded"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="created_at:desc">Newest</option>
            <option value="created_at:asc">Oldest</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A to Z</option>
            <option value="name:desc">Name: Z to A</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              className="mr-2"
              type="checkbox"
              checked={inStock}
              onChange={handleInStockChange}
            />
            <span className="text-sm">In Stock Only</span>
          </label>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="text-sm px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <button
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
