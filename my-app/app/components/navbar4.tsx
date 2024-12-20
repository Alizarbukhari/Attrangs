"use client";

import React, { useState, useEffect, useRef } from 'react';

import { Swiper as SwiperType } from 'swiper'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Navbar3 from './navbar3';
import Navbar1 from './navbar1';

export default function Navbar4() {
  const swiperRef = useRef<SwiperType | null>(null); // Swiper reference

  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 100) { // Scroll threshold (when to hide Navbar2 and show Navbar3)
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Navigate to next slide
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Navigate to previous slide
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        
        {/* Navbar2 Ko Include Karein (Visible until scrolled) */}
        <div className={`fixed z-20 ${isScrolled ? 'hidden' : 'block'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
              <Navbar1 />
              <Navbar3/>
            </div>
          </div>
        </div>

        {/* Navbar3 Ko Include Karein (Visible after scrolling) */}
        <div className={`fixed z-20 top-0 ${isScrolled ? 'block' : 'hidden'} transition-all duration-300 w-full`}>
          <div className="flex justify-center items-center w-full">
            <div className="w-full text-center">
              <Navbar3 />
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
// app/components/SignupForm.tsx
// SignupForm.tsx
// "use client";
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import Link from 'next/link';

// interface FormData {
//   firstName: string;
//   lastName: string;
//   userNameId: string;
//   password: string;
//   verifyPassword: string;
//   phonePrefix: string;
//   phone: string;
//   birthYear: string;
//   birthMonth: string;
//   birthDay: string;
//   receiveSms: boolean;
//   email: string;
//   receiveEmail: boolean;
//   referrerId: string;
// }

// interface FormErrors {
//   firstName: string;
//   lastName: string;
//   userNameId: string;
//   password: string;
//   verifyPassword: string;
//   phone: string;
//   birthYear: string;
//   birthMonth: string;
//   birthDay: string;
//   email: string;
// }

// interface SignupFormProps {
//   onComplete: (data: FormData) => void;
// }

// const SignupForm: React.FC<SignupFormProps> = ({ onComplete }) => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     userNameId: '',
//     password: '',
//     verifyPassword: '',
//     phonePrefix: '010',
//     phone: '',
//     birthYear: '',
//     birthMonth: '',
//     birthDay: '',
//     receiveSms: true,
//     email: '',
//     receiveEmail: true,
//     referrerId: '',
//   });

//   const [errors, setErrors] = useState<FormErrors>({
//     firstName: '',
//     lastName: '',
//     userNameId: '',
//     password: '',
//     verifyPassword: '',
//     phone: '',
//     birthYear: '',
//     birthMonth: '',
//     birthDay: '',
//     email: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [isChecking, setIsChecking] = useState<boolean>(false);
//   const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showVerifyPassword, setShowVerifyPassword] = useState<boolean>(false);
//   const [isPhoneAuthenticated, setIsPhoneAuthenticated] = useState<boolean>(false);

//   // Handle input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked } = e.target as HTMLInputElement;

//     let fieldValue: string | boolean = value;
//     if (type === 'checkbox') {
//       fieldValue = checked;
//     } else if (type === 'radio') {
//       fieldValue = value === 'true';
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: fieldValue,
//     }));

//     // Reset availability status when user modifies the ID
//     if (name === 'userNameId') {
//       setIsAvailable(null);
//       setErrors((prev) => ({
//         ...prev,
//         userNameId: '',
//       }));
//     }

//     // Reset isSubmitted if user starts editing after submission
//     if (isSubmitted) {
//       setIsSubmitted(false);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitted(true); // Mark form as submitted

//     const isValid = await validateForm();
//     if (isValid) {
//       // Instead of submitting to backend, pass data to parent
//       onComplete(formData); // Move to Step 3 with form data
//       toast.success('Form is valid! Moving to confirmation.', {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   // Validate the entire form
//   const validateForm = async (): Promise<boolean> => {
//     const newErrors: FormErrors = { ...errors };

//     // Validate required fields
//     newErrors.firstName = formData.firstName.trim() ? '' : 'First Name is required';
//     newErrors.lastName = formData.lastName.trim() ? '' : 'Last Name is required';
//     newErrors.userNameId = formData.userNameId.trim() ? '' : 'ID is required';
//     newErrors.password = validatePassword(formData.password).join(', ');
//     newErrors.verifyPassword = formData.verifyPassword === formData.password ? '' : 'Passwords do not match';
//     newErrors.phone = formData.phone.trim() ? '' : 'Phone number is required';
//     newErrors.email = validateEmail(formData.email) ? '' : 'Invalid email format';
//     if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
//       newErrors.birthYear = 'Complete birth date is required';
//       newErrors.birthMonth = 'Complete birth date is required';
//       newErrors.birthDay = 'Complete birth date is required';
//     } else {
//       newErrors.birthYear = '';
//       newErrors.birthMonth = '';
//       newErrors.birthDay = '';
//     }

//     setErrors(newErrors);

//     // Collect error messages
//     const errorMessages = Object.values(newErrors).filter((msg) => msg !== '');

//     // Additional checks
//     if (isAvailable === false) {
//       errorMessages.push('ID is already taken');
//     }

//     if (!isPhoneAuthenticated) {
//       errorMessages.push('Phone authentication is required');
//     }

//     // Show toast if there are errors
//     if (errorMessages.length > 0) {
//       toast.error(
//         <div>
//           <ul>
//             {errorMessages.map((msg, idx) => (
//               <li key={idx}>{msg}</li>
//             ))}
//           </ul>
//         </div>,
//         {
//           position: "top-right",
//           autoClose: 5000,
//         }
//       );
//       return false;
//     }

//     return true;
//   };

//   // Validate individual fields if needed (optional)
//   const validatePassword = (password: string): string[] => {
//     const errors: string[] = [];
//     if (password.length < 8) {
//       errors.push('at least 8 characters');
//     }
//     if (!/[A-Z]/.test(password)) {
//       errors.push('one uppercase letter');
//     }
//     if (!/[a-z]/.test(password)) {
//       errors.push('one lowercase letter');
//     }
//     if (!/[0-9]/.test(password)) {
//       errors.push('one number');
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       errors.push('one special character');
//     }
//     return errors;
//   };

//   const validateEmail = (email: string): boolean => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   // Simulated API call to check availability
//   const checkAvailability = async () => {
//     if (formData.userNameId.trim() === '') {
//       setErrors((prev) => ({
//         ...prev,
//         userNameId: 'Please enter an ID to check',
//       }));
//       toast.error('Please enter an ID to check availability.', {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return;
//     }

//     setIsChecking(true);
//     setErrors((prev) => ({
//       ...prev,
//       userNameId: '',
//     }));

//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     // Simulate availability logic
//     if (formData.userNameId.toLowerCase() === 'existinguser') {
//       setIsAvailable(false);
//       setErrors((prev) => ({
//         ...prev,
//         userNameId: 'ID already taken.',
//       }));
//       toast.error('ID is already taken.', {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     } else {
//       setIsAvailable(true);
//       setErrors((prev) => ({
//         ...prev,
//         userNameId: '',
//       }));
//       toast.success('ID is available!', {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }

//     setIsChecking(false);
//   };

//   // Handler for Phone Authentication Button
//   const handlePhoneAuthentication = () => {
//     if (!formData.phone.trim()) {
//       toast.error('Please enter your phone number before authentication.', {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return;
//     }
//     // Implement your phone authentication logic here
//     // For demonstration, we'll simulate successful authentication after delay
//     setIsChecking(true);
//     toast.info('Phone authentication started...', {
//       position: "top-right",
//       autoClose: 2000,
//     });

//     setTimeout(() => {
//       setIsPhoneAuthenticated(true);
//       setIsChecking(false);
//       toast.success('Phone authenticated successfully!', {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }, 2000);
//   };

//   // Function to reset the form after successful submission
//   const resetForm = () => {
//     setFormData({
//       firstName: '',
//       lastName: '',
//       userNameId: '',
//       password: '',
//       verifyPassword: '',
//       phonePrefix: '010',
//       phone: '',
//       birthYear: '',
//       birthMonth: '',
//       birthDay: '',
//       receiveSms: true,
//       email: '',
//       receiveEmail: true,
//       referrerId: '',
//     });
//     setErrors({
//       firstName: '',
//       lastName: '',
//       userNameId: '',
//       password: '',
//       verifyPassword: '',
//       phone: '',
//       birthYear: '',
//       birthMonth: '',
//       birthDay: '',
//       email: '',
//     });
//     setIsAvailable(null);
//     setShowPassword(false);
//     setShowVerifyPassword(false);
//     setIsPhoneAuthenticated(false);
//     setIsSubmitted(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Main Container */}
//       <div className="w-full max-w-xl mx-auto p-4 border border-[#dbdbdb] rounded-lg flex flex-col space-y-6">
//         {/* First Name */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             First Name<span className="text-red-500">*</span>
//           </label>
//           <input
//             className={`w-full md:w-2/3 p-2 border-b-2 ${
//               isSubmitted && errors.firstName ? 'border-red-500' : 'border-gray-300'
//             } text-sm outline-none`}
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             placeholder="Enter your First Name"
//           />
//         </div>
//         {isSubmitted && errors.firstName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName}</p>}

//         {/* Last Name */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Last Name<span className="text-red-500">*</span>
//           </label>
//           <input
//             className={`w-full md:w-2/3 p-2 border-b-2 ${
//               isSubmitted && errors.lastName ? 'border-red-500' : 'border-gray-300'
//             } text-sm outline-none`}
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             placeholder="Enter your Last Name"
//           />
//         </div>
//         {isSubmitted && errors.lastName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.lastName}</p>}

//         {/* User Name ID with Check Availability Button */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             ID<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <input
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.userNameId ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               type="text"
//               name="userNameId"
//               value={formData.userNameId}
//               onChange={handleChange}
//               placeholder="Enter your ID"
//             />
//             <button
//               type="button"
//               className={`py-2 px-4 rounded text-sm ${
//                 isAvailable
//                   ? 'bg-red-500 text-white hover:bg-red-600'
//                   : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
//               } ${
//                 isChecking || formData.userNameId.trim() === '' || isAvailable
//                   ? 'cursor-not-allowed opacity-50'
//                   : 'cursor-pointer'
//               }`}
//               onClick={checkAvailability}
//               disabled={isChecking || formData.userNameId.trim() === '' || isAvailable === true}
//             >
//               {isChecking
//                 ? 'Checking...'
//                 : isAvailable
//                   ? 'ID Available'
//                   : 'Check Availability'}
//             </button>
//           </div>
//         </div>
//         {isSubmitted && errors.userNameId && <p className="text-red-500 text-sm mt-1 ml-1">{errors.userNameId}</p>}

//         {/* Password */}
//         <div className="flex flex-col md:flex-row items-center relative">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Password<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 relative">
//             <input
//               className={`w-full p-2 border-b-2 ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your Password"
//             />
//             <button
//               type="button"
//               className="absolute right-0 top-0 mt-2 mr-2 text-sm text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//         </div>
//         {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
//         {/* Password Criteria */}
//         <ul className="ml-1 text-xs">
//           <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
//             {formData.password.length >= 8 ? '✔️' : '❌'} At least 8 characters
//           </li>
//           <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
//             {/[A-Z]/.test(formData.password) ? '✔️' : '❌'} One uppercase letter
//           </li>
//           <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
//             {/[a-z]/.test(formData.password) ? '✔️' : '❌'} One lowercase letter
//           </li>
//           <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
//             {/[0-9]/.test(formData.password) ? '✔️' : '❌'} One number
//           </li>
//           <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
//             {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✔️' : '❌'} One special character (!@#$%^&*)
//           </li>
//         </ul>

//         {/* Verify Password */}
//         <div className="flex flex-col md:flex-row items-center relative">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Verify Password<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 relative">
//             <input
//               className={`w-full p-2 border-b-2 ${
//                 errors.verifyPassword ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               type={showVerifyPassword ? "text" : "password"}
//               name="verifyPassword"
//               value={formData.verifyPassword}
//               onChange={handleChange}
//               placeholder="Re-enter your Password"
//             />
//             <button
//               type="button"
//               className="absolute right-0 top-0 mt-2 mr-2 text-sm text-gray-500"
//               onClick={() => setShowVerifyPassword(!showVerifyPassword)}
//             >
//               {showVerifyPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//         </div>
//         {errors.verifyPassword && <p className="text-red-500 text-sm mt-1 ml-1">{errors.verifyPassword}</p>}

//         {/* Phone Number */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Phone Number<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <select
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.phone ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               name="phonePrefix"
//               value={formData.phonePrefix}
//               onChange={handleChange}
//             >
//               <option className="text-gray-700" value="010">010</option>
//               <option className="text-gray-700" value="011">011</option>
//               <option className="text-gray-700" value="016">016</option>
//               <option className="text-gray-700" value="017">017</option>
//             </select>
//             <input
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.phone ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               type="number"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//             />
//             <button
//               type="button"
//               className={`flex-1 py-2 px-4 rounded text-sm text-white ${
//                 isChecking || isPhoneAuthenticated
//                   ? 'bg-blue-300 cursor-not-allowed opacity-50'
//                   : 'bg-blue-500 hover:bg-blue-600'
//               }`}
//               onClick={handlePhoneAuthentication}
//               disabled={isChecking || isPhoneAuthenticated}
//             >
//               {isChecking
//                 ? 'Authenticating...'
//                 : isPhoneAuthenticated
//                   ? 'Authenticated'
//                   : 'Phone Authentication'}
//             </button>
//           </div>
//         </div>
//         {isSubmitted && errors.phone && <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>}
//         {isSubmitted && isPhoneAuthenticated && <p className="text-green-500 text-sm mt-1 ml-1">Phone authenticated successfully.</p>}

//         {/* Birth Date */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Birth Date<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <select
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.birthYear ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               name="birthYear"
//               value={formData.birthYear}
//               onChange={handleChange}
//             >
//               <option value="">Year</option>
//               {[...Array(100).keys()].map((i) => (
//                 <option key={i} value={2024 - i}>{2024 - i}</option>
//               ))}
//             </select>

//             <select
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.birthMonth ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               name="birthMonth"
//               value={formData.birthMonth}
//               onChange={handleChange}
//             >
//               <option value="">Month</option>
//               {[...Array(12).keys()].map((i) => (
//                 <option key={i} value={i + 1}>{i + 1}</option>
//               ))}
//             </select>

//             <select
//               className={`flex-1 p-2 border-b-2 ${
//                 isSubmitted && errors.birthDay ? 'border-red-500' : 'border-gray-300'
//               } text-sm outline-none`}
//               name="birthDay"
//               value={formData.birthDay}
//               onChange={handleChange}
//             >
//               <option value="">Day</option>
//               {[...Array(31).keys()].map((i) => (
//                 <option key={i} value={i + 1}>{i + 1}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {/* Display individual errors for birth date components */}
//         {isSubmitted && (errors.birthYear || errors.birthMonth || errors.birthDay) && (
//           <div className="ml-1 text-red-500 text-sm">
//             {errors.birthYear && <p>{errors.birthYear}</p>}
//             {errors.birthMonth && <p>{errors.birthMonth}</p>}
//             {errors.birthDay && <p>{errors.birthDay}</p>}
//           </div>
//         )}

//         {/* SMS Preferences */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Receive SMS<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 flex items-center space-x-4">
//             <label className="flex items-center space-x-1">
//               <input
//                 type="radio"
//                 name="receiveSms"
//                 value="true"
//                 checked={formData.receiveSms === true}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="text-sm">Yes</span>
//             </label>
//             <label className="flex items-center space-x-1">
//               <input
//                 type="radio"
//                 name="receiveSms"
//                 value="false"
//                 checked={formData.receiveSms === false}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="text-sm">No</span>
//             </label>
//           </div>
//         </div>

//         {/* Email */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Email<span className="text-red-500">*</span>
//           </label>
//           <input
//             className={`w-full md:w-2/3 p-2 border-b-2 ${
//               isSubmitted && errors.email ? 'border-red-500' : 'border-gray-300'
//             } text-sm outline-none`}
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your Email"
//           />
//         </div>
//         {isSubmitted && errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}

//         {/* Email Preferences */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Receive Emails<span className="text-red-500">*</span>
//           </label>
//           <div className="w-full md:w-2/3 flex items-center space-x-4">
//             <label className="flex items-center space-x-1">
//               <input
//                 type="radio"
//                 name="receiveEmail"
//                 value="true"
//                 checked={formData.receiveEmail === true}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="text-sm">Yes</span>
//             </label>
//             <label className="flex items-center space-x-1">
//               <input
//                 type="radio"
//                 name="receiveEmail"
//                 value="false"
//                 checked={formData.receiveEmail === false}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span className="text-sm">No</span>
//             </label>
//           </div>
//         </div>

//         {/* Referrer ID */}
//         <div className="flex flex-col md:flex-row items-center">
//           <label className="w-full md:w-1/3 text-gray-700 text-sm">
//             Referrer ID
//           </label>
//           <input
//             className="w-full md:w-2/3 p-2 border-b-2 border-gray-300 text-sm outline-none"
//             type="text"
//             name="referrerId"
//             value={formData.referrerId}
//             onChange={handleChange}
//             placeholder="Optional"
//           />
//         </div>

//         {/* Submit and Cancel Buttons */}
//         <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
//           <button
//             type="submit"
//             className="w-full md:w-auto bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="w-full md:w-auto bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400 transition duration-300"
//             onClick={resetForm}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SignupForm;
