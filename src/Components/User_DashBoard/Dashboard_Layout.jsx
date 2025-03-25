import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        
        {/* Navbar - Always Full Width */}
        <Navbar />

        {/* Content Area */}
        <div className="flex-grow overflow-auto  bg-[#0f172a]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
