"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const EditMemberInfo: React.FC = () => {
  const [firstName, setFirstName] = useState("xyz");
  const [lastName, setLastName] = useState("xyz");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("3033201020");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/update-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          currentPassword,
          newPassword,
          phone,
        }),
      });

      if (response.ok) {
        toast.success("Member information updated successfully!");
        // Optionally, redirect or perform other actions
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update information.");
      }
    } catch (error) {
      console.error("Error updating member information:", error);
      toast.error("An unexpected error occurred.");
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

      <div className="flex justify-center gap-4 mb-6">
        <button
          type="button"
          className="px-3 py-1 text-xs sm:text-sm underline text-[#e5aaa3] hover:text-[#d88f87]"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow">
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSave}>
          {/* Name Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="firstName" className="text-sm sm:w-32">
              Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* Castle Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="lastName" className="text-sm sm:w-32">
              Castle
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* ID Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="id" className="text-sm sm:w-32">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value="cm540aptk0003119pecvsljvf"
              disabled
              className="w-full flex-1 p-2 bg-gray-50 border-b outline-none"
            />
          </div>

          {/* Current Password Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="currentPassword" className="text-sm sm:w-32">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* New Password Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="newPassword" className="text-sm sm:w-32">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* Verify Password Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="confirmPassword" className="text-sm sm:w-32">
              Verify Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="phone" className="text-sm sm:w-32">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full flex-1 p-2 border-b outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label htmlFor="email" className="text-sm sm:w-32">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value="xyz@gmail.com"
              disabled
              className="w-full flex-1 p-2 bg-gray-50 border-b outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`px-4 py-2 bg-[#e5aaa3] text-white rounded-lg hover:bg-[#d88f87] transition duration-300 ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
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
