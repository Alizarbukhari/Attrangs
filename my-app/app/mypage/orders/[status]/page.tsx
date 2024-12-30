"use client";

// pages/mypage/orders/[status].tsx

import React, { useEffect, useContext } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import OrderProcessing from '../../../components/status';
import { AuthContext } from '../../../../context/Aouthcontext';
import Link from 'next/link';

const OrdersByStatus = () => {
  const pathname = usePathname();
  const status = pathname.split('/').pop();

  const { user, loading } = useContext(AuthContext);

  const supportedStatuses = [
    'processing',
    'in-transit',
    'delivery-completed',
    'cancelled',
    'refunded',
  ];

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

  // Handle invalid status
  if (status && !supportedStatuses.includes(status)) {
    return (
      <div className="min-h-screen w-full bg-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-24 sm:mt-18 lg:mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
              Invalid Order Status
            </h2>

            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                The order status you are trying to access does not exist.
              </h3>
              <p className="text-gray-500 mb-4">
                Please select a valid order status below.
              </p>
              <nav className="mb-6">
                <ul className="flex flex-wrap justify-center gap-4">
                  {supportedStatuses.map((statusItem) => (
                    <li key={statusItem}>
                      <Link href={`/mypage/orders/${statusItem}`}>
                        <li className="px-4 py-2 rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                          {statusItem.replace('-', ' ').toUpperCase()}
                        </li>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-24 sm:mt-18 lg:mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
            Orders - {status?.toString().replace('-', ' ')}
          </h2>

          {/* Order Status Navigation */}
          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center gap-4">
              {supportedStatuses.map((statusItem) => (
                <li key={statusItem}>
                  <Link href={`/mypage/orders/${statusItem}`}>
                    <a
                      className={`px-4 py-2 rounded ${
                        status === statusItem
                          ? 'bg-[#e5aaa3] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      } transition-colors`}
                    >
                      {statusItem.replace('-', ' ').toUpperCase()}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Order Details Component */}
          {status && <OrderProcessing status={status as string} />}
        </div>
      </div>
    </div>
  );
};

export default OrdersByStatus;
