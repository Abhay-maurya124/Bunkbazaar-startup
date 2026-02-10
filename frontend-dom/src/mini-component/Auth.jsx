import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <button className="hidden sm:block px-6 py-2 rounded-xl font-black uppercase border-2 border-black hover:bg-slate-100 transition-all active:translate-y-1">
          <Link to="/login"> Login</Link>
        </button>

        <button className="px-6 py-2 rounded-xl font-black uppercase bg-amber-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-500 transition-all active:shadow-none active:translate-x-1 active:translate-y-1">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  )
}

export default Auth