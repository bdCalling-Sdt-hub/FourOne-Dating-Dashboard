import React from "react";
import Card from "./Card";
import Barchart from "./Barchart";
import RecentUser from "./RecentUser";
import Patient from "../../public/Dashboard/Patient.png";
import { useAllUsersQuery } from "../redux/features/users/users";
import { useAllDashboardInfoQuery } from "../redux/features/admin/getDashboardInfo";
import moment from "moment";
import { FaUsers } from "react-icons/fa6";

const DashboardHome = () => {
  const { data: userData, isLoading, error } = useAllUsersQuery({})
  const user = userData?.data?.attributes?.results;
  const last7Days = moment().subtract(7, "days").format("YYYY-MM-DD");

  const last7DaysUsers = user?.filter((u) =>
    moment(u?.createdAt).isSameOrAfter(last7Days, "day")
  );

  console.log(last7DaysUsers?.length);

  const { data: allDashboardInfo, isLoading: dashboardLoading } = useAllDashboardInfoQuery();

  console.log(allDashboardInfo?.data?.attributes?.totalAdmin);
  console.log(allDashboardInfo?.data?.attributes?.totalUser);

  const totalAdmin = allDashboardInfo?.data?.attributes?.totalAdmin;
  const totalUser = allDashboardInfo?.data?.attributes?.totalUser;


  return (
    <div className="sm:px-5">
      {/* <Card> </Card> */}
      {/* <Barchart /> */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-4 sm:gap-5">

        <div className="mt-5 border border-primary sm:p-10 p-5 rounded-xl flex sm:flex-col md:flex-row items-center gap-8">
          {/* <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" /> */}
          <FaUsers className="text-primary text-5xl" />
          <div className="sm:text-center md:text-left flex items-center justify-between w-full">
            <h2 className="text-xl text-[#1a1a1a]">
              Total Users
            </h2>
            <h2 className="text-2xl font-medium text-[#1a1a1a]">
              {totalAdmin ? totalAdmin : "1200"}
            </h2>
          </div>
        </div>
        <div className="mt-5 border border-primary sm:p-10 p-5 rounded-xl flex sm:flex-col md:flex-row items-center gap-8">
          {/* <img src={Patient} alt="Total Users" className="w-16 sm:w-20 md:w-24" /> */}
          <FaUsers className="text-primary text-5xl" />
          <div className="sm:text-center md:text-left flex items-center justify-between w-full">
            <h2 className="text-xl text-[#1a1a1a]">
              Recent Users
            </h2>
            <h2 className="text-2xl font-medium text-[#1a1a1a]">
              {totalAdmin ? totalAdmin : "800"}
            </h2>
          </div>
        </div>



      </div>

      {/* Recent Users List */}
      <RecentUser state={"Recent Users"} />
      {/* <RecentUser state={"Total Users"} /> */}
    </div>
  );
};

export default DashboardHome;
