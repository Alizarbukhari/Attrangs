"use client";

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/Aouthcontext';
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const { user, logout, loading } = useContext(AuthContext);
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
                      <span style={{textTransform: 'capitalize'}}>
                        {user.firstName} {user.lastName}
                      </span>
                    </h2>
                    
                    <div className="flex flex-row gap-2 ml-10">
                      <Link href="/account/update">
                        <div className="text-sm bg-gray-100 px-2 py-1 bg-white cursor-pointer rounded flex items-center gap-1 hover:bg-gray-50">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                          correction
                        </div>
                      </Link>
                      
                      <button onClick={logout} className="text-sm bg-gray-100 px-2 py-1 bg-white cursor-pointer rounded flex items-center gap-1 hover:bg-gray-50">
                        log out
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
                   { name: "Processing", img: "/images/dress.webp" },
                   { name: "In Transit", img: "/images/transat.webp" },
                   { name: "Delivery Completed", img: "/images/delivery.webp" },
                   { name: "Cancelled", img: "/images/cancel.webp" },
                   { name: "Refunded", img: "/images/refuse.webp" },
                  ].map((status, index) => (
                    <div key={index} className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all bg-gray-50 hover:bg-[#e5aaa3] hover:text-white group">
                      <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <img
                          src={status.img}
                          alt={status.name}
                          className="w-8 h-8 group-hover:filter group-hover:brightness-0 group-hover:invert"
                        />
                      </div>
                      <span className="text-sm text-center font-medium">{status.name}</span>
                    </div>
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
