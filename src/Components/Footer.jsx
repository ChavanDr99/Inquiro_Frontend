import React from "react";
import { useSiteMode } from "./Context";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  const { siteMode } = useSiteMode();

  return (
    <footer
      className={`w-full py-15 px-4 md:px-12 transition-all duration-300 ${
        siteMode === "dark"
          ? "bg-[#1B1B1B] text-white "
          : "bg-[#f8fafc] text-black bg-gray-200 "
      }`}
    >
      <div className="max-w-6xl  mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">InQuiro</h2>
          <p className="text-sm text-gray-600">Your everyday doubt-solving community.</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className={`p-2 rounded-full transition-all ${
                siteMode === "dark"
                  ? "bg-gray-700 hover:bg-green-400"
                  : "bg-gray-300 hover:bg-green-500"
              }`}
            >
              <Icon className="text-sm" />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-xs text-gray-600 text-center">
        © {new Date().getFullYear()} InQuiro. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
