import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
const Navbar = () => {
    return (
        <div className='px-9 text-lg text-blue-100 font-semibold  font-sans  bg-gradient-to-r from-[#000]/80 to-[#04293b] sticky'>
            <nav className='flex justify-around items-center h-30'>
                <div className='flex  gap-5'>
                    <div className='flex items-center tracking-tighter'>
                        <img src={logo} alt="" className='h-20' />
                        <h3 className='text-yellow-400 text-4xl font-black tracking-tighter text-shadow-2xl'>Bunk <span className='text-amber-500'>Bazaar</span></h3>
                    </div>
                </div>
                <input type="text" placeholder='Search' className='h-10 w-90 px-3 mx-1 border-1 rounded-sm' />
                <div>
                    <ul className='flex justify-evenly items-center gap-6'>
                        <Link to="/">
                            <div>
                                Home
                            </div>
                        </Link>
                        <Link to="/order">
                            <div>
                                Products
                            </div>
                        </Link>
                        <Link to="/about">
                            <div>
                                customer
                            </div>
                        </Link>
                        <Link to="/career" className=''>
                            <div>
                                career
                            </div>
                        </Link>
                        <Link to="/business" className=''>
                            <div>
                                Business
                            </div>
                        </Link>
                        <Link to="/blog" className=''>
                            <div>
                                Blog
                            </div>
                        </Link>
                        <button className="w-full h-10 px-4 rounded-lg text-white bg-amber-500 hover:bg-amber-600 transition duration-200 ease-in-out">
                            Login
                        </button>

                        <button className="w-full h-10 px-4 rounded-lg border-2 hover:text-black hover:bg-amber-100 transition duration-200 ease-in-out">
                            Register
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar