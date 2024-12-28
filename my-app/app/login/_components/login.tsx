"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Input } from "../ui/input"; // Adjust paths
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/Aouthcontext'; // Correct path
import { setCookie } from 'cookies-next'; // Install cookies-next package first

interface LoginResponse {
  access_token: string;
  token_type: string;
  firstName: string;
  lastName: string;
}

interface ErrorResponse {
  detail?: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter(); // Initialize router for navigation
  const { login } = useContext(AuthContext); // Access login function and loading state from context

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Use environment variable

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Debug: Log form data being sent
    console.log('Sending login request with:', {
      username: email,
      password: password?.length > 0 ? 'password-provided' : 'no-password'
    });

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      // Debug: Log the API URL
      console.log('Making request to:', `${API_URL}/login`);

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      // Debug: Log raw response
      console.log('Raw response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        // Debug: Log successful response data
        console.log('Login response data:', {
          hasToken: !!data.access_token,
          firstName: data.firstName,
          lastName: data.lastName
        });

        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 5000,
        });

        // Store token and user details in AuthContext
        if (data.access_token && data.firstName && data.lastName) {
          login({ 
            username: email, // Or replace with actual username if available
            firstName: data.firstName,
            lastName: data.lastName,
            token: data.access_token 
          });
          console.log("Login function called with:", { 
            username: email, 
            firstName: data.firstName,
            lastName: data.lastName,
            token: data.access_token 
          });
        }

        // Set cookies with token and user info
        setCookie('auth_token', data.access_token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        setCookie('user_info', JSON.stringify({
          email,
          firstName: data.firstName,
          lastName: data.lastName
        }));

        // Redirect to MyPage
        router.push('/mypage'); // Change '/mypage' to your desired route
      } else {
        // Debug: Log error response
        const rawErrorText = await response.text();
        console.log('Error response raw text:', rawErrorText);
        
        let errorData: ErrorResponse;
        try {
          errorData = JSON.parse(rawErrorText);
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          errorData = { detail: 'Failed to login.' };
        }
        
        console.error('Login failed with error:', errorData);
        toast.error(errorData.detail || 'Failed to login.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      // Debug: Log network or other errors
      console.error('Network or other error:', error);
      toast.error('An unexpected error occurred.', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="flex bg-white justify-center items-center min-h-screen">
      {/* Login Form */}
      <div className="max-w-md w-full mx-auto px-4">
        <h1 className="text-[#282828] text-center font-light text-2xl md:text-3xl">LOGIN</h1>
        <form
          className="space-y-6 mt-12"
          onSubmit={handleSubmit}
          aria-busy={isLoading}
        >
          {/* Email Input */}
          <div>
            <Input
              id="email" // Added id
              name="email" // Added name
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 text-gray-800 text-base rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#e5aaa3]"
              required
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <Input
              id="password" // Added id
              name="password" // Added name
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 text-gray-800 text-base rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-[#e5aaa3]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <Checkbox id="remember" name="remember" className="border-gray-600" /> {/* Added name */}
            <label htmlFor="remember" className="ml-2 text-sm text-gray-800">
              Remember Me
            </label>
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#e5aaa3] border border-[#e5aaa3] text-white text-base rounded-lg hover:bg-[#d89993] transition duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Navigation Links */}
        <div className="text-gray-500 text-sm flex justify-center space-x-4 my-4">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password
          </Link>
          <span>|</span>
          <Link href="/sign_up" className="hover:underline">
            User Signup
          </Link>
        </div>

        {/* Social Login */}
        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-gray-800 mb-4">Log in with another account</p>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 hover:bg-gray-50 rounded"
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
          >
            <Image
              src="/images/google.webp"
              alt="Google Login"
              width={50}
              height={50}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
