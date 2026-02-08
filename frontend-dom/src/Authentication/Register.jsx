import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [Change, setChange] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handlechange = (e) => {
    const { name, value } = e.target
    setChange((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      await axios.post("http://localhost:3000/user/v3/register", Change, {
        'headers': {
          'Content-Type': 'application/json',
        },
      })
      navigate('/verify')
    } catch (error) {
      console.error("Registration Error:", error.response ? error.response.data : error.message);
    }
    finally {
      setloading(false)
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {loading ? 'wait some second' : <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register Now
        </h1>
        <div className='space-y-4'>
          <input
            type="text"
            placeholder="Username"
            required
            name='username'
            value={Change.username}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="email"
            placeholder="email"
            required
            name='email'
            value={Change.email}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            name='password'
            value={Change.password}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          />

        </div>
        <button
          onClick={handlesubmit} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition duration-200"
        >
          Register
        </button>
         </div>}
    </div>
  )
}

export default Register
