import React, { useEffect, useState } from 'react'
import student from '../Assets/student.png'
import { IoIosPerson } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { PiContactlessPaymentFill } from "react-icons/pi";
import { GiTrade } from "react-icons/gi";

const hero = () => {


  return (
    <>
      <div className=''>
        <div className='grid grid-cols-2'>
          <div className='p-11 bg-gradient-to-b  from-[#faecb8] to-[#fff]'>
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
              <button className="h-20  w-2xs rounded-4xl  hover:bg-amber-200 
            transition-all ease-in-out
            bg-gradient-to-r from-[#eee] to-[#333]
              focus:outline-none active:scale-95 ring-[#e0cc10]
              duration-500">
                Explore Items
              </button>

              <button className='h-20  w-2xs rounded-4xl  hover:bg-amber-200 
            transition-all ease-in-out
              focus:outline-none ring-4 active:scale-95 ring-[#e0cc10]
              duration-500'>Start Yours business</button>
            </div>
          </div>
          <div className='bg-gradient-to-b from-[#faecb8] to-[#fff] flex justify-center items-center'>
            <img src={student} alt="" />
          </div>
        </div>
        <div className='h-60 bg-gradient-to-b  from-[#f9efcc] to-[#fff] text-center flex flex-col justify-center '>
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

      </div>
    </>
  )
}

export default hero