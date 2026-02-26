import { BellDot, Menu, Search } from "lucide-react";
import React, { useContext, useState, useEffect, useRef } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import { ThemeFunc } from "../assets/CreateApi";
import { FaMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import Cart from "./Cart";
import Messege from "./Messege";
import Notification from "./Notification";

const Sidebar = () => {
  const { Toggle, Togglebg, sidecloser } = useContext(ThemeFunc);
  const [openPanel, setOpenPanel] = useState(null);
  const sidebarRef = useRef(null);

  // Close panel when clicking anywhere outside the dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePanel = (panelName) => {
    setOpenPanel((prev) => (prev === panelName ? null : panelName));
  };

  const handleClose = () => setOpenPanel(null);

  return (
    <div
      ref={sidebarRef}
      className={`sticky top-0 z-30 h-16 px-4 md:px-8 border-b flex items-center transition-colors duration-300 ${
        Toggle === "light"
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-gray-900 border-gray-700 text-white"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Left Side: Theme, Menu & Search */}
        <div className="flex items-center gap-2 sm:gap-6">
          <button
            onClick={sidecloser}
            className={`p-2 rounded-lg transition-colors ${
              Toggle === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
            }`}
          >
            <Menu size={22} />
          </button>

          <button
            onClick={Togglebg}
            className={`p-2 rounded-lg transition-colors ${
              Toggle === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
            }`}
          >
            {Toggle === "light" ? <FaMoon size={18} /> : <LuSunMedium size={20} className="text-yellow-400" />}
          </button>

          <div className="relative hidden lg:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search components..."
              className={`pl-10 pr-4 py-2 rounded-xl text-sm w-64 transition-all outline-none border ${
                Toggle === "light"
                  ? "bg-gray-50 focus:bg-white border-gray-200 focus:ring-2 focus:ring-indigo-100"
                  : "bg-gray-800 border-gray-600 focus:border-indigo-500"
              }`}
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-1 sm:gap-4">
          
          {/* Cart Dropdown */}
          <div className="relative">
            <button
              onClick={() => togglePanel("cart")}
              className={`p-2 rounded-full relative transition-colors ${
                Toggle === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              }`}
            >
              <IoCartOutline size={22} />
              <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            {openPanel === "cart" && <Cart onClose={handleClose} />}
          </div>

          {/* Message Dropdown */}
          <div className="relative">
            <button
              onClick={() => togglePanel("message")}
              className={`p-2 rounded-full relative transition-colors ${
                Toggle === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              }`}
            >
              <FaRegMessage size={18} />
              <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            {openPanel === "message" && <Messege onClose={handleClose} />}
          </div>

          {/* Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => togglePanel("notification")}
              className={`p-2 rounded-full relative transition-colors ${
                Toggle === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              }`}
            >
              <BellDot size={20} />
              <span className="absolute top-1 right-1 bg-orange-400 w-2 h-2 rounded-full animate-ping"></span>
            </button>
            {openPanel === "notification" && <Notification onClose={handleClose} />}
          </div>

          {/* User Profile */}
          <div className={`flex items-center gap-3 pl-4 ml-2 border-l ${Toggle === "light" ? "border-gray-200" : "border-gray-700"}`}>
            <div className="text-right hidden sm:block">
              <p className="text-xs opacity-50 font-bold">Admin</p>
              <p className="text-sm font-black">Abhay</p>
            </div>
            <div className="relative group cursor-pointer">
              <img
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
                src="Images/using-smartphone-woman.png"
                alt="User profile"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            </div>
            <FaAngleDown className="text-gray-400 hidden sm:block" size={14} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;