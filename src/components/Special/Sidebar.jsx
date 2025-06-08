import React from "react";
import PropTypes from "prop-types";
import { MdAccountCircle } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";
import { account } from "../../api/appwrite.config.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `navigate`

const SidebarItem = ({ icon: Icon, label, onClick }) => (
  <li
    className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer"
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="text-lg text-white">{label}</span>
  </li>
);

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const Sidebar = () => {
  const navigate = useNavigate(); // Correctly define navigate

  const handleSidebarClickOnUserAccount = async () => {
    try {
      const userData = await account.get();
      console.log(userData, "from sidebar.jsx");
      if (userData) {
        navigate(`/settings/account/${userData.$id}`); // Now navigate is properly defined
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  const handleSidebarClickOnAppPreferences = async () => {
    try {
      const userData = await account.get();
      console.log(userData, "from sidebar.jsx");
      if (userData) {
        navigate(`/settings/preferences/${userData.$id}`); // Now navigate is properly defined
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };
  const handleSidebarClickOnPrivacySecurity = async () => {
    try {
      const userData = await account.get();
      console.log(userData, "from sidebar.jsx");
      if (userData) {
        navigate(`/settings/privacy/${userData.$id}`); // Now navigate is properly defined
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  const items = [
    {
      icon: MdAccountCircle,
      label: "User Account",
      onClick: handleSidebarClickOnUserAccount,
    },
    {
      icon: RiListSettingsFill,
      label: "App Preferences",
      onClick: handleSidebarClickOnAppPreferences,
    },
    {
      icon: FaShieldAlt,
      label: "Privacy & Security",
      onClick: handleSidebarClickOnPrivacySecurity,
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 overflow-visible">
      <div className="p-5 text-xl font-semibold border-b border-gray-700">
        Settings
      </div>
      <ul className="space-y-1 mt-5 rounded-lg">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
