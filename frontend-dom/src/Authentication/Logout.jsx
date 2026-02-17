import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Logout = () => {
    // console.log(token)
    const navigate = useNavigate()
    const Userlogout = async () => {
        const toastId = toast.loading("Logging out...");
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            localStorage.removeItem("refreshtoken");
            navigate('/login');
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/user/v3/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.data.success) {
                toast.update(toastId, {
                    render: "Logout success",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
            }
        } catch (error) {
            console.log(error)
            toast.update(toastId, {
                render: "Session cleared.",
                type: "info",
                isLoading: false,
                autoClose: 2000
            });
        } finally {
            localStorage.removeItem("refreshtoken");
            localStorage.removeItem("accesstoken");

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }

    useEffect(() => {
        Userlogout()
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <ToastContainer theme="dark" limit={1} />
            <div className="text-center">
                <h2 className="text-xl font-semibold">Logging you out safely...</h2>
                <p className="text-gray-400">Please wait a moment.</p>
            </div>
        </div>
    )
}

export default Logout