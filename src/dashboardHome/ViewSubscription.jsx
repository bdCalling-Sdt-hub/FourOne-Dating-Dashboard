import React, { useState } from "react";
import { Modal } from "antd";
import {
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscriptionQuery,
    useUpdateSubscriptionMutation,
} from "../redux/features/subscription/subscription";

import { toast, ToastContainer } from "react-toastify";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

const ViewSubscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState({
        title: "",
        amount: "",
        limitation: "",
        features: [],
    });

    const { data } = useGetSubscriptionQuery();
    const subscriptions = data?.data?.attributes?.results;
    console.log(subscriptions);

    const [createSubscription] = useCreateSubscriptionMutation(); // ✅ Create Subscription
    const [updateSubscription] = useUpdateSubscriptionMutation();

    // Open modal for Add
    const showAddModal = () => {
        setIsEditMode(false);
        setSubscriptionData({ title: "", amount: "", limitation: "", features: [] });
        setIsModalOpen(true);
    };

    // Open modal for Edit
    const showEditModal = (subscription) => {
        setIsEditMode(true);
        setCurrentSubscription(subscription);
        // Make sure features is at least an array to avoid errors
        setSubscriptionData({
            title: subscription.title || "",
            amount: subscription.amount || "",
            limitation: subscription.limitation || "",
            features: subscription.features || [],
        });
        setIsModalOpen(true);
    };

    // Handle input change for title, amount, limitation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscriptionData((prev) => ({ ...prev, [name]: value }));
    };

    // Add new feature input field
    const addFeature = () => {
        setSubscriptionData((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    };

    // Update feature value by index
    const updateFeature = (index, value) => {
        setSubscriptionData((prev) => {
            const newFeatures = [...prev.features];
            newFeatures[index] = value;
            return { ...prev, features: newFeatures };
        });
    };

    // Remove feature input field by index
    const removeFeature = (index) => {
        setSubscriptionData((prev) => {
            const newFeatures = prev.features.filter((_, i) => i !== index);
            return { ...prev, features: newFeatures };
        });
    };

    // Handle save (create or update)
    const handleSave = async () => {
        if (
            !subscriptionData.title ||
            !subscriptionData.amount ||
            !subscriptionData.limitation ||
            subscriptionData.features.length === 0 ||
            subscriptionData.features.some((f) => f.trim() === "")
        ) {
            toast.error("Please fill all fields including features!");
            return;
        }

        try {
            if (isEditMode) {
                // Update existing subscription
                const res = await updateSubscription({
                    data: subscriptionData,
                    id: currentSubscription.id,
                });
                console.log(res);
                if (res?.data?.code === 200) {
                    toast.success(res?.data?.message);
                }
            } else {
                // Create new subscription
                const res = await createSubscription(subscriptionData);
                console.log(res);
                if (res?.data?.code === 201) {
                    toast.success(res?.data?.message);
                }
            }
        } catch (error) {
            toast.error("Error saving subscription!");
            console.error(error);
        }

        setIsModalOpen(false);
    };

    const [deteteSubscription] = useDeleteSubscriptionMutation();

    const handleDelete = async (id) => {
        try {
            const res = await deteteSubscription(id).unwrap();
            console.log(res);
            if (res?.code === 200) {
                toast.success(res?.message);
            }
        } catch (error) {
            toast.error("Error deleting subscription!");
            console.error(error);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <ToastContainer position="top-right" theme="colored" />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-[#1a1a1a]">All Subscriptions</h2>
                <button
                    onClick={showAddModal}
                    className="bg-[#5c3c92] text-white px-5 py-3 rounded-md text-sm flex items-center gap-2 font-semibold"
                >
                    <IoAddOutline className="text-2xl" /> Add Subscription
                </button>
            </div>

            {/* Subscription Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px] bg-white rounded-lg overflow-hidden">
                    <thead className="bg-[#f2e6ff] text-[#1a1a1a]">
                        <tr>
                            <th className="px-4 py-5 text-left">SL no.</th>
                            <th className="px-4 py-5 text-left">Subscription Name</th>
                            <th className="px-4 py-5 text-left">Subscription Fee</th>
                            <th className="px-4 py-5 text-left">Validity</th>
                            <th className="px-4 py-5 text-left">Features</th>
                            <th className="px-4 py-5 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions?.map((sub, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{sub.title}</td>
                                <td className="px-4 py-3">{sub.amount}$</td>
                                <td className="px-4 py-3 capitalize">{sub.limitation}</td>
                                <td className="px-4 py-3">
                                    <ul className="list-disc list-inside">
                                        {sub.features?.map((feat, i) => (
                                            <li key={i}>{feat}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 py-3 flex items-center gap-1">
                                    <button
                                        onClick={() => showEditModal(sub)}
                                        className="bg-[#5c3c92] text-white p-2 rounded-lg flex items-center gap-2 font-semibold"
                                    >
                                        <FaRegEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        className="text-[#ffffff] flex items-center gap-2 font-semibold bg-red-600 p-2 ml-2 rounded-lg "
                                    >
                                        <MdOutlineDeleteForever /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add & Edit Subscription Modal */}
            <Modal
                title={isEditMode ? "Edit Subscription" : "Add Subscription"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Subscription Name:</label>
                        <input
                            name="title"
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
                            name="amount"
                            placeholder="Enter Subscription Fee"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Limitation:</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            value={subscriptionData.limitation}
                            name="limitation"
                        >
                            <option disabled value="">
                                Select Validity
                            </option>
                            <option value="annual">Annual</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    {/* Features input list */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Features:</label>
                        {subscriptionData.features.map((feature, index) => (
                            <div key={index} className="flex items-center mb-2 gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    placeholder={`Feature #${index + 1}`}
                                    onChange={(e) => updateFeature(index, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="bg-[#5c3c92] text-white px-3 py-1 rounded"
                        >
                            + Add Feature
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleSave}
                            className="bg-[#5c3c92] text-white px-5 py-3 rounded-md text-sm"
                        >
                            {isEditMode ? "Update" : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewSubscription;
