import React from "react";

const Pagination = ({ setpage, setslice, page }) => {
  const handleIncrement = () => {
    setpage((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setpage((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      <button
        onClick={handleDecrement}
        className="
          bg-red-500 text-white
          px-3 py-2 rounded-lg
          font-semibold text-xl
          transition-colors duration-200
          hover:bg-red-600
          disabled:bg-gray-300 disabled:text-gray-500
        "
        disabled={page <= 1}
      >
        —
      </button>

      <p className="text-xl font-bold text-gray-800">{page}</p>
      <button
        onClick={handleIncrement}
        className="
          bg-green-500 text-white
          px-4 py-2 rounded-lg
          font-semibold text-xl
          transition-colors duration-200
          hover:bg-green-600
        "
      >
        +
      </button>
    </div>
  );
};

export default Pagination;
