This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

react library` is
--legacy-peer-deps

## Getting Started
example@gamail.com
Saj@234assss

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



"use client"
import React, { useState } from "react";

interface AddToCartProps {
  showCart: boolean;
  onClose: () => void;
}

const Add_to_cart: React.FC<AddToCartProps> = ({ showCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!showCart) return null;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[375px] h-[220px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Chiffon Wrap Aurora Dress</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Quantity</p>
        <div className="flex w-[110px] justify-between items-center gap-4 mb-6 border-2 border-gray-300 rounded-md">
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
        <button
          onClick={() => {
            alert(`Added ${quantity} item(s) to the cart!`);
            onClose();
          }}
          className="bg-black text-white py-3  mb-2 w-full rounded hover:bg-gray-800"
        >
          Put in a shopping cart
        </button>
      </div>
    </div>
  );
};

export default Add_to_cart;

