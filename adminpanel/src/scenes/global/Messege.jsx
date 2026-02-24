import React from "react";

const Messege = ({ onClose }) => {
  return (
    <div
      className="absolute lg:h-80 lg:w-60 h-60 w-60
        font-bold text-center text-3xl mt-5
         -ml-30 bg-neutral-50 p-6 pt-12 ease-in-out transition duration-200"
    >
      You don't have any message yet!
      <button
        onClick={onClose}
        className="bg-blue-500 rounded-2xl text-lg mt-3.5 px-4 py-2"
      >
        Close
      </button>
    </div>
  );
};

export default Messege;
