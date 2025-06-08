import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Special/Sidebar.jsx";
import { ToastContainer, toast } from "react-toastify";
import { account, databases, storage } from "../../api/appwrite.config.js";
import { Query } from "appwrite";
import { CheckCircle, Clock } from "lucide-react"; // Icons
import Popup from "reactjs-popup";
import profilePicDefault from "../../assets/miku.jpg";

function UserAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [localUserData, setLocalUserData] = useState(null);
  const [planStatus, setPlanStatus] = useState("checking");
  const [profilePic, setProfilePic] = useState(profilePicDefault); // Default profile pic
  const [userid, setuserid] = useState("");
  const [domainName, setDomianName] = useState("");

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const PREF_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PREF_COLLECTION_ID;
  const PROFILE_PICTURE_BUCKET_ID = import.meta.env
    .VITE_APPWRITE_PROFILE_PICTURE_BUCKET_ID;
  const userID = JSON.parse(localStorage.getItem("user"))?.$id;

  // Fetch User Preferences
  const fetchPrefs = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PREF_COLLECTION_ID,
        [Query.equal("userid", userID)],
      );

      if (response.documents.length > 0) {
        const userPlan = response.documents[0].usedFreeTrial;
        setPlanStatus(userPlan ? "active" : "expired");
      } else {
        setPlanStatus("expired");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setPlanStatus("expired");
    }
  };

  // Fetch User Details
  const getUser = async () => {
    try {
      const userData = await account.get();
      setEmail(userData.email);
      setUsername(userData.name || "");
      setuserid(userData.$id);
      setLocalUserData(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
    fetchPrefs();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.removeItem("loggedIn");
      toast.success("Successfully signed out!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // Update Email
  const updateEmail = async () => {
    if (!password) {
      toast.error("Please enter your password to update the email.");
      return false;
    }
    try {
      await account.updateEmail(email, password);
      toast.success("Email updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update email:", error);
      toast.error("Failed to update email");
      return false;
    }
  };

  // Update Password
  const updatePassword = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return false;
    }
    try {
      await account.updatePassword(newPassword);
      toast.success("Password updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password");
      return false;
    }
  };

  // Update Username
  const updateUsername = async () => {
    try {
      const result = await account.updateName(username);
      setUsername(result.name);
      toast.success("Username updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update username:", error);
      toast.error("Failed to update username");
      return false;
    }
  };

  // Save Changes
  const handleSave = async () => {
    try {
      let hasUpdates = false;

      // Check if username is changed and not empty
      if (username && username !== localUserData?.name) {
        const usernameUpdated = await updateUsername();
        hasUpdates = hasUpdates || usernameUpdated;
      }

      // Check if email is changed and not empty
      if (email && email !== localUserData?.email && password) {
        const emailUpdated = await updateEmail();
        hasUpdates = hasUpdates || emailUpdated;
      }

      // Check if new password is provided
      if (newPassword) {
        const passwordUpdated = await updatePassword();
        hasUpdates = hasUpdates || passwordUpdated;
      }

      if (hasUpdates) {
        toast.success("Profile updated successfully");
        // Clear fields after successful update
        setPassword("");
        setNewPassword("");
        // Refresh user data
        getUser();
      } else if (!username && !email && !newPassword) {
        toast.info("No changes were made to your profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  console.log(userid);
  // function to handle file upload
  const profilePicUpload = async (e) => {
    try {
      const promise = storage.createFile(
        PROFILE_PICTURE_BUCKET_ID,
        userid,
        fileUrl,
      );
      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Profile Picture Upload (Locally)
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local URL for the uploaded image file
    const fileUrl = URL.createObjectURL(file);

    // Update the profile picture state with the local URL
    setProfilePic(fileUrl);
  };
  const getDomain = () => {
    const domain = window.location.href;
    console.log(domain);
  };
  useEffect(() => {
    getDomain();
  }, []);
  console.log(profilePic);
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

          {/* Profile Picture */}
          <div>
            <p className="text-light-blue-400 font-bold mb-4">
              Profile picture
            </p>
            <Popup
              trigger={
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-4 ml-0 cursor-pointer hover:opacity-80 transition"
                />
              }
              modal
              nested
            >
              {(close) => (
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    Change Profile Picture
                  </h2>

                  {/* Default image */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={profilePicDefault}
                      alt="Default Profile"
                      className="w-20 h-20 rounded-full cursor-pointer hover:ring-4 hover:ring-blue-400 transition"
                      onClick={() => {
                        setProfilePic(profilePicDefault);
                        close();
                      }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="text-gray-400 text-center my-4">
                    or upload your own
                  </div>

                  {/* File Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                  />

                  {/* Cancel button */}
                  <button
                    className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </Popup>
          </div>

          <div className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center gap-4">
            {planStatus === "expired" ? (
              <>
                <CheckCircle className="text-light-blue-400 w-6 h-6" />
                <span className="text-lg font-semibold text-light-blue-800">
                  Free Plan
                </span>
              </>
            ) : planStatus === "active" ? (
              <>
                <CheckCircle className="text-green-500 w-6 h-6" />
                <span className="text-lg font-semibold text-green-600">
                  Free Trial Active
                </span>
              </>
            ) : planStatus === "checking" ? (
              <>
                <Clock className="text-yellow-500 w-6 h-6 " />
                <span className="text-lg font-semibold text-yellow-600">
                  Checking Plan...
                </span>
              </>
            ) : null}
          </div>

          {/* Profile Settings */}
          <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
          <div className="mb-4 block text-gray-700 font-medium">
            <a>Current Email: {localUserData?.email}</a>
          </div>
          <div className="mb-4 block text-gray-700 font-medium">
            <a>Current Username: {localUserData?.name}</a>
          </div>

          {localUserData && !localUserData.passwordUpdate ? (
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                <label className="block text-gray-700 mt-3">New Username</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={handleSave}
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

export default UserAccount;
