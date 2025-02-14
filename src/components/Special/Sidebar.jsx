import React from "react";
import PropTypes from "prop-types";
import { MdAccountCircle } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";

const SidebarItem = ({ icon: Icon, label }) => (
    <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
        <Icon size={20} />
        <span className="text-lg text-white">{label}</span>
    </li>
);

SidebarItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
};

const Sidebar = () => {
    const items = [
        { icon: MdAccountCircle, label: "User Account" },
        { icon: RiListSettingsFill, label: "App Preferences" },
        { icon: FaShieldAlt, label: "Privacy & Security" },
    ];

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 overflow-visible">
            <div className="p-5 text-xl font-semibold border-b border-gray-700">
                Settings
            </div>
            <ul className="space-y-1 mt-5 rounded-lg">
                {items.map((item, index) => (
                    <SidebarItem key={index} icon={item.icon} label={item.label} />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
