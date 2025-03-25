import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useSiteMode } from "../Context.jsx";
import { FileText, MessageCircle, Heart, Calendar } from "lucide-react";

const Dashboard = () => {
  const { siteMode } = useSiteMode(); 
  const activityData = [
    { name: "Jan", activity: 40 },
    { name: "Feb", activity: 60 },
    { name: "Mar", activity: 80 },
    { name: "Apr", activity: 20 },
    { name: "May", activity: 100 },
  ];

  const engagementData = [
    { name: "Jan", engagement: 50 },
    { name: "Feb", engagement: 75 },
    { name: "Mar", engagement: 30 },
    { name: "Apr", engagement: 90 },
    { name: "May", engagement: 120 },
  ];

  const contributionData = [
    { name: "Questions", value: 40 },
    { name: "Answers", value: 30 },
    { name: "Likes", value: 20 },
    { name: "Active Days", value: 10 },
  ];

  const COLORS = ["#4A90E2", "#50E3C2", "#F5A623", "#D0021B"];

  // User Statistics
  const stats = [
    {
      title: "Questions",
      icon: <FileText className="w-7 h-7 text-blue-500" />,
      value: Math.floor(Math.random() * 100),
    },
    {
      title: "Answers",
      icon: <MessageCircle className="w-7 h-7 text-green-500" />,
      value: Math.floor(Math.random() * 100),
    },
    {
      title: "Likes",
      icon: <Heart className="w-7 h-7 text-yellow-500" />,
      value: Math.floor(Math.random() * 100),
    },
    {
      title: "Active Days",
      icon: <Calendar className="w-7 h-7 text-red-500" />,
      value: Math.floor(Math.random() * 100),
    },
  ];

  return (
    <div
      className={`flex flex-col py-[3.7%] px-5 transition-all duration-300 ${
        siteMode === "dark"
          ? "bg-gradient-to-tr from-[#1e2a36] via-[#1a252f] to-[#1f3d55] text-gray-300"
          : "bg-[#f8fafc] text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md flex flex-col items-center transition-all duration-300 ${
              siteMode === "dark"
                ? "bg-[#1e293b] text-gray-300 border border-gray-700"
                : "bg-white text-gray-900 border border-gray-300"
            }`}
          >
            <div className="p-3 rounded-full bg-opacity-20 flex items-center justify-center">
              {stat.icon}
            </div>
            <h2 className="text-lg font-semibold mt-3">{stat.title}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        <div
          className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${
            siteMode === "dark"
              ? "bg-[#1e293b] border-gray-700 text-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">User Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={siteMode === "dark" ? "#333" : "#ddd"} />
              <XAxis dataKey="name" stroke={siteMode === "dark" ? "#bbb" : "#333"} />
              <YAxis stroke={siteMode === "dark" ? "#bbb" : "#333"} />
              <Tooltip />
              <Bar dataKey="activity" fill="#4A90E2" barSize={30} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

       
        <div
          className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${
            siteMode === "dark"
              ? "bg-[#1e293b] border-gray-700 text-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Monthly Engagement</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke={siteMode === "dark" ? "#333" : "#ddd"} />
              <XAxis dataKey="name" stroke={siteMode === "dark" ? "#bbb" : "#333"} />
              <YAxis stroke={siteMode === "dark" ? "#bbb" : "#333"} />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#50E3C2" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Contribution Pie Chart */}
        <div
          className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${
            siteMode === "dark"
              ? "bg-[#1e293b] border-gray-700 text-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Contribution Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={contributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {contributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
