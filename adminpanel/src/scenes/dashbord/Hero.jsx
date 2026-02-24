import React, { useContext } from 'react';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { GrCycle } from "react-icons/gr";
import { FaBox } from "react-icons/fa";
import LineGraph, { Areagraph } from '../global/LineGraph';
import { ThemeFunc } from '../assets/CreateApi';

const Card = [
  {
    icon: <FaPeopleGroup />,
    total: "12,721",
    percent: "+12%",
    title: "Customers"
  },
  {
    icon: <IoIosStats />,
    total: "5,432",
    percent: "+8%",
    title: "Sales"
  },
  {
    icon: <GrCycle />,
    total: "2,156",
    percent: "-3%",
    title: "Returns"
  },
  {
    icon: <FaBox />,
    total: "7,893",
    percent: "+15%",
    title: "Inventory"
  }
];

const Hero = () => {
  const { Toggle } = useContext(ThemeFunc);

  return (
    <div className=' sm:p-0 overflow-hidden w-full'>
      <div className={`flex flex-col sm:flex-row justify-center 
        items-center gap-6 shadow-xl rounded-2xl
         p-6 sm:p-0 sm:mx-4 md:mx-12 lg:mx-24 
         xl:mx-48 mb-8 m-0 
         ${Toggle === "light" ? "bg-white shadow-gray-200" : "bg-gray-900 shadow-gray-800 text-white"}`}>
        <div className='text-center sm:text-left sm:m-10 order-2 sm:order-1'>
          <p className='text-xl sm:text-3xl text-gray-600 dark:text-gray-300'>Earnings</p>
          <p className='text-2xl sm:text-4xl'>$64,448.78</p>
          <button className='bg-blue-900 p-2 sm:p-3 mt-4 sm:ml-0 rounded-2xl hover:bg-blue-600 transition-all text-white font-bold text-sm sm:text-base'>
            Download
          </button>
        </div>
        <img
          src="Images/using-smartphone-woman.png"
          alt="image"
          className='h-40 sm:h-52 md:h-65 order-1 sm:order-2'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0'>
        {Card.map((item, index) => (
          <div key={index} className={`p-8 h-23 rounded-lg shadow-md lg:m-3 flex justify-between items-center ${Toggle === "light" ? "bg-white" : "bg-gray-900 shadow-gray-800/70"}`}>
            <div className='text-2xl sm:text-3xl'>{item.icon}</div>
            <div className='flex gap-2 items-center'>
              <p className='text-base sm:text-lg font-bold'>{item.total}</p>
              <p className={`text-sm ${item.percent.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.percent}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 sm:mt-10'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-34 gap-4'>

          <p className='text-2xl sm:text-3xl font-bold'>Revenue Updates</p>
          <div className='flex gap-2 items-center text-lg sm:text-xl'>
            <label htmlFor='Expense'>Expense</label>
            <input name='Expense' type="radio" />
            <label htmlFor='Budget'>Budget</label>
            <input name='budget' type="radio" />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 mt-6 sm:mt-10 mx-0 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-48'>
          <div className='pl-4  py-4 flex flex-col justify-center'>
            <div className='flex flex-col sm:flex-row gap-8 mb-6'>
              <div className='text-xl sm:text-2xl font-bold'>
                <div className='flex gap-4 items-center'>
                  <p>$93,438</p>
                  <p className='text-sm font-normal bg-green-600 rounded-full p-1'>23%</p>
                </div>
                <p className='text-sm font-light'>Budget</p>
              </div>
              <div className='text-xl sm:text-2xl font-bold'>
                <p>$43,438</p>
                <p className='text-sm font-light'>Expense</p>
              </div>
            </div>
            <LineGraph />
            <button className='p-3 bg-blue-800 w-25 rounded-3xl mt-3 text-amber-50'>Download</button>
          </div>
          <div className='text-center '>
            <Areagraph />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;