"use client";

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../login/_components/Aouthcontext'; // Corrected path
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter();

  console.log("MyPage - User:", user); // Debugging log

  // Protect the page by redirecting if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p> {/* Ya koi loading spinner */}
      </div>
    );
  }

  if (!user) {
    return null; // Ya koi fallback UI
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
        My Page
      </h2>
      
      {/* User Information Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        {/* Profile Section */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-gray-500">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </span>
          </div>
        </div>

        {/* User Details */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl md:text-2xl text-gray-700 font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          </div>

        {/* User Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link href="/account/update">
            <li className="text-sm bg-gray-100 px-4 py-2 cursor-pointer rounded flex items-center gap-2 hover:bg-gray-200">
              {/* SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Update Account
            </li>
          </Link>

          <button
            onClick={logout}
            className="text-sm bg-gray-100 px-4 py-2 cursor-pointer rounded flex items-center gap-2 hover:bg-gray-200"
          >
            {/* SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* Order Status Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium">Order Status</h3>
            <span className="text-sm text-gray-500 ml-2">
              [Click on the status to check the related orders.]
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Order Status Items */}
            {[
              { name: "Processing", img: "/images/dress.webp" },
              { name: "In Transit", img: "/images/transat.webp" },
              { name: "Delivery Completed", img: "/images/delivery.webp" },
              { name: "Cancelled", img: "/images/cancel.webp" },
              { name: "Refunded", img: "/images/refuse.webp" },
            ].map((status, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all bg-gray-50 hover:bg-[#e5aaa3] hover:text-white group"
              >
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <Image
                    src={status.img}
                    alt={status.name}
                    width={64}
                    height={64}
                    className="group-hover:filter group-hover:brightness-0 group-hover:invert"
                  />
                </div>
                <span className="text-sm text-center font-medium">
                  {status.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
