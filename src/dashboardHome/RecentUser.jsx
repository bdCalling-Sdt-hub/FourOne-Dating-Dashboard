import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { InfoCircleOutlined } from "@ant-design/icons";
import { MdDeleteForever } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { Modal, DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const RecentUser = ({ allUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // ✅ **Search & Date Filtering**
  const filteredUsers = allUsers?.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      !selectedDate || moment(user.createdAt).isSame(moment(selectedDate), "day");
    return matchesSearch && matchesDate;
  });

  // ✅ **Show User Modal**
  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // ✅ **Close User Modal**
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-5  rounded-md mt-5">
      <ToastContainer position="top-right" autoClose={5000} />

      {/* ✅ Header Section */}
      <div className="md:flex justify-between mb-5 items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a]">
          Recent Users <sup className="text-sm">( Last 7 days )</sup>
        </h2>
        <div className="flex items-center gap-2">
          <DatePicker
            className="border border-[#f2e6ff] p-2 rounded-full"
            onChange={(date, dateString) => setSelectedDate(dateString)}
            format="YYYY-MM-DD"
          />
          <input
            className="md:mx-2 my-2 md:my-0 p-2 rounded-full text-sm border border-[#f2e6ff]"
            placeholder="Search by Name or Email"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-primary w-10 h-10 rounded-full flex justify-center items-center text-white">
            <IoSearchOutline className="font-bold" />
          </button>
        </div>
      </div>

      {/* ✅ Raw Table (Matching Image) */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px] bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#f2e6ff] text-[#1a1a1a] ">
            <tr>
              <th className="px-4 py-5 text-left">S. No.</th>
              <th className="px-4 py-5 text-left">Name</th>
              <th className="px-4 py-5 text-left">Email</th>
              {/* <th className="px-4 py-5 text-left">Phone Number</th> */}
              <th className="px-4 py-5 text-left">Joining Date</th>
              {/* <th className="px-4 py-5 text-left">Subscription</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  {/* <img src={user.profileImage} alt="User" className="w-10 h-10 rounded-full" /> */}
                  <span className="font-semibold">{user.fullName}</span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                {/* <td className="px-4 py-3">{user.phoneNumber || "N/A"}</td> */}
                <td className="px-4 py-3">{moment(user.createdAt).format("DD MMMM, YYYY")}</td>
                {/* <td className="px-4 py-3">{user.subscription}</td> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ User Details Modal */}
      <Modal open={isModalOpen} footer={null} onCancel={closeModal} centered>
        {selectedUser && (
          <>
            <h2 className="text-xl font-semibold text-center">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneNumber || "N/A"}</p>
            <p><strong>Joined:</strong> {moment(selectedUser.createdAt).format("DD MMMM, YYYY")}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default RecentUser;
