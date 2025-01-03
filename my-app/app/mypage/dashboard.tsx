// components/MyPage.tsx

"use client";

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/Aouthcontext';
import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';

const MyPage: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  
  const { user, logout, loading } = context;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e5aaa3]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-24 sm:mt-18 lg:mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
            My Page
          </h2>

          <div className="mb-4 sm:mb-6">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Profile Circle */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-gray-500">
                      Me+
                    </span>
                  </div>
                </div>

                {/* User Details */}
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <h2 className="text-2xl md:text-3xl text-gray-500 font-semibold">
                      <span style={{ textTransform: 'capitalize' }}>
                        {user.firstName} {user.lastName}
                      </span>
                    </h2>

                    <div className="flex flex-col gap-2 ml-10">
                      <Link href="/mypage/update">
                        <li className="text-sm bg-white px-2 py-1 cursor-pointer rounded flex items-center gap-1 hover:bg-gray-50">
                          <IoSettingsOutline />
                          Correction
                        </li>
                      </Link>

                      <button
                        onClick={logout}
                        className="text-sm bg-white px-2 py-1 cursor-pointer rounded flex items-center gap-1 hover:bg-gray-50"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto"></div>
              </div>
            </div>
          </div>

          {/* Order Status Section */}
          <div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <h3 className="text-lg font-medium">Order Status</h3>
                  <span className="text-sm text-gray-500 ml-2">
                    [Click on the status to check the related orders.]
                  </span>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {[
                   { name: 'Processing', img: '/images/dress.webp', slug: 'processing' },
                   { name: 'In Transit', img: '/images/transat.webp', slug: 'in-transit' },
                   { name: 'Delivery Completed', img: '/images/delivery.webp', slug: 'delivery-completed' },
                   { name: 'Cancelled', img: '/images/cancel.webp', slug: 'cancelled' },
                   { name: 'Refunded', img: '/images/refuse.webp', slug: 'refunded' },
                  ].map((status, index) => (
                    <Link
                      key={index}
                      href={`/mypage/orders/${status.slug.toLowerCase().replace(' ', '-')}`}
                      
                    >
                      <li className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all bg-gray-50 hover:bg-[#e5aaa3] hover:text-white group">
                        <div className="w-12 h-12 mb-2 flex items-center justify-center">
                          <Image
                            src={status.img}
                            alt={status.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 group-hover:filter group-hover:brightness-0 group-hover:invert"
                          />
                        </div>
                        <span className="text-sm text-center font-medium">
                          {status.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
