import logo from "../../public/image/logo.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Button } from "antd";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useVerifyOtp2Mutation } from "../redux/features/auth/verifyOtp";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";

const VerifyOtp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [error, setError] = useState("");
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [verifyOtp] = useVerifyOtp2Mutation();

  const verifyData = {
    oneTimeCode: otp,
    email: email,
  };

  const sendOtp = async () => {

    console.log(verifyData);

    try {
      // const res = await verifyOtp(verifyData).unwrap();
      const res = await verifyOtp(verifyData).unwrap();
      console.log(res);

      if (res?.code == 200) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate(`/updatepassword?email=${email}`);
        }, 1000);
      }
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  return (
    <div className="text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="md:grid grid-cols-2 min-h-[80vh]">
        <div className="flex items-center justify-center h-screen relative">
          <img className="absolute top-0 left-0" src="/All/login-1.png" alt="" />
          <div className="bg-[#d4b2ff] w-[200px] h-[200px] flex items-center justify-center">
            <h3 className="text-5xl ">Logo</h3>
          </div>
          <img className="absolute bottom-0 right-0" src="/All/login-2.png" alt="" />
        </div>



        <div className="bg-[url('/All/login-bg.png')] h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center">
          <div className="bg-[#0000009e] px-5 py-10 rounded-xl w-full md:w-2/3">
            <div >
              <div className="flex flex-col justify-center items-center mb-5">
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <Link to={'/forgotpassword'}> <FaArrowLeftLong /></Link> Verify Email
                </h2>
                <p>Please enter your email address to reset your password.</p>
              </div>

              <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "52px",
                    width: "100%", // Default full width
                    background: "#fff",
                    color: "#000",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    marginRight: "8px",
                    outline: "none",
                    padding: "0 12px", // Padding for better input appearance
                  }}
                  renderSeparator={<span className="md:w-6"> </span>}
                  renderInput={(props) => (
                    <input {...props} className="w-full sm:w-[55px] md:w-[60px] text-center" />
                  )}
                />
              </div>
              <div className="flex justify-between items-center mt-4 sm:mt-6">
                <small className="text-[14px] sm:text-[16px] font-normal">
                  Didn’t receive the code?
                </small>
                <small className="text-[14px] sm:text-[16px] font-medium text-[#00BF63] cursor-pointer">
                  Resend
                </small>
              </div>
            </div>
            <p className="text-red-500 font-medium">{error}</p>

            <Button
              onClick={sendOtp}
              className="block w-full h-[52px] border-none px-2 py-4 mt-2 !text-white !bg-[#6d37b5] rounded-xl"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
