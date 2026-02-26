import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useProduct } from '../NewContext/NewContext';

const Login = () => {
  const navigate = useNavigate();
  const { userdata, fetchUser } = useProduct();

  const [change, setChange] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Logging in...');

    try {
      const res = await axios.post(
        'http://localhost:3000/user/v3/login',
        change,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        localStorage.setItem('accesstoken', res.data.accesstoken);
        localStorage.setItem('refreshtoken', res.data.refreshtoken);

        await fetchUser();

        toast.update(toastId, {
          render: 'Welcome back!',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });

        if (userdata) {
          await userdata();
        }

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Try again';

      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <ToastContainer theme="dark" limit={1} />

      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Login Now
        </h1>

        <Link
          to="/"
          className="block w-full text-center px-4 py-3 mb-4 rounded-lg bg-gray-800 hover:bg-red-700 text-white font-semibold transition"
        >
          Go to Home
        </Link>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={change.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />

          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={change.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white mt-6 text-sm">
          <div>
            <span>Don't have an account? </span>
            <Link to="/register" className="text-amber-300 hover:underline">
              Register here
            </Link>
          </div>

          <Link
            to="/forgetpassword"
            className="text-amber-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;