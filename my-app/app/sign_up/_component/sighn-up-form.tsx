// SignupForm.tsx
"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {FormData ,FormErrors} from '@/app/types/signuptypes';


interface SignupFormProps {
  onComplete: (data: FormData) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    userNameId: '',
    password: '',
    verifyPassword: '',
    phonePrefix: '010',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    receiveSms: true,
    email: '',
    receiveEmail: true,
    referrerId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    userNameId: '',
    password: '',
    verifyPassword: '',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    email: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState<boolean>(false);
  const [isPhoneAuthenticated, setIsPhoneAuthenticated] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    let fieldValue: string | boolean = value;
    if (type === 'checkbox') {
      fieldValue = checked;
    } else if (type === 'radio') {
      fieldValue = value === 'true';
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Reset availability status when user modifies the ID
    if (name === 'userNameId') {
      setIsAvailable(null);
      setErrors((prev) => ({
        ...prev,
        userNameId: '',
      }));
    }

    // Reset isSubmitted if user starts editing after submission
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark form as submitted

    const isValid = await validateForm();
    if (isValid) {
      // Instead of submitting to backend, pass data to parent
      onComplete(formData); // Move to Step 3 with form data
      toast.success('Form is valid! Moving to confirmation.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Validate the entire form
  const validateForm = async (): Promise<boolean> => {
    const newErrors: FormErrors = { ...errors };

    // Validate required fields
    newErrors.firstName = formData.firstName.trim() ? '' : 'First Name is required';
    newErrors.lastName = formData.lastName.trim() ? '' : 'Last Name is required';
    newErrors.userNameId = formData.userNameId.trim() ? '' : 'ID is required';
    newErrors.password = validatePassword(formData.password).join(', ');
    newErrors.verifyPassword = formData.verifyPassword === formData.password ? '' : 'Passwords do not match';
    newErrors.phone = formData.phone.trim() ? '' : 'Phone number is required';
    newErrors.email = validateEmail(formData.email) ? '' : 'Invalid email format';
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      newErrors.birthYear = 'Complete birth date is required';
      newErrors.birthMonth = 'Complete birth date is required';
      newErrors.birthDay = 'Complete birth date is required';
    } else {
      newErrors.birthYear = '';
      newErrors.birthMonth = '';
      newErrors.birthDay = '';
    }

    setErrors(newErrors);

    // Collect error messages
    const errorMessages = Object.values(newErrors).filter((msg) => msg !== '');

    // Additional checks
    if (isAvailable === false) {
      errorMessages.push('ID is already taken');
    }

    if (!isPhoneAuthenticated) {
      errorMessages.push('Phone authentication is required');
    }

    // Show toast if there are errors
    if (errorMessages.length > 0) {
      toast.error(
        <div>
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      return false;
    }

    return true;
  };

  // Validate individual fields if needed (optional)
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('one special character');
    }
    return errors;
  };

  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Simulated API call to check availability
  const checkAvailability = async () => {
    if (formData.userNameId.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        userNameId: 'Please enter an ID to check',
      }));
      toast.error('Please enter an ID to check availability.', {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsChecking(true);
    setErrors((prev) => ({
      ...prev,
      userNameId: '',
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate availability logic
    if (formData.userNameId.toLowerCase() === 'existinguser') {
      setIsAvailable(false);
      setErrors((prev) => ({
        ...prev,
        userNameId: 'ID already taken.',
      }));
      toast.error('ID is already taken.', {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      setIsAvailable(true);
      setErrors((prev) => ({
        ...prev,
        userNameId: '',
      }));
      toast.success('ID is available!', {
        position: "top-right",
        autoClose: 5000,
      });
    }

    setIsChecking(false);
  };

  // Handler for Phone Authentication Button
  const handlePhoneAuthentication = () => {
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number before authentication.', {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    // Implement your phone authentication logic here
    // For demonstration, we'll simulate successful authentication after delay
    setIsChecking(true);
    toast.info('Phone authentication started...', {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setIsPhoneAuthenticated(true);
      setIsChecking(false);
      toast.success('Phone authenticated successfully!', {
        position: "top-right",
        autoClose: 5000,
      });
    }, 2000);
  };

  // Function to reset the form after successful submission
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      userNameId: '',
      password: '',
      verifyPassword: '',
      phonePrefix: '010',
      phone: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      receiveSms: true,
      email: '',
      receiveEmail: true,
      referrerId: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      userNameId: '',
      password: '',
      verifyPassword: '',
      phone: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      email: '',
    });
    setIsAvailable(null);
    setShowPassword(false);
    setShowVerifyPassword(false);
    setIsPhoneAuthenticated(false);
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[930px] h-auto p-[25px] flex flex-col flex-wrap border border-[#dbdbdb] ">
        {/* First Name */}
        <div className="w-[80%] mx-auto mb-[23px]">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            First Name<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className={`inline-block h-[35px] w-[330px] p-0 border-0 border-b-[1px] ${
              isSubmitted && errors.firstName ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
            } text-[14px] leading-[35px] align-middle outline-none`}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your First Name"
          />
          {isSubmitted && errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="w-[80%] mx-auto mb-[23px]">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Last Name<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className={`inline-block h-[35px] w-[330px] p-0 border-0 border-b-[1px] ${
              isSubmitted && errors.lastName ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
            } text-[14px] leading-[35px] align-middle outline-none`}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your Last Name"
          />
          {isSubmitted && errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>

        {/* User Name ID with Check Availability Button */}
        <div className="w-[80%] mx-auto mb-[23px] flex items-center">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            ID<span className="text-[#cf591f]">*</span>
          </label>
          {/* Flex Container for Input and Button */}
          <div className="flex items-center">
            <input
              className={`h-[35px] w-[330px] p-0 border-0 border-b-[1px] ${
                isSubmitted && errors.userNameId ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] outline-none`}
              type="text"
              name="userNameId"
              value={formData.userNameId}
              onChange={handleChange}
              placeholder="Enter your ID"
            />
            <button
              type="button"
              className={`border-[#dbdbdb] border-[1px] text-sm ml-4 py-2 px-4 rounded ${
                isAvailable
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-black hover:bg-gray-50'
              } ${
                isChecking || formData.userNameId.trim() === '' || isAvailable
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
              onClick={checkAvailability}
              disabled={isChecking || formData.userNameId.trim() === '' || isAvailable === true}
            >
              {isChecking
                ? 'Checking...'
                : isAvailable
                  ? 'ID Available'
                  : 'Check Availability'}
            </button>
          </div>
          {isSubmitted && errors.userNameId && <p className="text-red-500 text-xs">{errors.userNameId}</p>}
        </div>

        {/* Password */}
        <div className="w-[80%] mx-auto mb-[23px] relative">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Password<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className={`inline-block h-[35px] w-[330px] p-0 pr-10 border-0 border-b-[1px] ${
              errors.password ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
            } text-[14px] leading-[35px] align-middle outline-none`}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
          />
          <button
            type="button"
            className="absolute right-0 top-0 mt-2 mr-24 text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          {/* Password Criteria */}
          <ul className="mt-2 text-xs">
            <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
              {formData.password.length >= 8 ? '✔️' : '❌'} At least 8 characters
            </li>
            <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
              {/[A-Z]/.test(formData.password) ? '✔️' : '❌'} One uppercase letter
            </li>
            <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
              {/[a-z]/.test(formData.password) ? '✔️' : '❌'} One lowercase letter
            </li>
            <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
              {/[0-9]/.test(formData.password) ? '✔️' : '❌'} One number
            </li>
            <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}`}>
              {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '✔️' : '❌'} One special character (!@#$%^&*)
            </li>
          </ul>
        </div>

        {/* Verify Password */}
        <div className="w-[80%] mx-auto mb-[23px] relative">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Verify Password<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className={`inline-block h-[35px] w-[330px] p-0 pr-20 border-0 border-b-[1px] ${
              errors.verifyPassword ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
            } text-[14px] leading-[35px] align-middle outline-none`}
            type={showVerifyPassword ? "text" : "password"}
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            placeholder="Re-enter your Password"
          />
          <button
            type="button"
            className="absolute right-0 top-0 mt-2 mr-24 text-sm text-gray-500"
            onClick={() => setShowVerifyPassword(!showVerifyPassword)}
          >
            {showVerifyPassword ? 'Hide' : 'Show'}
          </button>
          {errors.verifyPassword && <p className="text-red-500 text-xs">{errors.verifyPassword}</p>}
        </div>

        {/* Phone Number */}
        <div className="w-[80%] mx-auto flex items-center mb-[23px]">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Phone Number<span className="text-[#cf591f]">*</span>
          </label>
          {/* Flex Container for Prefix, Phone Input, and Authentication Button */}
          <div className="flex items-center justify-center space-x-4">
            <select
              className={`h-[35px] text-[#888888] p-0 border-0 border-b-[1px] ${
                isSubmitted && errors.phone ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] outline-none`}
              name="phonePrefix"
              value={formData.phonePrefix}
              onChange={handleChange}
            >
              <option className="text-[#888]" value="010">010</option>
              <option className="text-[#888]" value="011">011</option>
              <option className="text-[#888]" value="016">016</option>
              <option className="text-[#888]" value="017">017</option>
            </select>
            <input
              className={`h-[35px] w-[220px] p-0 border-0 border-b-[1px] ${
                isSubmitted && errors.phone ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] outline-none`}
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <button
              type="button"
              className={`bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 ${
                isChecking || isPhoneAuthenticated
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
              onClick={handlePhoneAuthentication}
              disabled={isChecking || isPhoneAuthenticated}
            >
              {isChecking
                ? 'Authenticating...'
                : isPhoneAuthenticated
                  ? 'Authenticated'
                  : 'Phone Authentication'}
            </button>
          </div>
          {isSubmitted && errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          {isSubmitted && isPhoneAuthenticated && <p className="text-green-500 text-xs">Phone authenticated successfully.</p>}
        </div>

        {/* Birth Date */}
        <div className="w-[80%] mx-auto flex items-center mb-[23px] ">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Birth Date<span className="text-[#cf591f]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <select
              className={`inline-block h-[35px] text-[#888888] mx-4 px-4 border-0 border-b-[1px] ${
                isSubmitted && errors.birthYear ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] align-middle outline-none`}
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
            >
              <option value="">Year</option>
              {/* Add year options */}
              {[...Array(100).keys()].map((i) => (
                <option key={i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>

            <select
              className={`inline-block h-[35px] text-[#888888] mx-4 px-4 border-0 border-b-[1px] ${
                isSubmitted && errors.birthMonth ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] align-middle outline-none`}
              name="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
            >
              <option value="">Month</option>
              {[...Array(12).keys()].map((i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className={`inline-block h-[35px] text-[#888888] mx-4 px-4 border-0 border-b-[1px] ${
                isSubmitted && errors.birthDay ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
              } text-[14px] leading-[35px] align-middle outline-none`}
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          {/* Display individual errors for birth date components */}
          {isSubmitted && errors.birthYear && <p className="text-red-500 text-xs">{errors.birthYear}</p>}
          {isSubmitted && errors.birthMonth && <p className="text-red-500 text-xs">{errors.birthMonth}</p>}
          {isSubmitted && errors.birthDay && <p className="text-red-500 text-xs">{errors.birthDay}</p>}
        </div>

        {/* SMS Preferences */}
        <div className="w-[80%] mx-auto mb-[23px] text-sm flex items-center gap-2">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Whether to receive SMS<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className="inline-block p-2 outline-none"
            type="radio"
            name="receiveSms"
            value="true"
            checked={formData.receiveSms === true}
            onChange={handleChange}
          />
          <label className="text-[#888888]">Yes</label>
          <input
            className="inline-block p-2 outline-none"
            type="radio"
            name="receiveSms"
            value="false"
            checked={formData.receiveSms === false}
            onChange={handleChange}
          />
          <label className="text-[#888888]">No</label>
        </div>

        {/* Email */}
        <div className="w-[80%] mx-auto mb-[23px]">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Email<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className={`inline-block h-[35px] w-[330px] p-0 border-0 border-b-[1px] ${
              isSubmitted && errors.email ? 'border-b-red-500' : 'border-b-[#dbdbdb]'
            } text-[14px] leading-[35px] align-middle outline-none`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          {isSubmitted && errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Email Preferences */}
        <div className="w-[80%] mx-auto mb-[23px] text-sm flex items-center gap-2">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Whether to receive emails<span className="text-[#cf591f]">*</span>
          </label>
          <input
            className="inline-block p-2 outline-none"
            type="radio"
            name="receiveEmail"
            value="true"
            checked={formData.receiveEmail === true}
            onChange={handleChange}
          />
          <label className="text-[#888888]">Yes</label>
          <input
            className="inline-block p-2 outline-none"
            type="radio"
            name="receiveEmail"
            value="false"
            checked={formData.receiveEmail === false}
            onChange={handleChange}
          />
          <label className="text-[#888888]">No</label>
        </div>

        {/* Referrer ID */}
        <div className="w-[80%] mx-auto mb-[23px]">
          <label className="inline-block w-[184px] text-[#888888] text-sm align-middle">
            Referrer ID
          </label>
          <input
            className="inline-block h-[35px] w-[330px] p-0 border-0 border-b-[1px] border-b-[#dbdbdb] text-[14px] leading-[35px] align-middle outline-none"
            type="text"
            name="referrerId"
            value={formData.referrerId}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>
      </div>
      
      {/* Submit and Cancel Buttons */}
      <div className="my-10 flex justify-center">
        <button
          type="submit"
          className={`block mx-2 text-[15px] bg-black text-white py-3 px-14 rounded`}
        >
          Save
        </button>
        <button
          type="button"
          className="block mx-2 text-[15px] bg-gray-300 text-black py-3 px-14 rounded"
          onClick={resetForm}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
