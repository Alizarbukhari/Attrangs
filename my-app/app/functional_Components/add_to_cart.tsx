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

