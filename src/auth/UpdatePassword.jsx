import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import { useAdminLoginMutation } from "../redux/features/auth/Login"; // Assuming this mutation is for updating the password
import { useUpdatePasswordAdminMutation } from "../redux/features/auth/updatePassword";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Error state for form validation
  const [updatePassword, { isLoading }] = useUpdatePasswordAdminMutation();

  const email = localStorage.getItem("email");


  // Handle Form Submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Basic validation to check if password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await updatePassword({ email, password }).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message);
        setTimeout(() => navigate("/"), 500); // Redirect after 500ms
      }
    } catch (err) {
      setError(err?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster reverseOrder={false} /> {/* Toast notifications */}

      {/* Main layout with 2 sections */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Optional images for decoration */}
        <div className="hidden md:flex items-center justify-center h-screen relative">
          <img className="absolute top-0 left-0" src="/All/login-1.png" alt="Decorative image top" />
          <div className="bg-[#d4b2ff] w-[200px] h-[200px] flex items-center justify-center">
            <img className="w-full" src="/All/fourOneLogo.jpg" alt="Logo" />
          </div>
          <img className="absolute bottom-0 right-0" src="/All/login-2.png" alt="Decorative image bottom" />
        </div>

        {/* Right Section - Update Password Form */}
        <div className="bg-[url('/All/login-bg.png')] h-screen w-full flex items-center bg-no-repeat bg-cover bg-center">
          <form
            onSubmit={onSubmit}
            className="w-2/3 p-5 bg-[#00000090] rounded-2xl mx-auto"
          >
            {/* Form Header */}
            <h2 className="mb-5 text-3xl font-semibold text-white text-center flex items-center gap-2 justify-center">
              <Link to="/forgotpassword">
                <FaArrowLeft />
              </Link>{" "}
              Reset Password
            </h2>

            {/* Instructions for password */}
            <p className="mb-5 text-gray-400 text-center">
              Your password must be 8-10 characters long.
            </p>

            {/* New Password Input */}
            <label className="block my-6" htmlFor="newPassword">
              <span className="text-white mb-2 block">New Password</span>
              <input
                id="newPassword"
                className="block border border-secondary py-3 w-full px-3 rounded-lg bg-white"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* Confirm Password Input */}
            <label className="block my-6" htmlFor="confirmPassword">
              <span className="text-white mb-2 block">Confirm Password</span>
              <input
                id="confirmPassword"
                className="block border border-secondary py-3 w-full px-3 rounded-lg bg-white"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            {/* Error Message Display */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              className="block border border-[#6d37b5] py-3 w-full px-3 rounded-lg bg-[#6d37b5] text-white font-semibold mt-5"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
