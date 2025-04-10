import React, { useState } from "react";
import Navbar from './Navbar';
import { useSiteMode } from './Context';
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Footer from './Footer';

function LandingPage() {
  const { siteMode } = useSiteMode();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const handleNavigation = () => {
    navigate("signup"); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const features = [
    { title: "User Friendly", description: "Get the best experience here, away from boring pages." },
    { title: "Interactive Community", description: "Connect and interact with like-minded developers." },
    { title: "Effective Answers", description: "Get precise and valuable answers from the community." },
    { title: "Create Groups", description: "Form or join groups to discuss and solve coding challenges." },
    { title: "Language Control", description: "Switch languages to match your preference and comfort." },
    { title: "Security", description: "Your data and interactions are securely managed." }
  ];

  return (
    <div
      className={`flex flex-col min-h-screen ${
        siteMode === "dark"
          // ? "bg-gradient-to-tr from-[#121e26] via-[#12100E] to-[#113853] text-gray-200"
          ? "bg-[#111111] text-gray-100"
          : "bg-gradient-to-tr from-[#f0f4f8] via-[#f9fafb] to-[#e6eaf2] text-black"
      }`}
    >
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-[url('./assets/img/astronaut-bg.png')] bg-no-repeat bg-center bg-auto flex flex-col items-center justify-center text-center h-[110vh]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-green-500">One stop</span> solution for dev's doubts
        </h2>
        <p className="max-w-2xl mb-8">
          Inquiro helps programmers and developers at any point of the learning curve to 
          easily understand and tackle their problems with a skilled community.
        </p>
        <div className="flex space-x-4">
          <button className={`py-2 px-6 rounded-md cursor-pointer border font-medium hover:bg-transparent ${siteMode === 'dark' ? 'bg-white text-black border-white hover:text-white' : 'bg-black text-white border-black hover:text-black'}`}>
            Get Started
          </button>
          <button onClick={handleNavigation} className={`py-2 px-6 cursor-pointer rounded-md font-medium ${siteMode === 'dark' ? 'bg-transparent border border-white text-white hover:bg-white hover:text-black' : 'bg-transparent border border-black text-black hover:bg-black hover:text-white'}`}>
            Sign into Account
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-12">
          What is InQuiro? <span className="text-[#737373] font-normal text-lg">Your everyday doubt-solving community</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.slice(0, window.innerWidth < 768 ? 3 : features.length).map((feature, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 shadow-lg transition-all duration-300 ${
                siteMode === 'dark' 
                  ? 'bg-[#1B1B1B] shadow-stone-950 border border-[#1B1B1B] hover:bg-[#111111] hover:border-green-500' 
                  : 'bg-gradient-to-r from-[#ffffff] to-[#f3f4f6] border-2 border-white shadow-gray-500 hover:border-green-500'
              }`}
            >
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-[#737373]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className={`mx-80 mt-10 ${
        siteMode === "dark"
          ? "text-[#404040]"
          : "text-gray-400"
      }`}
      >
      </hr>

      {/* Contact Us */}
      <div className="w-full px-4 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-12">
          Connect with us 
          <br></br>
          <span className="text-[#737373] font-normal text-lg">Report a bug / suggest improvements and more features</span>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-xl font-bold">
              <div className="w-full mt-5">
                <span className="w-full flex justify-content-start">
                  Name
                </span>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`text-xl font-normal w-full py-2 px-3 mt-2 border placeholder-gray-400 rounded-lg hover:ring-2 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  siteMode === "dark"
                    ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                    : "bg-gray-200 border-gray-200"
                }`}
                required
              />
            </div>
            <div>
              <div className="w-full mt-5">
                <span className="text-xl font-bold w-full flex justify-content-start">
                  Email
                </span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`text-xl font-normal w-full py-2 px-3 mt-2 border placeholder-gray-400 rounded-lg hover:ring-2 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  siteMode === "dark"
                    ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                    : "bg-gray-200 border-gray-200"
                }`}
                required
              />
              <div>
              <div className="w-full mt-5">
                <div className="text-xl font-bold w-full flex justify-content-start">
                  Bugs / Suggestions / Improvements 
                </div>
              </div>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                rows={4}
                className={`text-xl font-normal w-full py-2 px-3 mt-2 border placeholder-gray-400 rounded-lg hover:ring-2 hover:ring-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  siteMode === "dark"
                    ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                    : "bg-gray-200 border-gray-200"
                }`}
                required
              />
            </div>
            </div>
              <button
                type="submit"
                className="text-xl font-bold w-full mt-5 bg-green-600 text-white cursor-pointer py-2 px-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Submit feedback
              </button>
          </form>
        </h3>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
