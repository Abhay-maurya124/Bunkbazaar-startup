import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import Authtoggle from '../mini-component/Authtoggle';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/order', label: 'Products' },
    { to: '/bussiness', label: 'Bussiness' },
    { to: '/career', label: 'Career' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black px-4 md:px-12 py-3">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Bunk Bazaar Logo" className="h-10 md:h-16" />
          <Link to="/" className="group">
            <h3 className="text-slate-900 text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
              Bunk <span className="text-amber-500 group-hover:text-black transition-colors">bazaar</span>
            </h3>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search campus gear..."
            className="w-full h-12 px-5 border-4 border-black rounded-xl font-bold placeholder:text-slate-400 focus:bg-amber-50 outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
          />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-black uppercase text-sm tracking-tight text-slate-700">
            {links.map((l) => (
              <li key={l.to} className="hover:text-amber-500 transition-colors cursor-pointer">
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Authtoggle />
        </div>

        <div className="flex items-center lg:hidden">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md border-2 border-black"
          >
            <svg className={`w-6 h-6 ${open ? 'rotate-90' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out ${open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="px-4 pb-4 pt-3 border-t-4 border-black bg-white">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search campus gear..."
              className="w-full h-11 px-4 border-4 border-black rounded-xl font-bold placeholder:text-slate-400 focus:bg-amber-50 outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none"
            />
          </div>

        
          <ul className="flex flex-col gap-3 font-black uppercase text-base tracking-tight text-slate-700">
            {links.map((l) => (
              <li key={l.to} onClick={() => setOpen(false)} className="py-2 px-2 hover:bg-amber-50 rounded-md">
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Authtoggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;      
