
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../public/All/logo.png";

import {
  FaDollarSign,
  FaPersonRunning,
  FaRegUser,
  FaSackDollar,
  FaUser,
  FaUsers,
  FaUsersLine,
} from "react-icons/fa6";
import {
  MdCategory,
  MdOutlineHomeRepairService,
  MdOutlineMedicalServices,
  MdSubscriptions,
} from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { HiDocumentReport, HiLogout } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { RiLockPasswordLine, RiSecurePaymentFill, RiShieldCheckLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { SiMagento } from "react-icons/si";
import { BsCardChecklist, BsExclude } from "react-icons/bs";
import { ImUserPlus } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { IoCard } from "react-icons/io5";


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="lg:w-[250px] xl:w-[300px] md:w-[200px] sm:w-[120px] w-[70px] flex flex-col justify-between bg-[#6d37b5] h-full min-h-screen  ">
      <div>
        <Link to={'/dashboard/home'} className="grid justify-items-stretch  mb-10">
          <img
            className="w-full  mx-auto justify-self-center"
            src={logo}
            alt="Logo"
          />
        </Link>
        <div className="">
          <ul>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] border-l-4 border-[#ffffff] bg-[#9a4ed4] text-[#fff] md:pl-10"
                  : "flex text-[#ffffff] cursor-pointer items-center text-[18px] font-medium border-l-4 border-transparent p-[10px] md:pl-10"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Dashboard</span>
            </NavLink>

            <NavLink
              to="userslist"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] border-l-4  bg-[#9a4ed4]  border-[#ffffff] text-[#fff] md:pl-10"
                  : "flex text-[#ffffff] cursor-pointer items-center text-[18px] font-medium  border-l-4 border-transparent p-[10px] md:pl-10"
              }
            >
              <FaUsers className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Users</span>
            </NavLink>

            {/* <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#430750] text-[#fff] m-[6px] rounded-lg md:pl-10"
                  : "flex text-[#430750] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg md:pl-10"
              }
            >
              <FaRegUser className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">My Profile</span>
            </NavLink> */}

            <NavLink
              to="subscription"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] border-l-4  bg-[#9a4ed4]  border-[#ffffff] text-[#fff] md:pl-10"
                  : "flex text-[#ffffff] cursor-pointer items-center text-[18px] font-medium border-l-4 border-transparent p-[10px] md:pl-10"
              }
            >
              <IoCard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Subscription</span>
            </NavLink>
            {/* <NavLink
              to="adminchangepassword"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#430750] text-[#fff] m-[6px] rounded-lg md:pl-10"
                  : "flex text-[#430750] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg md:pl-10"
              }
            >
              <RiLockPasswordLine className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block"> Admins Request</span>
            </NavLink> */}

            {/* <NavLink
              to="subscription"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[#430750] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-normal  rounded-lg"
              }
            >
              <FaDollarSign className="h-7 w-7 lg:h-5 lg:w-5"/>
              <span className="hidden ml-2 sm:block">Billing/Payment</span>
            </NavLink> */}

            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] border-l-4  bg-[#9a4ed4]  border-[#ffffff] text-[#fff] md:pl-10"
                  : "flex text-[#ffffff] cursor-pointer items-center text-[18px] font-medium border-l-4 border-transparent p-[10px] md:pl-10"
              }
            >
              <CiSettings className="h-8 w-8 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Settings</span>
            </NavLink>
            <div className="mt-5">
              <div
                onClick={handleLogOut}
                className="flex items-center md:ml-12 ml-5 cursor-pointer gap-2 text-[#ffffff] font-medium"
              >
                <IoIosLogOut className="h-8 w-8 lg:h-5 font-bold lg:w-5" />
                <span className="hidden sm:block font-semibold">Log Out</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
