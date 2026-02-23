import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Contextprovider, useProduct } from '../NewContext/NewContext';

const Login = () => {
  const navigate = useNavigate()
  const { userdata, fetchUser } = useProduct()

  const [Change, setChange] = useState({
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

    const toastId = toast.loading("Logging in...");
    try {
      const res = await axios.post('http://localhost:3000/user/v3/login', Change, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      if (res.data.success) {
        localStorage.setItem("accesstoken", res.data.accesstoken)
        localStorage.setItem("refreshtoken", res.data.refreshtoken)
        await fetchUser();
        toast.update(toastId, { render: "Welcome back!", type: "success", isLoading: false, autoClose: 2000 });
        if (userdata) {
          await userdata();
        }

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Try again";
      toast.update(toastId, { render: message, type: "error", isLoading: false, autoClose: 3000 });
    }
  }

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <ToastContainer theme="dark" limit={1} />
        <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Login Now
          </h1>
          <Link to={"/"} className="w-full px-4 py-3 mb-2 rounded-lg bg-red-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500"
          > go to home</Link>
          <form onSubmit={handlesubmit} className='space-y-4'>
            <input
              type="email"
              placeholder="Email"
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

            <button
              type="submit"
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <div className='flex gap-2 text-white mt-4'>
            <p>Don't have account?</p>
            <Link to='/register' className='text-amber-300 hover:underline'>Register here</Link>
          </div>
          <div className="flex justify-between mt-6 text-sm">
            <Link to="/forgetpassword" className="text-amber-400 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login