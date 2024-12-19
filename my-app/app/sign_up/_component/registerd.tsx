// confirm-registration.tsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface FormData {
  firstName: string;
  lastName: string;
  userNameId: string;
  password: string;
  verifyPassword: string;
  phonePrefix: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  receiveSms: boolean;
  email: string;
  receiveEmail: boolean;
  referrerId: string;
}

interface ConfirmRegistrationProps {
  formData: FormData;
}

const ConfirmRegistration: React.FC<ConfirmRegistrationProps> = ({ formData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual backend URL when ready
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // Mock API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration confirmed:', data);
        toast.success('Registration confirmed successfully!', {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSuccess(true); // Show success message
      } else {
        throw new Error('Failed to confirm registration');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while confirming registration.', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-[90%] h-[300px] flex flex-col items-center justify-center mx-auto p-[25px] border border-[#dbdbdb] overflow-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
        <p className="text-lg text-gray-700">Thank you for registering. You can now log in with your credentials.</p>
        <button
          className="mt-6 bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          onClick={() => window.location.href = '/login'} // Redirect to home or any other existing page
        >
          Go to login
        </button>
      </div>
    );
  }

  return (
    <div className="w-[90%] h-[300px] flex items-center justify-center mx-auto p-[25px] border border-[#dbdbdb] overflow-auto">
      <div className="my-10 flex justify-center">
        <button
          className={`block mx-2 text-[15px] bg-black text-white cursor-pointer py-3 px-14 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Confirming...' : 'Confirm Registration'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
