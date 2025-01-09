// components/SlideImagesServer.tsx
import React from 'react';
import { fetchProductsByCategory,Product } from '../api/search/productRout';
import SlideImagesClient from './slideImagesClient';

const categories: Array<'dresses' | 'skirts' | 'top' | 'outerwear' | 'sweats-hodies'> = [
  'dresses',
  'skirts',
  'top',
  'outerwear',
  'sweats-hodies', // Ensure correct spelling
];

const SlideImagesServer: React.FC = async () => {
  try {
    // Har category ke liye latest product fetch karein
    const latestProductsPromises = categories.map(async (category) => {
      const products = await fetchProductsByCategory(category);
      console.log(`Category: ${category}, Products Fetched: ${products.length}`);
      if (products.length === 0) return null;

      // Latest product identify karein using 'updated_at' ya 'created_at'
      const latestProduct = products
        .filter(p => p.updated_at || p.created_at) // Ensure there is a date
        .sort((a, b) => {
          const dateA = new Date(a.updated_at ?? a.created_at ?? '1970-01-01').getTime();
          const dateB = new Date(b.updated_at ?? b.created_at ?? '1970-01-01').getTime();
          return dateB - dateA; // Descending order
        })[0];

      console.log(`Latest Product for ${category}:`, latestProduct);
      return latestProduct;
    });

    const latestProductsWithNull = await Promise.all(latestProductsPromises);
    // Null values ko hata dein (agar koi category mein product nahi hai)
    const latestProducts: Product[] = latestProductsWithNull.filter(
      (product): product is Product => product !== null
    );

    console.log('Final Latest Products:', latestProducts); // Debugging

    // Remove duplicates if any
    const uniqueLatestProducts: Product[] = [];
    const seenIds = new Set<number>();

    latestProducts.forEach(product => {
      if (!seenIds.has(product.id)) {
        uniqueLatestProducts.push(product);
        seenIds.add(product.id);
      }
    });

    console.log('Unique Latest Products:', uniqueLatestProducts); // Debugging

    return <SlideImagesClient products={uniqueLatestProducts} />;
  } catch (error) {
    console.error(error);
    return <div>Error loading products.</div>;
  }
};

export default SlideImagesServer;
