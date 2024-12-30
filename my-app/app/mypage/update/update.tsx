"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../../context/Aouthcontext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const EditMemberInfo: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userNameId, setUserNameId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { logout, login } = useContext(AuthContext);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiCall(`${API_URL}/get-current-user`);
        if (response.ok) {
          const userData = await response.json();
          setFirstName(userData.first_name);
          setLastName(userData.last_name);
          setUserNameId(userData.user_name_id);
          setPhone(userData.phone || "");
          setEmail(userData.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  // Phone number validation function
  const validatePhone = useCallback((number: string) => {
    return true; // No validation needed anymore
  }, []);

  // Password validation function
  const validatePassword = useCallback((password: string) => {
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    const errors = [];
    if (!hasNumber) errors.push("At least one number");
    if (!hasSpecialChar) errors.push("At least one special character");
    if (!hasUpperCase) errors.push("At least one capital letter");
    if (!hasLowerCase) errors.push("At least one small letter");
    if (password.length < 8) errors.push("Minimum 8 characters");

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }, []);

  // Current password check karne ka function new
  const verifyCurrentPassword = async (password: string) => {
    try {
      const response = await apiCall(`${API_URL}/verify-password`, {
        method: 'POST',
        body: JSON.stringify({ current_password: password })
      });

      return response.ok;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Required fields validation
      if (!firstName.trim() || !lastName.trim()) {
        toast.error("Name and Castle fields are required", {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSaving(false);
        return;
      }

      // New password validation if provided
      if (newPassword) {
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
          toast.error(
            `Password requirements missing: ${passwordValidation.errors.join(", ")}`, 
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
          setIsSaving(false);
          return;
        }

        if (newPassword !== confirmPassword) {
          toast.error("New passwords do not match", {
            position: "top-right",
            autoClose: 5000,
          });
          setIsSaving(false);
          return;
        }
      }

      // Current password verification
      if (!currentPassword) {
        toast.error("Please enter your current password to make changes", {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSaving(false);
        return;
      }

      // Verify current password
      const isValid = await verifyCurrentPassword(currentPassword);
      if (!isValid) {
        toast.error("Current password is incorrect", {
          position: "top-right",
          autoClose: 5000,
        });
        setIsSaving(false);
        return;
      }

      // Profile update ka API call
      const response = await apiCall(`${API_URL}/update-profile`, {
        method: 'PUT',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
          new_password: newPassword || undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      toast.success("Profile updated successfully!");
      
      // Agar password change hua hai
      if (newPassword) {
        logout(); // User ko logout kar do
        router.push('/login'); // Login page pe bhej do
      } else {
        // Agar password change nahi hua, to sirf profile update karo
        router.push('/mypage');
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          toast.error("Unable to connect to server. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-16 sm:mt-24 md:mt-32 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Edit member information
      </h1>

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-gray-500">
            me+
          </span>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow">
        <form className="space-y-6 max-w-2xl mx-auto p-4" onSubmit={handleSave}>
          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* Castle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Castle</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* ID */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">ID</label>
            <input
              type="text"
              value={userNameId}
              className="w-full flex-1 p-2 bg-gray-50 border-b outline-none"
              disabled
            />
          </div>

          {/* Current Password */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* Verify Password */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Verify Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="text-sm sm:w-32">Email</label>
            <input
              type="email"
              value={email}
              className="w-full flex-1 p-2 bg-gray-50 border-b outline-none"
              disabled
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[#e5aaa3] text-white rounded hover:bg-[#d89993] disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberInfo;
