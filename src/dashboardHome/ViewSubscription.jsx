import React, { useState } from "react";
import { Modal } from "antd";
import { useCreateSubscriptionMutation, useGetSubscriptionQuery, useUpdateSubscriptionMutation } from "../redux/features/subscription/subscription";

import { toast, ToastContainer } from "react-toastify";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const ViewSubscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState({
        title: "",
        amount: "",
        limitation: "",
    });

    const { data } = useGetSubscriptionQuery();
    const subscriptions = data?.data?.attributes?.results;
    console.log(subscriptions);

    const [createSubscription] = useCreateSubscriptionMutation(); // ✅ Create Subscription
    const [updateSubscription] = useUpdateSubscriptionMutation();

    // ✅ **Open Modal for Add**
    const showAddModal = () => {
        setIsEditMode(false);
        setSubscriptionData({ title: "", amount: "", limitation: "" });
        setIsModalOpen(true);
    };

    // ✅ **Open Modal for Edit**
    const showEditModal = (subscription) => {
        setIsEditMode(true);
        setCurrentSubscription(subscription);
        setSubscriptionData(subscription);
        setIsModalOpen(true);
    };

    // ✅ **Handle Input Change**
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ **Handle Add or Update Subscription**
    const handleSave = async () => {
        if (!subscriptionData.title || !subscriptionData.amount || !subscriptionData.limitation) {
            toast.error("Please fill all fields!");
            setIsModalOpen(false);
            return;
        }

        if (isEditMode) {
            // ✅ Update existing subscription
            const res = await updateSubscription({ data: subscriptionData, id: currentSubscription.id });
            console.log(res);
            if (res?.data?.code == 200) {
                toast.success(res?.data?.message);
            }
        } else {
            // ✅ Add new subscription
            const res = await createSubscription(subscriptionData); // Pass subscriptionData directly
            console.log(res);
            if (res?.data?.code == 201) {
                toast.success(res?.data?.message);
            }
        }

        setIsModalOpen(false);
    };


    const handleDelete = async (id) => {
        // toast.success("Subscription deleted successfully!");
    };

    return (
        <div className="p-6 min-h-screen">
            
            <ToastContainer position="top-right" theme="colored" />
            {/* ✅ Header Section */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-[#1a1a1a]">All Subscriptions</h2>
                <button onClick={showAddModal} className="bg-[#5c3c92] text-white px-5 py-3 rounded-md text-sm">
                    Add Subscription
                </button>
            </div>

            {/* ✅ Subscription Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px] bg-white rounded-lg overflow-hidden">
                    <thead className="bg-[#f2e6ff] text-[#1a1a1a]">
                        <tr>
                            <th className="px-4 py-5 text-left">SL no.</th>
                            <th className="px-4 py-5 text-left">Subscription Name</th>
                            <th className="px-4 py-5 text-left">Subscription Fee</th>
                            <th className="px-4 py-5 text-left">Validity</th>
                            <th className="px-4 py-5 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions?.map((sub, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3">{++index}</td>
                                <td className="px-4 py-3">{sub.title}</td>
                                <td className="px-4 py-3">{sub.amount}$</td>
                                <td className="px-4 py-3 capitalize">{sub.limitation}</td>
                                <td className="px-4 py-3 flex items-center gap-1">
                                    <button onClick={() => showEditModal(sub)} className="bg-[#5c3c92] text-white p-2 rounded-lg flex items-center gap-2 font-semibold">
                                        <FaRegEdit className="" />Edit
                                    </button>
                                    <button onClick={() => handleDelete(sub.id)} className="text-[#ffffff] flex items-center gap-2 font-semibold bg-red-600 p-2 ml-2 rounded-lg "><MdOutlineDeleteForever /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Add & Edit Subscription Modal */}
            <Modal title={isEditMode ? "Edit Subscription" : "Add Subscription"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Subscription Name:</label>
                        <input
                            name="title" // Corrected name to match the subscriptionData field
                            placeholder="Enter Subscription Name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Subscription Fee:</label>
                        <input
                            name="amount" // Corrected name to match the subscriptionData field
                            placeholder="Enter Subscription Fee"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Validity:</label>
                        <input
                            name="limitation" // Corrected name to match the subscriptionData field
                            placeholder="Enter Validity"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.limitation}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Limitation:</label>
                        <select className="w-full p-2 border border-gray-300 rounded mb-2" onChange={handleChange} value={subscriptionData.limitation} name="limitation" id="">
                            <option defaultChecked disabled value="">Select Validity</option>
                            <option value="annual">Annual</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    <div className="flex justify-center items-center">
                        <button onClick={handleSave} className="bg-[#5c3c92] text-white px-5 py-3 rounded-md text-sm">
                            {isEditMode ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewSubscription;
