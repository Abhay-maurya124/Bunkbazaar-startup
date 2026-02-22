import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../NewContext/NewContext';
import { IoIosPerson } from "react-icons/io";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { PiContactlessPaymentFill, PiArrowDownBold } from "react-icons/pi";
import { GiTrade } from "react-icons/gi";
import student from "../Assets/student.png";
import Card from "../mini-component/Card"
import { useCart } from '../NewContext/Cartcontext';
const Home = () => {
  const faq = [
    { id: 1, question: "What is bunkBazzar?", answer: "bunkBazzar is a secure marketplace designed for fast, trustworthy connections between buyers and sellers, featuring integrated escrow payments." },
    { id: 2, question: "How does the Escrow Payment system work?", answer: "When you make a purchase, your funds are held securely by bunkBazzar. The payment is only released to the seller once you confirm you have received the service or product." },
    { id: 3, question: "Is it safe to trade with 'others' outside the platform?", answer: "We recommend staying within bunkBazzar to ensure you are protected by our Escrow system and verified user ratings." },
    { id: 4, question: "How fast are the transactions processed?", answer: "Most transactions are instant. Once both parties agree and the payment is secured, the connection is established immediately." },
    { id: 5, question: "Are there any hidden fees?", answer: "No. bunkBazzar prides itself on transparency. All pricing is shown upfront." },
  ];
  const { addtocart } = useCart()
  const { Products = [] } = useProduct();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [drop, setdrop] = useState(-1);

  const uniqueCategories = [...new Set(Products.map((item) => item.category))];
  const filteredProducts = Products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).slice(0, 4);

  const handledrop = (index) => setdrop(drop === index ? -1 : index);

  return (
    <div className="selection:bg-amber-300">
      <div className="grid min-h-[85vh] grid-cols-1 md:grid-cols-2 bg-linear-to-b from-[#faecb8] to-white px-6 md:px-28 py-12 gap-10 items-center">
        <div className="space-y-8">
          <div className="inline-block bg-white border-2 border-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            Trusted by 100k+ Students
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            THE #1 CAMPUS <br />
            <span className="text-amber-500 italic">MARKETPLACE</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-slate-700 max-w-lg border-l-4 border-black pl-4">
            Turn your idle gear into student gold. Safe, local, and made for the hustle.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-amber-500 hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] active:translate-y-1 active:shadow-none">
              EXPLORE ITEMS
            </button>
            <button className="bg-white border-4 border-black px-8 py-4 rounded-2xl font-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 active:translate-y-1 active:shadow-none">
              SELL GEAR
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-amber-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img src={student} alt="Student" className="relative w-full max-w-lg mx-auto drop-shadow-[20px_20px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>

      <div className="bg-white py-20 px-6">
        <h2 className="text-5xl font-black text-center mb-16 uppercase tracking-tighter italic underline decoration-amber-400 underline-offset-8">
          Why Bunk Bazaar?
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <IoIosPerson />, label: "100k+", sub: "Active Users" },
            { icon: <FaShoppingCart />, label: "10X", sub: "Faster Sales" },
            { icon: <PiContactlessPaymentFill />, label: "Escrow", sub: "Secure Pay" },
            { icon: <GiTrade />, label: "Verified", sub: "Campus Sellers" }
          ].map((feature, i) => (
            <div key={i} className="group p-8 bg-amber-50 border-4 border-black rounded-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="text-5xl mb-4 text-black group-hover:text-amber-600 transition-colors">{feature.icon}</div>
              <h3 className="text-3xl font-black">{feature.label}</h3>
              <p className="font-bold text-slate-600">{feature.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#faecb8] py-20 px-6 border-y-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8 uppercase">Find What You Need</h2>
          <div className="flex flex-col md:flex-row gap-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden border-4 border-black">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-8 py-5 text-xl outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-black text-white px-10 py-5 text-2xl hover:bg-slate-800 transition-colors">
              <FaSearch />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-6 py-2 rounded-xl border-2 border-black font-bold transition-all ${selectedCategory === "" ? "bg-black text-white shadow-none" : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-100"}`}
            >
              All
            </button>
            {uniqueCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl border-2 border-black font-bold transition-all ${selectedCategory === cat ? "bg-black text-white shadow-none" : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((item, idx) => (
            <Card key={item._id || idx} data={item} addtocart={addtocart} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/order" className="inline-flex items-center gap-3 text-2xl font-black bg-white border-4 border-black px-10 py-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 transition-all">
            EXPLORE ALL <PiArrowDownBold className="animate-bounce" />
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 py-24 px-6 text-white">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 uppercase italic">Why we beat the others</h2>
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b-4 border-white/20">
                <th className="p-6 text-2xl font-black italic">FEATURES</th>
                <th className="p-6 text-2xl font-black text-amber-400 italic">BUNK BAZAAR</th>
                <th className="p-6 text-2xl font-black text-slate-500 italic">OTHERS</th>
              </tr>
            </thead>
            <tbody className="font-bold text-xl">
              {["Fast Delivery", "Trustworthy", "Low Price", "Escrow Payment"].map((feat, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6">{feat}</td>
                  <td className="p-6 text-green-400 underline decoration-2">GREAT</td>
                  <td className="p-6 text-red-400/50">LOW</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-24 px-6">
        <h2 className="text-5xl font-black text-center mb-12 uppercase italic underline decoration-amber-400 underline-offset-8">FAQ</h2>
        <div className="space-y-4">
          {faq.map((val, idx) => (
            <div key={idx} className="border-4 border-black rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-amber-50 transition-colors"
                onClick={() => handledrop(idx)}
              >
                <h3 className="font-black text-xl uppercase tracking-tighter">{val.question}</h3>
                <span className={`text-3xl font-black transition-transform duration-300 ${drop === idx ? 'rotate-45 text-amber-500' : ''}`}>+</span>
              </div>
              <div className={`px-6 pb-6 text-lg font-medium text-slate-700 leading-relaxed transition-all duration-300 ${drop === idx ? 'block' : 'hidden'}`}>
                {val.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;