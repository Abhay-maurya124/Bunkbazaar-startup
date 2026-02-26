import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Audio } from "react-loader-spinner";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUserShield, FaAngleDown } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    role: 'user' 
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    setloading(true);
    const res = await axios.post("http://localhost:3000/user/v3/register", formData);
    
    if (res.data.success) {
      toast.success("Success! Redirecting...");
      setTimeout(() => navigate('/verify'), 2500);
    }
  } catch (error) {
    const backendErrors = error.response?.data?.errors;
    const message = error.response?.data?.message;

    if (backendErrors && backendErrors.length > 0) {
      toast.error(backendErrors[0]);
    } else {
      toast.error(message || "Registration failed");
    }
  } finally {
    setloading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 font-sans">
      <ToastContainer theme="dark" />
      
      {loading ? (
        <div className='w-full max-w-md h-137.5 flex justify-center flex-col items-center bg-white border-4 border-dashed border-gray-900 rounded-[3rem] shadow-2xl'>
          <Audio height="80" width="80" color="#f59e0b" ariaLabel="loading" />
          <h3 className='text-2xl font-black mt-4 uppercase italic tracking-tighter'>Processing...</h3>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">Join the dashboard as a {formData.role}</p>
          </div>

          <form onSubmit={handlesubmit} className='space-y-4'>
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-amber-500" />
              <input type="text" name='username' placeholder="Username" value={formData.username} onChange={handlechange} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all" required />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-amber-500" />
              <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handlechange} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Phone */}
               <div className="relative">
                 <FaPhone className="absolute left-4 top-4 text-amber-500" />
                 <input type="number" name='phone' placeholder="Phone" value={formData.phone} onChange={handlechange} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
               </div>
               {/* Location */}
               <div className="relative">
                 <FaMapMarkerAlt className="absolute left-4 top-4 text-amber-500" />
                 <input type="text" name='location' placeholder="City" value={formData.location} onChange={handlechange} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
               </div>
            </div>

            {/* Role Selector */}
            <div className="relative">
              <FaUserShield className="absolute left-4 top-4 text-amber-500 z-10" />
              <select name="role" value={formData.role} onChange={handlechange} className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer relative">
                <option value="user">User Account</option>
                <option value="admin">Admin Account</option>
              </select>
              <FaAngleDown className="absolute right-4 top-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-amber-500" />
              <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handlechange} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all" required />
            </div>

            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-black py-4 rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/20 uppercase tracking-widest mt-4">
              Register Now
            </button>
          </form>

          <div className='flex items-center justify-center gap-2 text-gray-400 mt-6 text-sm'>
            <p>Already have an account?</p>
            <Link to='/login' className='text-amber-500 font-bold hover:underline transition-all'>Login Here</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;