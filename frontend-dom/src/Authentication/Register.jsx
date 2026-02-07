import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const registration = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register Now
        </h1>
        <form onSubmit={registration} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm">
          <Link to="/forget-password" className="text-amber-400 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/change-password" className="text-amber-400 hover:underline">
            Change Password?
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register
