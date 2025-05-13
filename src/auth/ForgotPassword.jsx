import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "antd"; // Keeping Ant Design Checkbox for styling consistency
import toast, { Toaster } from "react-hot-toast";
import logo from "./../../public/image/logo.png";
import { FaArrowLeft } from "react-icons/fa6";
import { useForgotPasswordMutation } from "../redux/features/auth/forgotPassword"; // Assuming this mutation exists in your redux slice

const ForgotPassword = () => {
  // States for handling form data and errors
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Hook for navigating and mutation call for password reset
  const navigate = useNavigate();
  const [adminLogin, { isLoading }] = useForgotPasswordMutation();

  // Handle Form Submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    try {
      const res = await adminLogin({ email }).unwrap();
      if (res?.code === 200) {

        localStorage.setItem("email", email);

        setTimeout(() => navigate("/verifyotp"), 500); // Redirect after 500ms
      } else {
        setError("Invalid login credentials"); // Set error message if login fails
      }
    } catch (err) {
      setError(err?.data?.message || "Login failed. Please try again."); // Handle unexpected errors
    }
  };

  return (
    <div className="min-h-screen">
      {/* Toast notification */}
      <Toaster reverseOrder={false} />

      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Optional decorative images */}
        <div className="hidden md:flex items-center justify-center h-screen relative">
          <img className="absolute top-0 left-0" src="/All/login-1.png" alt="Decorative top image" />
          <div className="bg-[#d4b2ff] w-[200px] h-[200px] flex items-center justify-center">
            <img className="w-full" src="/All/fourOneLogo.jpg" alt="Logo" />
          </div>
          <img className="absolute bottom-0 right-0" src="/All/login-2.png" alt="Decorative bottom image" />
        </div>

        {/* Right Section - Login form */}
        <div className="bg-[url('/All/login-bg.png')] h-screen w-full flex items-center bg-no-repeat bg-cover bg-center">
          <form
            onSubmit={onSubmit}
            className="w-2/3 p-5 bg-[#00000090] rounded-2xl mx-auto"
          >
            {/* Header */}
            <h2 className="mb-5 text-3xl font-semibold text-white text-center flex items-center gap-2 justify-center">
              <Link to="/">
                <FaArrowLeft />
              </Link>
              Forgot Password
            </h2>

            {/* Instructions */}
            <p className="mb-5 text-gray-400 text-center">
              Please enter your email address to reset your password.
            </p>

            {/* Email input */}
            <label className="block my-6" htmlFor="email">
              <span className="text-white mb-2 block">Email</span>
              <input
                id="email"
                className="block border border-secondary py-3 w-full px-3 rounded-lg bg-white"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {/* Error message display */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit button */}
            <button
              className="block border border-[#6d37b5] py-3 w-full px-3 rounded-lg bg-[#6d37b5] text-white font-semibold mt-5"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
