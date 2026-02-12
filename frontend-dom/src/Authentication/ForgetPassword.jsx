import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const ResetPasswordWizard = () => {
    const navigate = useNavigate(); 
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        email: "",
        otp: "",
        newpassword: "",
        confirmpassword: ""
    });

    const handleSendOTP = async () => {
        try {
            await axios.post('http://localhost:3000/user/v3/forgetpassword', { email: data.email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (err) { toast.error(err.response?.data?.message || "Error sending OTP"); }
    };

    const handleVerifyOTP = async () => {
        try {
            await axios.post('http://localhost:3000/user/v3/verifyotp', { email: data.email, otp: data.otp });
            toast.success("OTP Verified!");
            setStep(3);
        } catch (err) { toast.error(err.response?.data?.message || "Invalid OTP"); }
    };

    const handleChangePassword = async () => {
        if (data.newpassword !== data.confirmpassword) return toast.error("Passwords do not match");

        try {
            const res = await axios.post('http://localhost:3000/user/v3/changepass', {
                email: data.email,
                newpassword: data.newpassword,
                confirmpassword: data.confirmpassword
            });

            if (res.data.success) {
                toast.success("Password Updated! Redirecting to Home...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-xl text-white">
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Find Your Account</h2>
                    <input name="email" type="email" placeholder="Enter Email" className="w-full p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-amber-500" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <button onClick={handleSendOTP} className="w-full bg-amber-500 cursor-pointer p-2 rounded text-black font-bold hover:bg-amber-600 transition-colors">Send OTP</button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Verify OTP</h2>
                    <p className="text-gray-400 text-sm">Sent to {data.email}</p>
                    <input name="otp" placeholder="6-Digit OTP" className="w-full p-2 bg-gray-800 rounded text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-amber-500" onChange={(e) => setData({ ...data, otp: e.target.value })} />
                    <button onClick={handleVerifyOTP} className="w-full bg-amber-500 p-2 rounded text-black font-bold hover:bg-amber-600 transition-colors">Verify</button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">New Password</h2>
                    <input type="password" placeholder="New Password" className="w-full p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-green-500" onChange={(e) => setData({ ...data, newpassword: e.target.value })} />
                    <input type="password" placeholder="Confirm Password" className="w-full p-2 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-green-500" onChange={(e) => setData({ ...data, confirmpassword: e.target.value })} />
                    <button onClick={handleChangePassword} className="w-full bg-green-500 p-2 rounded cursor-pointer text-white font-bold hover:bg-green-600 transition-colors">Update Password</button>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordWizard;