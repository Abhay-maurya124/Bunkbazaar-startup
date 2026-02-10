import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosWallet } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const User = () => {
  return (
    <div>
      <div className='hidden xl:flex items-center gap-5 font-black uppercase text-sm tracking-tight text-slate-700'>

        <Link to="/cart" className='hover:text-amber-500 hover:bg-gray-100  p-2 rounded-full transition-all duration-300 shadow-md flex items-center justify-center'>
          <div className='relative flex items-center justify-center'>
            <FaShoppingCart size={30} />
            <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white'>
              1
            </span>
          </div>
        </Link>

        <Link to="/wallet" className='hover:text-amber-500 hover:bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-md flex items-center justify-center bg-white'>
          <div className='relative flex items-center justify-center'>
            <IoIosWallet size={30} />

            <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white'>
              10
            </span>
          </div>
        </Link>

        <div className='hover:text-amber-500 hover:bg-gray-100  p-2 rounded-full transition-all duration-300 shadow-md flex items-center justify-center'>
          <IoPersonCircleOutline size={30} />
        </div>

      </div>
    </div>
  )
}

export default User