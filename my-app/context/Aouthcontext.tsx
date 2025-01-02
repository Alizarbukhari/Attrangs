"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const MAX_REFRESH_COUNT = 2; // Maximum number of refreshes before forcing logout
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from cookie on initial load
    const userCookie = getCookie('user_data');
    if (userCookie) {
      const userData = JSON.parse(userCookie as string);
      console.log('Loaded user from cookie:', userData);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    console.log('Login function called with userData:', userData);
    
    try {
      // Decode token to get expiration
      const decodedToken = jwtDecode(userData.token);
      console.log('Decoded token:', decodedToken);
      
      // Set expiration time
      const expirationTime = new Date((decodedToken as any).exp * 1000);
      console.log('Token expiration time set to:', expirationTime);
      
      // Store both tokens in cookies
      setCookie('auth_token', userData.token, {
        expires: expirationTime
      });
      
      setCookie('refresh_token', userData.refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
      
      // Store complete user data
      setCookie('user_data', JSON.stringify(userData), {
        expires: expirationTime
      });
      
      setUser(userData);
    } catch (error) {
      console.error('Error in login:', error);
    }
  };

  const logout = () => {
    deleteCookie('user_data');
    deleteCookie('auth_token');
    setUser(null);
  };

  // Add token expiration check
  useEffect(() => {
    console.log('Client-side token expiration check running');
    const checkTokenExpiration = async () => {
      const userCookie = getCookie('user_data');
      if (userCookie) {
        const userData = JSON.parse(userCookie as string);
        const decodedToken = jwtDecode<{ exp: number }>(userData.token);
        const currentTime = Date.now() / 1000;
        
        console.log('Token check:', {
          currentTime: new Date(currentTime * 1000),
          expirationTime: new Date(decodedToken.exp * 1000),
          isExpired: decodedToken.exp < currentTime
        });

        if (decodedToken.exp < currentTime) {
          console.log('Token expired, attempting refresh');
          
          // Check refresh count
          if (refreshCount >= MAX_REFRESH_COUNT) {
            console.log('Maximum refresh attempts reached, logging out');
            logout();
            return;
          }
          
          try {
            console.log('Sending refresh request with token:', userData.refreshToken);
            
            const response = await fetch(`${API_URL}/refresh`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                refresh_token: userData.refreshToken
              }),
            });

            // Add debug logs
            console.log('Refresh response status:', response.status);
            const responseText = await response.text();
            console.log('Refresh response body:', responseText);

            if (response.ok) {
              const data = JSON.parse(responseText);
              console.log('Refresh successful:', data);
              
              // Update tokens
              const updatedUserData = {
                ...userData,
                token: data.access_token,
                refreshToken: data.refresh_token
              };

              // Update cookie and state
              setCookie('user_data', JSON.stringify(updatedUserData));
              setUser(updatedUserData);
              
              // Increment refresh count on successful refresh
              setRefreshCount(prev => prev + 1);
            } else {
              console.log('Refresh failed, logging out');
              logout();
            }
          } catch (error) {
            console.error('Refresh error:', error);
            logout();
          }
        }
      }
    };

    // Check every 30 seconds instead of every minute
    const interval = setInterval(checkTokenExpiration, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
