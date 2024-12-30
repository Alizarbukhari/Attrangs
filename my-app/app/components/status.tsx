// components/OrderProcessing.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrderProcessingProps {
  status: string;
}

interface Order {
  id: string;
  item: string;
  image: string;
  quantity: number;
  price: number;
  status: string;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    item: 'Red Dress',
    image: '/images/dress.webp',
    quantity: 1,
    price: 49.99,
    status: 'processing',
  },
  {
    id: '2',
    item: 'Blue Jeans',
    image: '/images/jeans.webp',
    quantity: 2,
    price: 39.99,
    status: 'in-transit',
  },
  // Add more mock orders as needed
];

const OrderProcessing: React.FC<OrderProcessingProps> = ({ status }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data based on status
    setLoading(true);
    const filteredOrders = mockOrders.filter(
      (order) => order.status === status
    );
    // Simulate network delay
    setTimeout(() => {
      setOrders(filteredOrders);
      setLoading(false);
    }, 1000);
  }, [status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e5aaa3]"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Orders in {status.replace('-', ' ').toUpperCase()}
        </h3>
        <p className="text-gray-500">
          There are no orders in {status.replace('-', ' ').toUpperCase()} status.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="flex items-center">
            <Image
              src={order.image}
              alt={order.item}
              width={64}
              height={64}
              className="rounded"
            />
            <div className="ml-4">
              <h4 className="text-lg font-semibold">{order.item}</h4>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ${order.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderProcessing;
