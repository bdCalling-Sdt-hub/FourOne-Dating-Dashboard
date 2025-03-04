import React, { useState } from "react";
import { Modal } from "antd";

const ViewSubscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState({
        name: "",
        fee: "",
        validity: "",
    });

    const [subscriptions, setSubscriptions] = useState([
        { id: "01", name: "Free Trial", fee: "$0.00", validity: "1 Day" },
        { id: "02", name: "Four:One Premium", fee: "$14.99", validity: "Unlimited" },
    ]);

    // ✅ **Open Modal for Add**
    const showAddModal = () => {
        setIsEditMode(false);
        setSubscriptionData({ name: "", fee: "", validity: "" });
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
    const handleSave = () => {
        if (!subscriptionData.name || !subscriptionData.fee || !subscriptionData.validity) {
            alert("Please fill all fields!");
            return;
        }

        if (isEditMode) {
            // ✅ Update existing subscription
            setSubscriptions((prev) =>
                prev.map((sub) =>
                    sub.id === currentSubscription.id ? { ...sub, ...subscriptionData } : sub
                )
            );
        } else {
            // ✅ Add new subscription
            setSubscriptions((prev) => [
                ...prev,
                { id: (prev.length + 1).toString(), ...subscriptionData },
            ]);
        }

        setIsModalOpen(false);
    };

    return (
        <div className="p-6 min-h-screen">
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
                        {subscriptions.map((sub, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-3">{sub.id}</td>
                                <td className="px-4 py-3">{sub.name}</td>
                                <td className="px-4 py-3">{sub.fee}</td>
                                <td className="px-4 py-3">{sub.validity}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => showEditModal(sub)} className="text-[#5c3c92] font-semibold">
                                        Edit
                                    </button>
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
                            name="name"
                            placeholder="Enter Subscription Name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Subscription Fee:</label>
                        <input
                            name="fee"
                            placeholder="Enter Subscription Fee"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.fee}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Validity:</label>
                        <input
                            name="validity"
                            placeholder="Enter Validity"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={subscriptionData.validity}
                            onChange={handleChange}
                        />
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
