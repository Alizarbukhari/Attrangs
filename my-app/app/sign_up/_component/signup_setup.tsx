// Signup_Setup.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Signup_Term from './signup_term';
import SignupForm from "../_component/sighn-up-form";
import ConfirmRegistration from '../_component/registerd';
import {FormData} from '@/app/types/signupTypes';

const Signup_Setup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleAgree = () => {
    setCurrentStep(2);
  };

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentStep(3);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className=" mt-32 w-full flex flex-col flex-wrap">
      {/* Logo Section */}
      <div className="flex justify-center items-center mt-10">
        <Link href="/">
          <button>
            <Image src="/kakao-pc.jpg" alt="kakao-pc" width={978} height={70} />
          </button>
        </Link>
      </div>

      {/* Title */}
      <div className="mt-10 text-center">
        <h2 className="text-[#282828] text-[24px] font-normal">회원가입</h2>
      </div>

      {/* Steps Indicator */}
      <div className="flex justify-center items-center flex-col md:flex-row gap-4  md:gap-8 text-[15px] mt-10">
        {/* Step 1: Agree to Terms of Use */}
        <div
          onClick={() => handleStepClick(1)}
          className={`flex flex-col justify-center items-center gap-2 py-[48px] px-[40px] bg-center cursor-pointer ${
            currentStep >= 1 ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <Image src="/join1.png" alt="join1" width={35} height={40} />
          <p
            className={`${
              currentStep === 1 ? 'font-bold text-[#333]' : 'font-normal text-[#888]'
            }`}
          >
            01 이용약관 동의
          </p>
        </div>

        {/* Step 2: Enter Member Information */}
        <div
          onClick={() => handleStepClick(2)}
          className={`flex flex-col justify-center items-center gap-2 py-[48px] px-[40px] bg-center cursor-pointer ${
            currentStep >= 2 ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <Image src="/join2.png" alt="join2" width={35} height={40} />
          <p
            className={`${
              currentStep === 2 ? 'font-bold text-[#333]' : 'font-normal text-[#888]'
            }`}
          >
            02 회원정보 입력
          </p>
        </div>

        {/* Step 3: Complete Membership Registration */}
        <div
          onClick={() => handleStepClick(3)}
          className={`flex flex-col justify-center items-center gap-2 py-[48px] px-[40px] bg-center cursor-pointer ${
            currentStep >= 3 ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <Image src="/join3.png" alt="join3" width={35} height={40} />
          <p
            className={`${
              currentStep === 3 ? 'font-bold text-[#333]' : 'font-normal text-[#888]'
            }`}
          >
              03 가입완료
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-8 max-w-5xl mx-auto px-4">
        {currentStep === 1 && <Signup_Term onAgree={handleAgree} />}
        {currentStep === 2 && <SignupForm onComplete={handleFormComplete} />}
        {currentStep === 3 && formData && <ConfirmRegistration formData={formData} />}
      </div>
    </div>
  );
};

export default Signup_Setup;
