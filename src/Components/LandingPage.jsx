// LandingPage.jsx
import React from 'react';
import Navbar from './Navbar';
import { useSiteMode } from './Context';
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { siteMode } = useSiteMode();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("signup"); 
  };
  return (
    <div
    className={`flex flex-col h-screen ${
      siteMode === "dark"
        ? "bg-gradient-to-tr from-[#121e26] via-[#12100E] to-[#113853] text-white"
        : "bg-gradient-to-tr from-[#f0f4f8] via-[#f9fafb] to-[#e6eaf2] text-black"
    }`}
  >
      <div className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-green-400">One stop</span> solution for dev's doubts
        </h2>
        <p className="text-gray-400 max-w-2xl mb-8">
          Inquiro helps programmers and developers at <span className={`${siteMode === 'dark' ? ' text-white' : 'bg-white text-gray-500'}`}>any point of the learning curve</span> to 
          easily understand and tackle their problems with a skilled community.
        </p>
        <div className="flex space-x-4">
          <button className={`py-2 px-6 rounded-md cursor-pointer font-medium ${siteMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            Get Started
          </button>
          <button onClick={handleNavigation} className={`py-2 px-6 cursor-pointer rounded-md font-medium ${siteMode === 'dark' ? 'bg-transparent border border-white text-white' : 'bg-transparent border border-black text-black'}`}>
            Sign into Account
          </button>
        </div>
      </div>
      <div className="px-4 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-12">
          What is InQuiro? <span className="text-gray-400 font-normal text-lg">Your everyday doubt-solving community</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">User Friendly</h4>
            <p className="text-gray-400">Get the best experience here, away from boring pages.</p>
          </div>

          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">Interactive Community</h4>
            <p className="text-gray-400">Connect and interact with like-minded developers.</p>
          </div>

          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">Effective Answers</h4>
            <p className="text-gray-400">Get precise and valuable answers from the community.</p>
          </div>

          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">Create Groups</h4>
            <p className="text-gray-400">Form or join groups to discuss and solve coding challenges.</p>
          </div>

          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">Language Control</h4>
            <p className="text-gray-400">Switch languages to match your preference and comfort.</p>
          </div>
          <div className={`rounded-lg p-6 ${siteMode === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
            <h4 className="text-xl font-bold mb-3">Security</h4>
            <p className="text-gray-400">Your data and interactions are securely managed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
