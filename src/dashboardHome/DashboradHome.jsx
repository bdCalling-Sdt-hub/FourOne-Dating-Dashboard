import React from "react";
import Card from "./Card";
import Barchart from "./Barchart";
import RecentUser from "./RecentUser";
import Patient from "../../public/Dashboard/Patient.png";
import { useAllUsersQuery } from "../redux/features/users/users";
import { useAllDashboardInfoQuery, useSevenDaysQuery } from "../redux/features/admin/getDashboardInfo";
import moment from "moment";
import { FaUsers } from "react-icons/fa6";

const DashboardHome = () => {

  const day = 7;
  const { data: allDashboardInfoData } = useAllDashboardInfoQuery();
  const { data: allDashboardInfo, isLoading: dashboardLoading } = useSevenDaysQuery({ day });

  const totalUser = allDashboardInfo?.data?.attributes;
  const userData = allDashboardInfoData?.data?.attributes;
  console.log(userData);


  return (
    <div className="sm:px-5">
      {/* <Card> </Card> */}
      {/* <Barchart /> */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-4 sm:gap-5">

        <div className="mt-5 border border-[#f5edff] sm:p-10 p-5 rounded-xl flex sm:flex-col md:flex-row items-center gap-4">
          {/* <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" /> */}
          <FaUsers className="text-primary text-5xl" />
          <div className="sm:text-center md:text-left flex items-center justify-between w-full">
            <h2 className="text-xl text-[#1a1a1a]">
              Total Users
            </h2>
            <h2 className="text-4xl font-semibold text-[#1a1a1a]">
              {userData?.totalUser ? userData?.totalUser : "00"}
            </h2>
          </div>
        </div>
        <div className="mt-5 border border-[#f5edff] sm:p-10 p-5 rounded-xl flex sm:flex-col md:flex-row items-center gap-4">
          {/* <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" /> */}
          <FaUsers className="text-primary text-5xl" />
          <div className="sm:text-center md:text-left flex items-center justify-between w-full">
            <h2 className="text-xl text-[#1a1a1a]">
              Recent Users
            </h2>
            <h2 className="text-4xl font-semibold text-[#1a1a1a]">
              {totalUser?.totalUser ? totalUser?.totalUser : "00"}
            </h2>
          </div>
        </div>



      </div>

      {/* Recent Users List */}
      <RecentUser allUsers={userData?.recentUserData} state={"Recent Users"} />
      {/* <RecentUser state={"Total Users"} /> */}
    </div>
  );
};

export default DashboardHome;
