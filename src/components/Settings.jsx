import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Special/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { account } from '../api/appwrite.cjs';

function Settings({ userData }) {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localUserData, setLocalUserData] = useState(null);
    const SuccessSignOut = () => toast.success('Successfully signed out!');

    const getUser = async () => {
        try {
            const userData = await account.get();
            setEmail(userData.email);
            setLocalUserData(userData);
            console.log("User data:", userData);
            if (!userData.passwordUpdate) {
                console.log("User does not have a password, prompt to set one.");
              } else {
                console.log("User already has a password.");
            }

            setEmail(userData.email);
        } catch(error) {
            console.error("Failed to fetch user data:", error);
            
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            localStorage.removeItem('loggedIn');
            SuccessSignOut();
            setTimeout(() => {
                navigate("/"); // Redirect to login after logout
            }, 500); // Wait for 1 second before redirecting
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

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

    const updatePassword = async () => {
        if (!password) {
            toast.error("Please enter a new password.");
            return;
        }
        try {
            await account.updatePassword(password);
            toast.success("Password updated successfully");
            setPassword('');
        } catch (error) {
            console.error("Failed to update password:", error);
            toast.error("Failed to update password", error);
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex-none w-64 bg-gray-800 text-white">
                    <Sidebar />
                </div>
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
                    <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                    <div className="mb-4 block text-gray-700 font-medium">
                        <a>
                            Current Email: {localUserData?.email}
                        </a>
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
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700"> New email</label>
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
                            <button
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                onClick={updateEmail}
                            >
                                Save Changes
                            </button>
                            
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Settings;