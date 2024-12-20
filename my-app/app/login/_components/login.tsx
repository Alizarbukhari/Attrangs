"use client"  // Ensure this directive is at the top

import { useState } from "react"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Eye, EyeOff } from 'lucide-react'

import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex bg-white">
      {/* Login Form */}
      <div className="w-[540px] mx-auto mt-20 px-4">
        <h1 className="text-[#282828] text-center font-light text-2xl md:text-[30px]">LOGIN</h1>
        <form className="space-y-6">
          <div className="mt-12">
            <Input
              type="email"
              placeholder="Email"
              className="w-full cursor-pointer h-[50px] leading-[50px]  text-white text-[16px] rounded-[10px] relative"
            />
          </div>
          <div className="relative ">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full cursor-pointer h-[50px] leading-[50px]  text-white text-[16px] rounded-[10px] relative"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center">
            <Checkbox id="remember" className="border-gray-600" />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
              Remember Me
            </label>
          </div>
          <Button className="w-full cursor-pointer h-[50px] leading-[50px] bg-[#e5aaa3] border border-[#e5aaa3] text-white text-[16px] rounded-[10px] relative hover:bg-[#d89993]">
            Login
          </Button>
        </form>

        <div className="text-[#8f8f8f] text-[12px] flex justify-around my-4">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password
          </Link>
          <span>|</span>
          <Link href="/sign_up" className="hover:underline">
            User Signup
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-gray-800 mb-4">Log in with another account</p>
          <button className="inline-flex items-center justify-center p-2 hover:bg-gray-50">
            <Image src ={"/images/google.webp"} height={50} width={45} alt="image" className="w-[50px] h-[50px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
