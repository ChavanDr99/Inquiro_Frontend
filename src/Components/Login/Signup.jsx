import React, { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/Login.json";
import { Link } from "react-router-dom";
import { useSiteMode } from "../Context.jsx";
import { Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../Navbar.jsx";

const Signup = () => {
  const { siteMode } = useSiteMode(); // Get dark/light mode state
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signup attempt:", formData);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        siteMode === "dark"
          ? "bg-gradient-to-tr from-[#121e26] via-[#12100E] to-[#113853] text-white"
          : "bg-gradient-to-tr from-[#f0f4f8] via-[#f9fafb] to-[#e6eaf2] text-black"
      }`}
    >
      <Navbar />


      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-12 space-y-8 md:space-y-0 md:space-x-30">
        
        <div className="w-full md:w-[500px]">
          <div
            className={`p-8 md:p-12  mt-5 rounded-2xl shadow-2xl  transition-all duration-300 ${
              siteMode === "dark"
                ? "bg-gradient-to-tr dark:from-[#121e40] dark:via-[#12110E] dark:to-[#113753]"
                : "bg-white border-gray-300"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    siteMode === "dark"
                      ? "bg-[#2c3e50] text-white border-gray-700"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    siteMode === "dark"
                      ? "bg-[#2c3e50] text-white border-gray-700"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    siteMode === "dark"
                      ? "bg-[#2c3e50] text-white border-gray-700"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    siteMode === "dark"
                      ? "bg-[#2c3e50] text-white border-gray-700"
                      : "border-gray-300"
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white  py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Create Account
              </button>
            </form>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-t dark:border-gray-700" />
              <span className="mx-4 text-gray-500">or</span>
              <hr className="flex-grow border-t dark:border-gray-700" />
            </div>
            <button
              className="w-full flex items-center placeholder-gray-400 justify-center border rounded-lg py-3 text-gray-700 dark:text-white dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
            >
              <FcGoogle className="text-xl mr-3" />
              Continue with Google
            </button>

            <div className="text-center mt-6">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[500px]">
          <Lottie
            animationData={loginAnimation}
            className="w-full h-full transform transition-all duration-300 hover:scale-[1.05]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
