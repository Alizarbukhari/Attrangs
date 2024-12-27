"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

interface User {
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user data immediately
  useEffect(() => {
    const loadUser = async () => {
      const userCookie = await getCookie('user_data');
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie as string);
          setUser(parsedUser);
          console.log("Loaded user from cookie:", parsedUser);
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []); // Run once on mount

  const login = (userData: User) => {
    console.log("Setting user in context:", userData);
    // Set cookies first
    setCookie('user_data', JSON.stringify(userData), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    setCookie('auth_token', userData.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    // Then update state
    setUser(userData);
  };

  const logout = () => {
    deleteCookie('user_data');
    deleteCookie('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
