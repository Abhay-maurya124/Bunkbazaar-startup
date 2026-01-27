import React, { useContext, useEffect, useState } from 'react'
import student from '../Assets/student.png'
import { IoIosPerson } from "react-icons/io";
import { FaDropbox, FaShoppingCart } from "react-icons/fa";
import { PiArrowDownBold, PiArrowElbowDownLeftBold, PiContactlessPaymentFill } from "react-icons/pi";
import { GiTrade } from "react-icons/gi";
import { Contextprovider } from '../../NewContext/NewContext';
import { FaSearch } from "react-icons/fa";
import Footer from './Footer';

const hero = () => {
  const [search, setsearch] = useState('')
  const { Product = [] } = useContext(Contextprovider);
  // const uniqueCategory = Product.map((item) => item.category)
  // const unique = [...new Set(uniqueCategory)];
  const slicedis = Product.map((item) => item.description)
  const slicediscription = slicedis.slice(10, 20);

  const filterproduct = Product.filter((item) => {
    const matchsearch = item.title.toLowerCase().includes(search.toLowerCase())

    return matchsearch;
  }).slice(10, 20);
  return (
    <>
      <div className=''>
        <div className='grid grid-cols-2'>
          <div className='p-11 bg-linear-to-b  from-[#faecb8] to-white'>
            <h1 className='text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight'>
              The #1 Campus Marketplace <br />
              <span className="text-3xl md:text-4xl font-medium text-slate-700 block mt-2">
                Turn your idle gear into student gold.
              </span>
              <div className='inline-flex items-center mt-6 px-6 py-2 bg-amber-400 rounded-full shadow-lg transform -rotate-1'>
                <span className='tracking-tighter uppercase'>Bunk</span>
                <span className='tracking-tighter font-light italic ml-1'>Bazaar</span>
              </div>
            </h1>
            <p className="mt-6 text-lg text-slate-600 font-medium max-w-2xl">
              Buy and sell within your verified college community. Safe, local, and built for the student hustle.
            </p>

            <div className='flex text-2xl mt-10 gap-3.5 font-bold'>
              <button className="inline-flex items-center gap-3 px-5 py-2 rounded-full font-semibold
                       bg-linear-to-r from-amber-400 to-yellow-300 text-slate-900
                       shadow-md hover:-translate-y-0.5 transition-transform focus:outline-none
                       focus:ring-4 focus:ring-amber-200">
                Get Started
              </button>

              <button className='h-20  w-2xs rounded-4xl  hover:bg-amber-200 
            transition-all ease-in-out
              focus:outline-none ring-4 active:scale-95 ring-[#e0cc10]
              duration-500'>Start Yours business</button>
            </div>
          </div>
          <div className='bg-linear-to-b from-[#faecb8] to-white flex justify-center items-center'>
            <img src={student} alt="" />
          </div>
        </div>
        <div className='h-60 bg-linear-to-b  from-[#f9efcc] to-white text-center flex flex-col justify-center '>
          <h2 className='text-4xl font-black m-5 underline ml-30'>Why us</h2>
          <div className='grid grid-cols-4 gap-1.5 text-4xl font-black'>
            <div className='flex justify-center text-center border-r-2 gap-4'>
              <div className='text-[#FF6500] border-black p-1 text-6xl border-2 transition-all ease-in-out duration-500 rounded-2xl hover:scale-96'><IoIosPerson /></div>
              <div>
                <h3>100k+</h3>
                <p className='text-2xl text-left font-bold'>Users</p>
              </div>
            </div>
            <div className='flex justify-center text-center border-r-2 gap-4'>
              <div className='text-[#FF6500] border-black p-1 text-6xl border-2 transition-all ease-in-out duration-500 rounded-2xl hover:scale-96'><FaShoppingCart /></div>
              <div>
                <h3>10X</h3>
                <p className='text-2xl text-left font-bold'>Faster Liquidity</p>
              </div>
            </div>
            <div className='flex justify-center text-center border-r-2 gap-4'>
              <div className='text-[#FF6500] border-black p-1 text-6xl border-2 transition-all ease-in-out duration-500 rounded-2xl hover:scale-96'><PiContactlessPaymentFill /></div>
              <div>
                <h3>Eascrow </h3>
                <p className='text-2xl text-left font-bold'>Payment</p>
              </div>
            </div>
            <div className='flex justify-center text-center border-r-2 gap-4'>
              <div className='text-[#FF6500] border-black p-1 text-6xl border-2 transition-all ease-in-out duration-500 rounded-2xl hover:scale-96'><GiTrade /></div>
              <div>
                <h3>trusted</h3>
                <p className='text-2xl text-left font-bold'>sellers</p>
              </div>
            </div>
          </div>
        </div>
        <div className='  text-center '>
          <h2 className='text-5xl font-bold my-7'>Some Popular search's</h2>
          <div className='flex items-center justify-center mx-50  gap-2 my-2'>
            <input type="text" className='border rounded w-full h-10 outline-none px-10 text-lg'
              value={search}
              onChange={(e) => setsearch(e.target.value)} />
            <p className='h-10 text-3xl text-center p-4 rounded-lg py-1'><FaSearch /></p>
          </div>

          {/* all type of category  */}

          {/* <div className="w-full h-40  overflow-none px-40 text-center">
            <div
              className="flex flex-wrap gap-4 py-4 px-6 whitespace-nowrap justify-center">
              {unique.length > 0 &&
                unique.map((item, idx) => (
                  <div
                    onSelect={console.log("fuck u")}
                    key={idx}
                    className="bg-white text-lg font-medium text-gray-800 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <p>{item}</p>
                  </div>
                ))}
            </div>
          </div> */}
        </div>
        <div className="h-full mt-10 w-full  flex justify-center items-start p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 text-center">
            {filterproduct.map((item, idx) => (
              <div key={idx} className=" rounded-3xl shadow-lg flex flex-col justify-center items-center p-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-40 w-40 object-cover mb-2"
                />
                <p className="text-2xl font-semibold">{item.title}</p>
                <p>
                  {slicediscription[idx].length > 60
                    ? slicediscription[idx].slice(0, 60) + "..."
                    : slicediscription[idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xl h-20 flex items-center justify-center">
          <p className='bg-linear-to-t  from-[#fbe07f] to-white w-120 text-center rounded-2xl'> Explore All <PiArrowDownBold /></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default hero