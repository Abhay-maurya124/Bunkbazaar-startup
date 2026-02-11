import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isOtpSent, setIsOtpSent] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate()
    const showMessage = (type, message) => {
        setStatus({ type, message });
        setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    };
 
    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData("text").trim().slice(0, 6).split("");
        if (data.length === 6 && data.every(char => !isNaN(char))) {
            setOtp(data);
            inputRefs.current[5].focus();
        }
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/user/v3/forgetpassword', { email });
            showMessage("success", "OTP sent to your email!");
            setIsOtpSent(true);
        } catch (error) {
            showMessage("error", error.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        const otpString = otp.join("");
        if (otpString.length < 6) return showMessage("error", "Please enter the full 6-digit code.");

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/user/v3/verifyOTP', {
                email,
                otp: otpString
            });
            showMessage("success", "OTP Verified! Redirecting...");
            navigate('/changepassword')
        } catch (error) {
            showMessage("error", error.response?.data?.message || "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    {isOtpSent ? "Enter Verification Code" : "Reset Password"}
                </h2>
                <div className="h-12 mt-2">
                    {status.message && (
                        <div className={`p-2 text-sm text-center rounded-md animate-pulse ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {status.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-xl border border-gray-100 sm:px-10">
                    {!isOtpSent ? (
                        <form className="space-y-6" onSubmit={handleSubmitEmail}>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors"
                            >
                                {loading ? "Sending..." : "Send Reset Code"}
                            </button>
                        </form>
                    ) : (
                        <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
                            <p className="text-center text-sm text-gray-500 mb-6">
                                We've sent a code to <span className="font-semibold text-gray-800">{email}</span>
                            </p>
                            <div className='flex justify-center gap-3' onPaste={handlePaste}>
                                {otp.map((val, idx) => (
                                    <input
                                        key={idx}
                                        ref={(el) => (inputRefs.current[idx] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        className='w-12 h-14 border-2 border-gray-200 rounded-lg text-2xl font-bold text-center focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all'
                                        maxLength={1}
                                        value={val}
                                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                                        onKeyDown={(e) => handleKeyDown(e, idx)}
                                    />
                                ))}
                            </div>
                            <button
                                disabled={loading}
                                onClick={verifyOtp}
                                className="mt-8 w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50"
                            >
                                {loading ? "Verifying..." : "Verify Code"}
                            </button>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setIsOtpSent(false)}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
                                >
                                    Try a different email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;