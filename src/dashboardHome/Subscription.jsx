import React from "react";
import { Link } from "react-router-dom";

const dummySubscribers = [
    {
        id: "#1233",
        fullName: "Kathryn Murp",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$0.00",
    },
    {
        id: "#1233",
        fullName: "Devon Lane",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "FourOne Premium",
        subscriptionFee: "$29.99",
    },
    {
        id: "#1233",
        fullName: "Foysal Rahman",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "FourOne Premium",
        subscriptionFee: "$49.99",
    },
    {
        id: "#1233",
        fullName: "Hari Danang",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$14.99",
    },
    {
        id: "#1233",
        fullName: "Floyd Miles",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "FourOne Premium",
        subscriptionFee: "$14.99",
    },
    {
        id: "#1233",
        fullName: "Eleanor Pena",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$49.99",
    },
    {
        id: "#1233",
        fullName: "Devon Lane",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$29.99",
    },
    {
        id: "#1233",
        fullName: "Hari Danang",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$49.99",
    },
    {
        id: "#1233",
        fullName: "Devon Lane",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$14.99",
    },
    {
        id: "#1233",
        fullName: "Hari Danang",
        profileImage: "/All/logo.png",
        joiningDate: "12/04/24",
        subscriptionPlan: "Free",
        subscriptionFee: "$14.99",
    },
];

const Subscription = () => {
    return (
        <div className="p-6 bg-[#f8f6fc] min-h-screen">
            {/* ✅ Header Section */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-[#1a1a1a]">All Subscribers</h2>
                <Link to={`/dashboard/view-subscription`} className="bg-[#5c3c92] text-white px-10 py-3 rounded-md text-sm">
                    View Subscription
                </Link>
            </div>

            {/* ✅ Subscription Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px] bg-white rounded-lg overflow-hidden">
                    <thead className="bg-[#f2e6ff] text-[#1a1a1a]">
                        <tr>
                            <th className="px-4 py-5 text-left">SL no.</th>
                            <th className="px-4 py-5 text-left">Full Name</th>
                            <th className="px-4 py-5 text-left">Joining Date</th>
                            <th className="px-4 py-5 text-left">Subscription Plan</th>
                            <th className="px-4 py-5 text-left">Subscription Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummySubscribers.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <img src={user.profileImage} alt="User" className="w-10 h-10 rounded-full" />
                                    <span className="font-semibold">{user.fullName}</span>
                                </td>
                                <td className="px-4 py-3">{user.joiningDate}</td>
                                <td className="px-4 py-3">{user.subscriptionPlan}</td>
                                <td className="px-4 py-3">{user.subscriptionFee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subscription;
