"use client" // Ensure this directive is at the top

import { useState } from "react"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Eye, EyeOff } from 'lucide-react'


import Image from "next/image"
import { loginType } from "@/app/types/logintype"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("") // Email state
  const [password, setPassword] = useState("") // Password state (optional)

  const handleSubmit = (e:loginType) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Email:", email)
    console.log("Password:", password)
    // Add your authentication logic or API calls here
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Login Form */}
      <div className="w-[540px] mx-auto mt-20 px-4">
        <h1 className="text-[#282828] text-center font-light text-2xl md:text-[30px]">LOGIN</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mt-12">
            <Input
              type="email"
              placeholder="Email"
              value={email} // Bind email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="w-full h-[50px] text-gray-800 text-[16px] rounded-[10px] border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#e5aaa3]"
              required // Optional: Make the field required
            />
          </div>
          <div className="relative ">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password} // Bind password state (optional)
              onChange={(e) => setPassword(e.target.value)} // Update password state on change (optional)
              className="w-full h-[50px] text-gray-800 text-[16px] rounded-[10px] border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#e5aaa3]"
              required // Optional: Make the field required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
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
          <Button
            type="submit" // Make the button submit the form
            className="w-full h-[50px] bg-[#e5aaa3] border border-[#e5aaa3] text-white text-[16px] rounded-[10px] hover:bg-[#d89993] transition duration-300"
          >
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
          <button className="inline-flex items-center justify-center p-2 hover:bg-gray-50 rounded">
            <Image src="/images/google.webp" height={50} width={45} alt="Google Login" className="w-[50px] h-[50px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
