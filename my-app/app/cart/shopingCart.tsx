// app/cart/shopingCart.tsx

'use client';

import React from 'react';
import Card from '../components/castCard';
import { CartItem } from '../types/cartType';
import { useCart } from '../components/context/useCart';
import WishlistButton from '../components/whishlist_button';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { CiCircleInfo } from 'react-icons/ci';
import Image from 'next/image';

const ShoppingCart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleIncrease = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id: number) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemove = (id: number, description: string) => {
    removeFromCart(id);
    toast.info(`${description} removed from cart`);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="bg-[#f6f4ee] py-10 sm:py-20 w-full mt-40 md:mt-20">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl sm:text-[38px] font-semibold">
            Shopping Cart
          </h2>
          <CiCircleInfo className="text-xl sm:text-[30px] mt-2" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
          <Link href="/order">
            <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
              Order/Delivery Inquiry
            </p>
          </Link>
          <Link href="/inquiry">
            <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
              Recently Viewed Products
            </p>
          </Link>
          <Link href="/cart">
            <p className="text-[11px] sm:text-[13px] text-[#888] cursor-pointer hover:text-[#333]">
              Shopping Cart
            </p>
          </Link>
        </div>

        <div className="mt-10 sm:mt-28 w-[95%] sm:w-[80%] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="mb-[10px] flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <input
                  className="w-[15px] h-[15px] mr-[4px]"
                  type="checkbox"
                  // Implement select all functionality if needed
                />
                <label className="text-[10px] sm:text-xs">
                  Select all products
                </label>
              </div>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="w-20 h-20 mb-4 bg-gray-300 rounded-full"></div>
              <p className="text-lg text-gray-600 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">
                Add products to your cart to start shopping
              </p>
            </div>
          ) : (
            <>
              {cart.map((item: CartItem) => (
                <div key={item.id} className="w-full pb-4 my-6 bg-white rounded-lg">
                  <div className="border-b bg-white border-gray-100 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center p-4">
                      <input
                        className="mt-2 w-4 h-4 mr-4"
                        type="checkbox"
                        // Implement individual item selection if needed
                      />
                      <div className="relative w-[120px] h-[120px] flex-shrink-0">
                        <Image
                          alt={item.description}
                          loading="lazy"
                          layout="fill"
                          className="rounded"
                          src={item.image}
                        />
                      </div>
                      <div className="flex-1 ml-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm mb-2">
                              {item.description}
                            </h3>
                          </div>
                          <div className="flex mr-20 gap-4 items-center">
                            <p className="text-sm font-semibold">{item.price} won</p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-[110px] flex justify-between border-2 border-gray-300 rounded-md gap-4">
                              <button
                                onClick={() => handleDecrease(item.id)}
                                className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="text-lg font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrease(item.id)}
                                className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <WishlistButton product={item} />
                            </div>
                            <button
                              onClick={() => handleRemove(item.id, item.description)}
                              className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                            >
                              <FaTrashAlt className="text-[24px] text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="w-[90%] sm:w-[60%] mx-auto mt-8">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Selected Products ({cart.length})</span>
                    <span className="text-lg font-semibold">{totalPrice.toFixed(2)} won</span>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      disabled={cart.length === 0}
                      className={`px-8 py-3 border border-gray-300 rounded-lg text-sm ${
                        cart.length === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Select Order ({cart.length})
                    </button>
                    <button
                      disabled={cart.length === 0}
                      className={`px-8 py-3 rounded-lg text-sm ${
                        cart.length === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#c7918a] text-white hover:bg-[#b17f79]"
                      }`}
                    >
                      Total Orders ({totalPrice.toFixed(2)} won)
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="w-full">
        <div className="text-center text-2xl font-semibold">
          Views are skyrocketing! Now on sale!
        </div>
        <div className="mt-24 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {/* Replace with separate recommended products list */}
            {/* Example: */}
            {cart.map((product: CartItem) => (
              <Card
                key={product.id}
                id={product.id}
                image={product.image}
                oldPrice={product.oldPrice}
                discount={product.discount}
                price={product.price}
                description={product.description}
                slug={product.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
