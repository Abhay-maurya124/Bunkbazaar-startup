import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import Authtoggle from '../mini-component/Authtoggle';

const Navbar = () => {

    return (
        <div className='sticky top-0 z-50 w-full bg-white border-b-4 border-black px-6 md:px-12 py-3'>
            <nav className='flex justify-between items-center max-w-360 mx-auto'>

                <div className='flex items-center gap-2'>
                    <img src={logo} alt="Bunk Bazaar Logo" className='h-12 md:h-16' />
                    <Link to='/' className="group">
                        <h3 className='text-slate-900 text-3xl md:text-4xl font-black tracking-tighter uppercase italic'>
                            market <span className='text-amber-500 group-hover:text-black transition-colors'>taste</span>
                        </h3>
                    </Link>
                </div>

                <div className='hidden lg:flex flex-1 max-w-md mx-10'>
                    <input
                        type="text"
                        placeholder='Search campus gear...'
                        className='w-full h-12 px-5 border-4 border-black rounded-xl font-bold placeholder:text-slate-400 focus:bg-amber-50 outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1'
                    />
                </div>

                <div className='flex items-center gap-8'>
                    <ul className='hidden xl:flex items-center gap-6 font-black uppercase text-sm tracking-tight text-slate-700'>
                        <li className='hover:text-amber-500 transition-colors cursor-pointer'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:text-amber-500 transition-colors cursor-pointer'>
                            <Link to="/order">Products</Link>
                        </li>
                        <li className='hover:text-amber-500 transition-colors cursor-pointer'>
                            <Link to="/bussiness">Bussiness</Link>
                        </li>
                        <li className='hover:text-amber-500 transition-colors cursor-pointer'>
                            <Link to="/career">Career</Link>
                        </li>
                        <li className='hover:text-amber-500 transition-colors cursor-pointer'>
                            <Link to="/blog">Blog</Link>
                        </li>
                    </ul>
                    <Authtoggle />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;