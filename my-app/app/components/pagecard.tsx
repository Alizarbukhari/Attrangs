// components/PageCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from './whishlist_button'; // Import the Client Component
import Cart_Button from './cart_button'; // Ensure this is also a Client Component if it handles interactivity

import { Product } from '../types/wishListType';

interface PageCardProps extends Product {}

const PageCard: React.FC<PageCardProps> = (props) => {
  return (
    <div className="mb-8">
      <div key={props.id} className="w-full md:w-[300px]">
        {/* Image */}
        <div className="w-full h-96 relative group">
          <Image
            src={props.image}
            alt={`Product ${props.id}`}
            fill
            className="rounded"
          />
          {/* Transparent overlay for hover effect */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"></div>
          {/* Text in the center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border border-white px-6 py-3 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link href={`/product/${props.slug}`}>
              <li className="text-white">View Product</li>
            </Link>
          </div>
        </div>

        {/* Prices */}
        <div className="mt-2">
          {props.oldPrice && <del className="text-gray-500">{props.oldPrice}</del>}
          <div className="flex items-center">
            {props.discount && <span className="text-red-500 mr-2">{props.discount}</span>}
            <span className="text-lg font-semibold">{props.price}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-2">
          <h3 className="text-md font-medium">{props.description}</h3>
        </div>

        {/* Additional Info (e.g., indicators) */}
        <div className="flex gap-1 mt-2">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 bg-red-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-orange-950 rounded-full"></div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 my-2"></div>
        <div className="text-red-200">Best</div>

        {/* Add to Wishlist and Cart Buttons */}
        <div className="flex justify-between items-center">
          {/* Placeholder for any text or label */}
          <div className="text-sm text-gray-600">Choose Options</div>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* Wishlist */}
            <WishlistButton product={props} />
            {/* Cart Button */}
            <Cart_Button /> {/* Ensure Cart_Button is a Client Component if needed */}
          </div>
        </div>
      </div>

      {/* Show the Add to Cart Modal if showCart is true */}
      {/* Since state is managed in Client Component, handle modals within those */}
    </div>
  );
};

export default PageCard;
