import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex justify-between px-9 text-xl bg-red-50 py-4 items-center'>
            <div className='flex justify-between gap-5'>
                <h3>BunkBazaar</h3>
                <div>Location</div>
            </div>
            <input type="text" placeholder='Search' className='w-full mx-3 px-7 border-1 rounded-sm' />
            <div>
                <ul className='flex justify-evenly'>
                    <Link to="/">Home</Link>
                    <Link to="/order">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">contact us</Link>
                    <button className='border-1   w-full rounded-lg'>Login</button>
                    <button className='border-1   w-full rounded-lg'>Register</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar