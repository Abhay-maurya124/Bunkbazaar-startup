import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaPeopleGroup, FaUserCheck, FaGlobe } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";
import { IoIosStats } from "react-icons/io";
import LineGraph, { Areagraph } from '../global/LineGraph';
import { ThemeFunc } from '../assets/CreateApi';

const Hero = () => {
  const { Toggle } = useContext(ThemeFunc);
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    onlineNow: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // FIXED URL: Removed the double /admin/ and added credentials
        const { data } = await axios.get('http://localhost:3000/admin/stats', {
          withCredentials: true 
        }); 
        
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Dashboard Stats Error:", error.response?.data || error.message);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Define cards inside the render or memoize them to stay reactive to 'stats'
  const statCards = [
    { 
      icon: <FaPeopleGroup />, 
      total: stats.totalUsers?.toLocaleString() || 0, 
      title: "Total Users", 
      color: "text-blue-500",
      bgColor: "bg-blue-100/20"
    },
    { 
      icon: <FaUserCheck />, 
      total: stats.verifiedUsers?.toLocaleString() || 0, 
      title: "Verified", 
      color: "text-green-500",
      bgColor: "bg-green-100/20"
    },
    { 
      icon: <GrCycle />, 
      total: stats.onlineNow?.toLocaleString() || 0, 
      title: "Online Now", 
      color: "text-purple-500",
      bgColor: "bg-purple-100/20"
    },
    { 
      icon: <IoIosStats />, 
      total: "Active", 
      title: "Status", 
      color: "text-orange-500",
      bgColor: "bg-orange-100/20"
    },
  ];

  return (
    <div className='w-full p-4 md:p-6'>
      
      {/* --- TOP SECTION: EARNINGS BANNERS --- */}
      <div className={`flex flex-col md:flex-row items-center justify-between rounded-3xl p-8 mb-8 transition-colors duration-300 ${Toggle === "light" ? "bg-white shadow-sm border" : "bg-gray-800 text-white"}`}>
        <div className='space-y-4 text-center md:text-left'>
          <h2 className='text-lg font-medium opacity-70'>Earnings Overview</h2>
          <h1 className='text-4xl md:text-5xl font-bold'>$64,448.78</h1>
          <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl transition-all font-semibold shadow-lg shadow-indigo-500/30'>
            Download Report
          </button>
        </div>
        
        <div className='mt-6 md:mt-0'>
          <img 
            src="Images/using-smartphone-woman.png" 
            alt="Hero illustration" 
            className='h-48 md:h-60 object-contain drop-shadow-2xl' 
          />
        </div>
      </div>

      {/* --- MIDDLE SECTION: STAT CARDS --- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((item, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-2xl flex items-center gap-4 border transition-all hover:scale-[1.02] ${Toggle === "light" ? "bg-white border-gray-100 shadow-sm" : "bg-gray-800 border-gray-700 text-white"}`}
          >
            <div className={`p-4 rounded-xl text-3xl ${item.bgColor} ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className='text-2xl font-bold'>{item.total}</p>
              <p className='text-sm opacity-60 font-medium uppercase tracking-wider'>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM SECTION: CHARTS --- */}
      <div className={`mt-10 p-6 rounded-3xl border ${Toggle === "light" ? "bg-white" : "bg-gray-800 border-gray-700 text-white"}`}>
        <div className='flex items-center justify-between mb-8'>
          <h3 className='text-2xl font-bold'>Revenue Updates</h3>
          <div className='flex gap-2'>
            <span className='flex items-center gap-1 text-sm font-medium text-green-500'>
              <span className='h-2 w-2 rounded-full bg-green-500'></span> Budget
            </span>
            <span className='flex items-center gap-1 text-sm font-medium text-indigo-500'>
              <span className='h-2 w-2 rounded-full bg-indigo-500'></span> Expense
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Line Graph with Update Action */}
          <div className='lg:col-span-2'>
            <LineGraph />
            <div className='mt-6 flex justify-center lg:justify-start'>
               <button className='px-8 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'>
                  Update Data
               </button>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className='flex items-center justify-center border-l border-gray-100 dark:border-gray-700'>
            <Areagraph />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;