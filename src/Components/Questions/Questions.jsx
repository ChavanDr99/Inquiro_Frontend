import React, { useState } from "react";
import Navbar from '../Navbar';
import { useSiteMode } from '../Context';
import { useNavigate } from "react-router-dom";
import { Triangle, Bookmark, Edit, Trash2 } from "lucide-react";
import Footer from '../Footer';

function Questions() {
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

            <div className="container p-5 md:p-30 h-max mt-25 md:mt-5 md:h-max">
                <div className="flex h-max mb-5">
                    <div className="flex-1">
                        <h4 className="text-4xl font-bold mb-3">Questions</h4>
                    </div>
                    <div className="flex-none">
                        <button className={`py-2 px-6 rounded-md cursor-pointer font-medium hover:bg-transparent bg-green-500 ${siteMode === 'dark' ? 'text-black border-white hover:text-green-500 hover:ring-2 hover:ring-green-500' : 'text-white border-black hover:text-black'}`}>
                            Ask a question
                        </button>
                    </div>
                </div>
                <div
                    className="grid grid-flow-col grid-cols-1 grid-rows-4 gap-4 mt-auto"
                >
                    
                    <div
                        className={`rounded-lg p-6 shadow-lg flex flex-col md:flex-row cursor-pointer transition-all duration-300 p-10 gap-5 ${
                            siteMode === 'dark' 
                            ? 'bg-[#1B1B1B] shadow-stone-950 border border-[#1B1B1B] hover:bg-[#111111] hover:border-green-500' 
                            : 'bg-gradient-to-r from-[#ffffff] to-[#f3f4f6] border-2 border-white shadow-gray-500 hover:border-green-500'
                        }`}
                    >
                        <div className="flex md:flex-1 flex-cols-2 gap-3 md:gap-5">
                            <div className="flex justify-content-center align-items-center w-10">
                                <div className="grid grid-cols-1 grid-rows-3">
                                    <Triangle className="w-full mb-1 cursor-pointer"/>
                                    <span className="w-full text-lg font-bold text-center">
                                        5
                                    </span>
                                    <Triangle className="w-full mt-1 cursor-pointer rotate-180"/>
                                    <Bookmark className="w-full mt-5 cursor-pointer"/>
                                </div>
                            </div>
                            <div className="w-full">
                                <h4 className="text-3xl font-bold mb-3">How can we use Laravel with React?</h4>
                                <p className="text-[#737373]">So I am working on this project where I am using Laravel...</p>
                            </div>
                        </div>
                        <div className="flex-none w-full md:w-max">
                            <div className="w-full h-max grid grid-cols-2 md:grid-cols-1 md:grid-rows-1">
                                <div className="flex gap-2 my-auto md:ms-auto md:mb-3">
                                    <button className={`p-2 w-max h-max rounded-md cursor-pointer font-medium hover:bg-transparent bg-green-500 ${siteMode === 'dark' ? 'text-black border-white hover:text-green-500 hover:ring-2 hover:ring-green-500' : 'text-white border-black hover:text-black'}`}>
                                        <Edit />
                                    </button>
                                    <button className={`p-2 w-max h-max rounded-md cursor-pointer font-medium hover:bg-transparent bg-green-500 ${siteMode === 'dark' ? 'text-black border-white hover:text-green-500 hover:ring-2 hover:ring-green-500' : 'text-white border-black hover:text-black'}`}>
                                        <Trash2 />
                                    </button>
                                </div>
                                <div className="w-full ms-auto grid grid-cols-1 mt-auto">
                                    <div className="w-full text-end text-gray-500">
                                        Asked by:   
                                    </div>
                                    <div className="flex gap-2 place-content-end w-full">
                                        <div>
                                            <img className="rounded-full w-6 h-6 flex-none" src="./src\assets\img\initials.png" /> 
                                        </div>
                                        <div>
                                            John Doe
                                        </div>
                                    </div>
                                    <div className="w-full text-end text-gray-500">
                                        4 months ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Questions;