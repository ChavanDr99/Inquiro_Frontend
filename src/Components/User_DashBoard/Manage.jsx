import React, { useState } from "react";
import { useSiteMode } from "../Context.jsx";
import { Edit, Save, User } from "lucide-react";

const ManageProfile = () => {
  const { siteMode } = useSiteMode(); // Get dark/light mode state

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  return (
    <div
      className={`flex justify-center items-center min- h-screen transition-all duration-300 ${
        siteMode === "dark"
          ? "bg-gradient-to-tr from-[#1e2a36] via-[#1a252f] to-[#1f3d55] text-gray-300"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-300 ${
          siteMode === "dark"
            ? "bg-gradient-to-tr from-[#1e2a36] via-[#1a252f] to-[#1f3d85] text-gray-300"
            : "bg-white border border-gray-300"
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Manage Profile</h1>

        {/* User Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-semibold mt-3">{name}</h2>
          <p className="text-sm text-gray-400">{email}</p>
        </div>

        {/* Profile Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className={`w-full p-3 rounded-md border transition-all duration-300 ${
                siteMode === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              } ${!isEditing && "opacity-60 cursor-not-allowed"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className={`w-full p-3 rounded-md border transition-all duration-300 ${
                siteMode === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              } ${!isEditing && "opacity-60 cursor-not-allowed"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Edit / Save Button */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-md text-white font-semibold transition-all duration-300 ${
              isEditing
                ? "bg-green-500 hover:bg-green-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
