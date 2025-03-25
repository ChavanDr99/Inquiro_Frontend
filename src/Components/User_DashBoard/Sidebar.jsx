import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Menu } from "lucide-react";
import { useSiteMode } from "../Context.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { siteMode } = useSiteMode();
  const bgColor = siteMode === "dark" 
    ? "bg-gradient-to-tr from-[#1a2634] via-[#162029] to-[#113853] text-gray-200"
    : "bg-white text-gray-900";
  const hoverColor = siteMode === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const activeColor = "bg-green-500 text-white";

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-[#0f172a] text-gray-200">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={toggleSidebar} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 min-h-screen p-6 flex flex-col shadow-lg z-30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex ${bgColor} pt-20 md:pt-6`} 
      >
        <button onClick={toggleSidebar} className="md:hidden absolute top-4 right-4 p-2 rounded-full ">
          ✕
        </button>

        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
              isActive ? activeColor : hoverColor
            }`}
          >
            <Home className="w-5 h-5 mr-3" /> Home
          </NavLink>

          <NavLink
            to="dashboard"
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
              isActive ? activeColor : hoverColor
            }`}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="manage"
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
              isActive ? activeColor : hoverColor
            }`}
          >
            <User className="w-5 h-5 mr-3" /> Manage Profile
          </NavLink>
        </nav>
      </div>

      {/* Overlay on Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
