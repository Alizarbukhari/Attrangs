"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored user:", storedUser);
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User set from storage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user from storage:", error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
