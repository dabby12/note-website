import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../Special/Sidebar.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { account, databases } from "../../api/appwrite.config.js";
import { Query } from "appwrite";
import { CheckCircle, XCircle, Clock } from "lucide-react"; // Icons

function UserAccount() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localUserData, setLocalUserData] = useState(null);
    const [planStatus, setPlanStatus] = useState('checking'); // "active", "expired", "checking"
    
    const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const PREF_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;
    
    const userID = JSON.parse(localStorage.getItem('user'))?.$id;

    // ✅ Fetch User Preferences
    const fetchPrefs = async () => {
        try {
            const response = await databases.listDocuments(DATABASE_ID, PREF_COLLECTION_ID, [
                Query.equal("userid", userID)
            ]);

            if (response.documents.length > 0) {
                const userPlan = response.documents[0].usedFreeTrial;
                setPlanStatus(userPlan ? "active" : "expired");
            }
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    // ✅ Fetch User Details
    const getUser = async () => {
        try {
            const userData = await account.get();
            setEmail(userData.email);
            setLocalUserData(userData);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        getUser();
        fetchPrefs();
    }, []);

    // ✅ Logout Function
    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            localStorage.removeItem('loggedIn');
            toast.success('Successfully signed out!');
            setTimeout(() => navigate("/"), 500);
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    // ✅ Update Email
    const updateEmail = async () => {
        if (!password) {
            toast.error("Please enter your password to update the email.");
            return;
        }
        try {
            await account.updateEmail(email, password);
            toast.success("Email updated successfully");
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Failed to update email:", error);
            toast.error("Failed to update email");
        }
    };

    // ✅ Update Password
    const updatePassword = async () => {
        if (!password) {
            toast.error("Please enter a new password.");
            return;
        }
        try {
            await account.updatePassword(password);
            toast.success("Password updated successfully");
            setPassword('');
            window.location.reload();
        } catch (error) {
            console.error("Failed to update password:", error);
            toast.error("Failed to update password");
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="flex-none w-64 bg-gray-800 text-white">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-grow p-5 bg-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Settings Page</h1>
                        <div>
                            <button
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <a
                                href="/dashboard"
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                            >
                                Back to Dashboard
                            </a>
                        </div>
                    </div>

                    {/* ✅ Aesthetic Plan Display */}
                    <div className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center gap-4">
                        {planStatus === "expired" ? (
                            <>
                                <XCircle className="text-red-500 w-6 h-6" />
                                <span className="text-lg font-semibold text-red-600">Free Plan</span>
                            </>
                        ) : planStatus === "active" ? (
                            <>
                                <CheckCircle className="text-green-500 w-6 h-6" />
                                <span className="text-lg font-semibold text-green-600">Free Trial Active</span>
                            </>
                        ) : (
                            <>
                                <Clock className="text-yellow-500 w-6 h-6" />
                                <span className="text-lg font-semibold text-yellow-600">Checking Plan...</span>
                            </>
                        )}
                    </div>

                    {/* Profile Settings */}
                    <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                    <div className="mb-4 block text-gray-700 font-medium">
                        <a>Current Email: {localUserData?.email}</a>
                    </div>

                    {localUserData && !localUserData.passwordUpdate ? (
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter a new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-2"
                                onClick={updatePassword}
                            >
                                Set Password
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700">New Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter your new email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter your current password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                onClick={updateEmail}
                            >
                                Save Changes
                            </button>
                            <button
                                className="bg-violet-400 text-white p-2 rounded hover:bg-red-600 ml-2"
                                onClick={updatePassword}
                            >
                                Update Password
                            </button>
                        </>
                    )}
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default UserAccount;
