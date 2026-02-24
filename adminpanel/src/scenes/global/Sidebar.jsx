import { BellDot, Menu, Search } from "lucide-react";
import React, { useContext, useState } from "react";
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

  const handleCartClick = () => {
    setOpenPanel((prev) => (prev === "cart" ? null : "cart"));
  };

  const handleMessageClick = () => {
    setOpenPanel((prev) => (prev === "message" ? null : "message"));
  };

  const handleNotificationClick = () => {
    setOpenPanel((prev) => (prev === "notification" ? null : "notification"));
  };

  const handleCloseMessage = () => {
    if (openPanel === "message") setOpenPanel(null);
  };

  return (
    <div
      className={`sticky top-0 z-30 h-14 p-4 border-b flex items-center ${
        Toggle === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-900 border-gray-700 text-white"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Left Side */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={Togglebg}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Toggle theme"
          >
            {Toggle === "light" ? (
              <FaMoon size={18} />
            ) : (
              <LuSunMedium size={18} />
            )}
          </button>
          <button
            onClick={sidecloser}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 rounded-lg text-sm w-40 md:w-64 ${
                Toggle === "light"
                  ? "bg-gray-100 focus:bg-white border border-gray-200"
                  : "bg-gray-700 focus:bg-gray-800 border-gray-600"
              }`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Cart Button */}
          <div className="relative">
            <button
              onClick={handleCartClick}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <IoCartOutline size={20} />
            </button>
            {openPanel === "cart" && <Cart />}
          </div>

          {/* Message Button */}
          <div className="relative">
            <button
              onClick={handleMessageClick}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <FaRegMessage size={18} />
            </button>
            {openPanel === "message" && (
              <Messege onClose={handleCloseMessage} />
            )}
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <BellDot size={20} />
            </button>
            {openPanel === "notification" && <Notification />}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 ml-2 sm:ml-4">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="Images/using-smartphone-woman.png"
              alt="User profile"
            />
            <span className="hidden sm:inline text-sm font-medium">Hi, Abhay</span>
            <FaAngleDown className="text-gray-400 hidden sm:block" size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
