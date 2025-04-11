// Navbar.jsx
// import React from 'react';
// import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useSiteMode } from './Context';

// function Navbar() {
//   const { siteMode, setSiteMode } = useSiteMode();
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   // Toggle Theme
//   const toggleTheme = () => {
//     setSiteMode(siteMode === 'light' ? 'dark' : 'light');
//   };

//   // Toggle Mobile Menu
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={`w-full p-4 ${siteMode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} shadow-md`}>
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-green-400 text-2xl font-bold">InQuiro.</div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <a href="#" className="hover:text-green-400">Home</a>
//           <a href="#" className="hover:text-green-400">Categories</a>
//           <a href="#" className="hover:text-green-400">Questions</a>
//           <a href="#" className="hover:text-green-400">Leaderboard</a>
//           <a href="#" className="hover:text-green-400">Groups</a>
//           <button onClick={toggleTheme} className="ml-4 text-2xl">
//             {siteMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={toggleMenu} className="md:hidden text-2xl">
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Links */}
//       {isMenuOpen && (
//         <div className={`md:hidden mt-4 ${siteMode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}>
//           <a href="#" className="block py-2 hover:text-green-400">Home</a>
//           <a href="#" className="block py-2 hover:text-green-400">Categories</a>
//           <a href="#" className="block py-2 hover:text-green-400">Questions</a>
//           <a href="#" className="block py-2 hover:text-green-400">Leaderboard</a>
//           <a href="#" className="block py-2 hover:text-green-400">Groups</a>
//           <button onClick={toggleTheme} className="mt-2 text-2xl">
//             {siteMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSiteMode } from './Context';

function Navbar() {
  const { siteMode, setSiteMode } = useSiteMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setSiteMode(siteMode === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-[#111111]/75 backdrop-blur-md px-7 pt-6 pb-6 w-full p-4 shadow-md transition-all duration-300 fixed ${siteMode === 'dark' ? 'bg-dark text-white shadow-stone-950' : 'bg-white text-black shadow-gray-300'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-500 text-3xl ml-2 font-bold">InQuiro</div>

        {/* Desktop View */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-green-500">Home</Link>
          <Link to="#" className="hover:text-green-500">Categories</Link>
          <Link to="#" className="hover:text-green-500">Questions</Link>
          <Link to="#" className="hover:text-green-500">Leaderboard</Link>
          <Link to="#" className="hover:text-green-500">Groups</Link>

          {/* User Dashboard Icon */}
          <Link to="/Dash" className="text-2xl hover:text-green-500">
            <FaUserCircle />
          </Link>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="ml-2 mr-2 text-2xl">
            {siteMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-2xl">
            {siteMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <Link to="/Dash" className="text-2xl hover:text-[#7BF91A]">
            <FaUserCircle />
          </Link>
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-70 z-30">
          <div className={`fixed left-0 top-0 h-full w-64 ${siteMode === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'} shadow-lg`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-green-400 text-2xl font-bold">InQuiro.</span>
              <button
                onClick={toggleMenu}
                className="text-2xl hover:text-green-400 transition duration-300"
              >
                &times;
              </button>
            </div>
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/" className="text-lg font-medium hover:text-green-400">Home</Link>
              <Link to="#" className="text-lg font-medium hover:text-green-400">Categories</Link>
              <Link to="#" className="text-lg font-medium hover:text-green-400">Questions</Link>
              <Link to="#" className="text-lg font-medium hover:text-green-400">Leaderboard</Link>
              <Link to="#" className="text-lg font-medium hover:text-green-400">Groups</Link>
              <Link to="/Dash" className="text-2xl hover:text-green-400">
            <FaUserCircle />
          </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

