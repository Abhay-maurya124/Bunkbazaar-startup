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
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black px-3 md:px-12 py-3">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-2">
          {/* h-14 (56px) on mobile, back to md:h-16 (64px) for desktop */}
          <img src={logo} alt="Bunk Bazaar Logo" className="h-14 md:h-16 object-contain" />
          <Link to="/" className="group">
            {/* Kept your original logic: hidden on mobile, block on lg screens */}
            <h3 className="hidden lg:block text-slate-900 text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
              Bunk <span className="text-amber-500 group-hover:text-black transition-colors">bazaar</span>
            </h3>
          </Link>
        </div>

        {/* RIGHT SECTION: Spacing refactored for mobile vs desktop */}
        <div className="flex items-center gap-2 md:gap-8">
          
          {/* DESKTOP LINKS: Untouched original code */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 font-black uppercase text-sm tracking-tight text-slate-700">
              {links.map((l) => (
                <li key={l.to} className="hover:text-amber-500 transition-colors">
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* USER ICONS: Tight gap on mobile, wider on desktop */}
          <div className="flex items-center">
             <Authtoggle />
          </div>
          
          {/* HAMBURGER: Only shows when desktop links are hidden */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden p-2 rounded-md border-2 border-black bg-white active:bg-slate-100"
          >
            <svg className={`w-6 h-6 ${open ? 'rotate-90' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-6 pt-4 border-t-4 border-black bg-white mt-3">
          <ul className="flex flex-col gap-4 font-black uppercase text-lg tracking-tight text-slate-700">
            {links.map((l) => (
              <li key={l.to} onClick={() => setOpen(false)} className="hover:text-amber-500">
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;