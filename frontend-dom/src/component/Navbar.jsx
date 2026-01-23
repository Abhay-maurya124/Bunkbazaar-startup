import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='px-9 text-lg text-black   font-sans text-[#E0E5EB] bg-gradient-to-r from-[#55d]/50 to-[#3fbcfb]/50'>
            <nav className='flex justify-between items-center'>
                <div className='flex justify-between gap-5'>
                    <h3>BunkBazaar</h3>
                    <div>Location</div>
                </div>
                <input type="text" placeholder='Search' className='h-10 m-1 border-1 rounded-sm' />
                <div>
                    <ul className='flex justify-evenly gap-6'>
                        <Link to="/">Home</Link>
                        <Link to="/order">Products</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact" className=''>contact</Link>
                        <button className='border-1 px-2 w-full h-10 rounded-lg '>Login</button>
                        <button className='border-1 px-2 w-full h-10 rounded-lg '>Register</button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar