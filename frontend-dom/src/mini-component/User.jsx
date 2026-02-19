import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosWallet } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircleOutline, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";
import { useCart } from '../NewContext/Cartcontext';
import { useProduct } from '../NewContext/NewContext';

const User = () => {
  const { cartstate } = useCart();
  const { Userdata } = useProduct();

  const username = Userdata?.[0]?.username || "Guest";
  const [toggle, settoggle] = useState(false);

  return (
    <div className="relative">
      <div className='hidden xl:flex items-center gap-6 font-semibold uppercase text-sm tracking-tight text-slate-700'>

        <Link to="/cart" className='group relative p-2.5 bg-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:text-amber-500'>
          <FaShoppingCart size={22} />
          <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white group-hover:scale-110 transition-transform'>
            {cartstate.length}
          </span>
        </Link>

        <Link to="/wallet" className='group relative p-2.5 bg-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:text-amber-500'>
          <IoIosWallet size={22} />
          <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white ring-2 ring-white group-hover:scale-110 transition-transform'>
            10
          </span>
        </Link>

        <div
          onClick={() => settoggle(!toggle)}
          className={`flex items-center gap-2 cursor-pointer p-1.5 pr-4 rounded-full transition-all duration-300 border 
            ${toggle ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 hover:border-amber-200 hover:bg-gray-50'}`}
        >
          <IoPersonCircleOutline size={32} />
          <span className="normal-case font-bold">{username}</span>
        </div>

        {toggle && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => settoggle(false)}></div>

            <div className='absolute z-20 top-16 right-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-in fade-in zoom-in duration-200'>
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account</p>
              </div>

              <Link to="/profile" className='flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors'>
                <IoPersonOutline size={18} />
                <span className="capitalize font-medium">My Profile</span>
              </Link>

              <Link to='/logout' className='flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors'>
                <IoLogOutOutline size={18} />
                <span className="capitalize font-medium">Logout</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;