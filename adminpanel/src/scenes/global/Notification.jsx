// Notification.jsx
import React from "react";

const Notification = ({ onClose }) => {
  return (
    <div
      className="absolute lg:h-80 lg:w-60 h-60 
        font-bold text-center text-3xl mt-5 -ml-30
          bg-neutral-50 p-6 pt-12 ease-in-out transition duration-200"
    >
      No! Notification Yet!
      <p className="bg-blue-500 rounded-2xl text-lg mt-3.5 px-4 py-2 cursor-pointer">
        <button onClick={onClose}>Close</button>
      </p>
    </div>
  );
};

export default Notification;
