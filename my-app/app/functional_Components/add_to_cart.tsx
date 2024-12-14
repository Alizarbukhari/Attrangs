import React from 'react';

interface AddToCartProps {
  showCart: boolean;
  onClose: () => void;
}

const Add_to_cart: React.FC<AddToCartProps> = ({ showCart, onClose }) => {
  if (!showCart) return null; // Don't render if `showCart` is false

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Item Added to Cart</h3>
        <p className="text-sm text-gray-600">Your item has been added to the shopping cart successfully.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add_to_cart;
