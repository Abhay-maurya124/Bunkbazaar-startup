import React, { useContext, useReducer, useState } from "react";
import student from "../Assets/student.png";
import { IoIosPerson } from "react-icons/io";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { PiArrowDownBold, PiContactlessPaymentFill } from "react-icons/pi";
import { GiTrade } from "react-icons/gi";
import { Contextprovider } from "../../NewContext/NewContext";
import { Link } from 'react-router-dom'

const Hero = () => {
  const faq = [
    {
      "id": 1,
      "question": "What is bunkBazzar?",
      "answer": "bunkBazzar is a secure marketplace designed for fast, trustworthy connections between buyers and sellers, featuring integrated escrow payments."
    },
    {
      "id": 2,
      "question": "How does the Escrow Payment system work?",
      "answer": "When you make a purchase, your funds are held securely by bunkBazzar. The payment is only released to the seller once you confirm you have received the service or product."
    },
    {
      "id": 3,
      "question": "Is it safe to trade with 'others' outside the platform?",
      "answer": "We recommend staying within bunkBazzar to ensure you are protected by our Escrow system and verified user ratings, which 'others' often lack."
    },
    {
      "id": 4,
      "question": "How fast are the transactions processed?",
      "answer": "Most transactions are instant. Once both parties agree and the payment is secured, the connection is established immediately."
    },
    {
      "id": 5,
      "question": "Are there any hidden fees?",
      "answer": "No. bunkBazzar prides itself on transparency. All pricing is shown upfront before you commit to a transaction."
    },
    {
      "id": 6,
      "question": "What happens if a seller doesn't deliver?",
      "answer": "If a seller fails to meet the agreed terms, you can open a dispute. Our support team will review the case and refund your escrowed funds if necessary."
    },
    {
      "id": 7,
      "question": "How do I become a verified seller?",
      "answer": "You can apply for verification in your account settings by providing the necessary documentation to prove your identity and reliability."
    },
    {
      "id": 8,
      "question": "Can I use bunkBazzar on my mobile device?",
      "answer": "Yes, our platform is fully optimized for mobile browsers, allowing you to manage your trades on the go."
    },
    {
      "id": 9,
      "question": "How does bunkBazzar maintain 'Low Price' guarantees?",
      "answer": "By reducing the middleman costs and streamlining the connection process, we pass those savings directly to our users."
    },
    {
      "id": 10,
      "question": "How do I contact customer support?",
      "answer": "Our support team is available 24/7 via the 'Help' dashboard or through our official discord and email channels."
    }
  ]
  console.log(faq[0])
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


  const [drop, setdrop] = useState(-1)
  const handledrop = (index) => {
    setdrop(drop === index ? -1 : index)
  }

  return (
    <>
      {/* ---------- Hero Introduction ---------- */}
      <div className="grid h-[84vh] grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-[#faecb8] to-[#fff] p-8 gap-6">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            The #1 Campus Marketplace
            <span className="block text-2xl md:text-4xl font-medium text-slate-700 mt-2">
              Turn your idle gear into student gold.
            </span>
          </h1>

          <div className="inline-flex text-6xl items-center bg-amber-400 px-6 py-2 rounded-full shadow-md transform -rotate-1">
            <span className="uppercase font-bold">Bunk</span>
            <span className="italic font-light ml-1">Bazaar</span>
          </div>

          <p className="text-lg text-slate-600 max-w-lg">
            Buy and sell within your verified college community — safe, local,
            and made for the student hustle.
          </p>

          <div className="flex gap-6 text-lg font-bold">
            <button className="bg-yellow-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition hover:scale-95">
              Explore Items
            </button>
            <button className="bg-yellow-200  px-5 py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-95">
              Start Your Business
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img src={student} alt="Student marketplace illustration" className="w-full max-w-md" />
        </div>
      </div>

      {/* ---------- Why Us Section ---------- */}
      <div className="bg-[#f9efcc] py-12 px-6 h-[45vh]">
        <h2 className="text-4xl md:text-5xl font-bold underline text-center mb-10">
          Why Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <IoIosPerson />
            </div>
            <div>
              <h3 className="text-2xl font-bold">100k+</h3>
              <p className="text-lg font-medium">Users</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <FaShoppingCart />
            </div>
            <div>
              <h3 className="text-2xl font-bold">10X</h3>
              <p className="text-lg font-medium">Faster Liquidity</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="text-[#FF6500] text-6xl p-2 border-2 borderlack rounded-2xl">
              <PiContactlessPaymentFill />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Escrow</h3>
              <p className="text-lg font-medium">Secure Payment</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md">
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
      {/* table */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold m-5 tracking-wide">How we are diffrent From others?</h2>
        <div className="overflow-hidden  shadow-sm px-40">
          <table className="border-collapse w-[70vw] text-center text-xl md:text-2xl m-10">
            <thead>
              <tr className="bg-yellow-400 text-black">
                <th className="p-6 font-bold border border-slate-300">Features</th>
                <th className="p-6 font-bold border border-slate-300 bg-yellow-500/20">bunkBazzar</th>
                <th className="p-6 font-bold border border-slate-300">Others</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border border-slate-200 font-medium text-slate-700">Fast Delivery</td>
                <td className="p-6 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-6 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border border-slate-200 font-medium text-slate-700">Trustworthy</td>
                <td className="p-6 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-6 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border border-slate-200 font-medium text-slate-700">Low Price</td>
                <td className="p-6 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-6 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border border-slate-200 font-medium text-slate-700">Connection</td>
                <td className="p-6 border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-6 border border-slate-200 text-slate-500">Low</td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6  border border-slate-200 font-medium text-slate-700">Escrow Payment</td>
                <td className="p-6  border border-slate-200 font-semibold text-green-600 bg-yellow-50/30">Great</td>
                <td className="p-6  border border-slate-200 text-slate-500">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* frequently asked question */}

      <div className="max-w-3xl mx-auto my-10  space-y-2">
        <h2 className="text-3xl font-bold text-center  p-10">Frequently asked question</h2>
        {faq.map((val, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {/* Header Container */}
            <div
              className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => handledrop(idx)}
            >
              <h3 className="font-semibold text-slate-800 text-lg leading-tight">
                {val.question}
              </h3>
              <span className={`text-2xl font-light text-slate-400 transform transition-transform duration-300 ${drop === idx ? 'rotate-45 text-yellow-500' : 'rotate-0'}`}>
                +
              </span>
            </div>

            {/* Answer Paragraph */}
            <p className={`px-4 pb-4 text-slate-600 leading-relaxed transition-all duration-300 ${drop === idx ? 'block opacity-100' : 'hidden opacity-0'}`}>
              {val.answer}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hero;
