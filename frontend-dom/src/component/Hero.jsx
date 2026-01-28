import React, { useContext, useReducer, useState } from "react";
import student from "../Assets/student.png";
import { IoIosPerson } from "react-icons/io";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { PiArrowDownBold, PiContactlessPaymentFill } from "react-icons/pi";
import { GiTrade } from "react-icons/gi";
import { Contextprovider } from "../../NewContext/NewContext";
import Footer from "./Footer";
import { Link } from 'react-router-dom'

const Hero = () => {
  const { Product = [] } = useContext(Contextprovider);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = [...new Set(Product.map((item) => item.category))];

  const filteredProducts = Product.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).slice(0, 9);


  const [drop, setdrop] = useState(false)
  const [noob, setnoob] = useState(false)
  const handledrop = () => {
    setdrop(prev => !prev)
  }
  const setxdrop = () => {
    setnoob(prev => !prev)
  }

  const [] = useReducer()

  return (
    <>
      {/* ---------- Hero Introduction ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-[#faecb8] to-[#fff] p-8 gap-6">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            The #1 Campus Marketplace
            <span className="block text-2xl md:text-4xl font-medium text-slate-700 mt-2">
              Turn your idle gear into student gold.
            </span>
          </h1>

          <div className="inline-flex items-center bg-amber-400 px-6 py-2 rounded-full shadow-md transform -rotate-1">
            <span className="uppercase font-bold">Bunk</span>
            <span className="italic font-light ml-1">Bazaar</span>
          </div>

          <p className="text-lg text-slate-600 max-w-lg">
            Buy and sell within your verified college community — safe, local,
            and made for the student hustle.
          </p>

          <div className="flex gap-4 text-lg font-bold">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
              Explore Items
            </button>
            <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">
              Start Your Business
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img src={student} alt="Student marketplace illustration" className="w-full max-w-md" />
        </div>
      </div>

      {/* ---------- Why Us Section ---------- */}
      <div className="bg-[#f9efcc] py-12 px-6">
        <h2 className="text-4xl md:text-5xl font-bold underline text-center mb-10">
          Why Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <IoIosPerson />
            </div>
            <div>
              <h3 className="text-2xl font-bold">100k+</h3>
              <p className="text-lg font-medium">Users</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <FaShoppingCart />
            </div>
            <div>
              <h3 className="text-2xl font-bold">10X</h3>
              <p className="text-lg font-medium">Faster Liquidity</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <PiContactlessPaymentFill />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Escrow</h3>
              <p className="text-lg font-medium">Secure Payment</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <GiTrade />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Trusted</h3>
              <p className="text-lg font-medium">Sellers</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Search & Category Filters ---------- */}
      <div className="text-center my-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Find What You Need</h2>

        <div className="flex justify-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products or description..."
            className="border px-4 py-2 w-80 rounded-lg text-lg outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl text-gray-600">
            <FaSearch />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full ${selectedCategory === "" ? "bg-gray-300" : "bg-white"
              }`}
          >
            All
          </button>
          {uniqueCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full ${selectedCategory === cat ? "bg-gray-300" : "bg-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Product Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 pb-12">
        {filteredProducts.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-40 w-40 object-cover mb-3"
            />
            <h3 className="text-2xl font-semibold text-center">
              {item.title}
            </h3>
            <p className="text-md text-gray-700 mt-2 text-center">
              {item.description.length > 60
                ? item.description.slice(0, 60) + "..."
                : item.description}
            </p>
            <button className="w-50 bg-amber-500 h-10 rounded-full m-3 bg-gradient-to-l from-[#ggg] to-[bbb]">Add to cart</button>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-xl text-gray-600">
            No items found.
          </p>
        )}
      </div>

      <div className="text-center mb-10">
        <Link to="/order" className="inline-flex items-center gap-2 text-xl bg-gradient-to-t from-[#fbe07f] to-[#fff] px-6 py-3 rounded-full cursor-pointer">
          Explore All <PiArrowDownBold />
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold m-5 tracking-wide">How we are diffrent From others?</h2>
        <div className="overflow-hidden  shadow-sm px-40">
          <table className="border-collapse w-[70vw] text-center text-xl m-10">
            <thead>
              <tr className="bg-yellow-400 text-black">
                <th className="p-4 font-bold border border-slate-300">Features</th>
                <th className="p-4 font-bold border border-slate-300 bg-yellow-500/20">bunkBazzar</th>
                <th className="p-4 font-bold border border-slate-300">Others</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200 font-medium text-slate-700">Fast Delivery</td>
                <td className="p-4 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-4 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200 font-medium text-slate-700">Trustworthy</td>
                <td className="p-4 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-4 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200 font-medium text-slate-700">Low Price</td>
                <td className="p-4 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-4 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border border-slate-200 font-medium text-slate-700">Connection</td>
                <td className="p-4 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-4 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4  border border-slate-200 font-medium text-slate-700">Escrow Payment</td>
                <td className="p-4  border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-4  border border-slate-200 text-slate-500">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black p-3">Got Question</h2>
        <div onClick={handledrop} className="bg-blue-100 w-3xl rounded-3xl my-10">
          <h3 className="cursor-pointer text-2xl font-mono font-medium text-center">Is this really safe</h3>
          <p className={`${drop ? 'h-30 visible' : 'h-10 hidden'} text-xl px-22  ease-in-out duration-300 transition-all`}>Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Accusantium temporibus ad reprehenderit
            quasi odio velit minima qui natus ducimus repellat!</p>
        </div>
        <div onClick={setxdrop} className="bg-blue-100 w-3xl rounded-3xl my-10">
          <h3 className="cursor-pointer text-2xl font-mono font-medium text-center">Is this really safe</h3>
          <p className={`${noob ? 'h-30 visible' : 'h-10 hidden'} text-xl px-22  ease-in-out duration-300 transition-all`}>Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Accusantium temporibus ad reprehenderit
            quasi odio velit minima qui natus ducimus repellat!</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
