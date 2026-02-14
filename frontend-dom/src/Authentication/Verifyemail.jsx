import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Verifyemail = () => {
    const { token } = useParams()
    const [status, setstatus] = useState("verifying....")
    const navigate = useNavigate()
    localStorage.setItem("token", token)
    useEffect(() => {
        const verifyusermail = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/user/v3/verify-email/${token}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success == true) {
                    setstatus('Verification succesfull')
                    setTimeout(() => {
                        navigate('/login')

                    }, 2000);
                    toast("verified Successfully");

                }
                else {
                    setstatus('Verification failed:invalid or Expired link')
                }
            } catch (error) {
                const message =
                    error.response?.data?.message || "verification failed";

                toast.error(message);
            }
        }
        verifyusermail()

    }, [token, navigate])
    return (
        <div>
            <div className='h-screen w-screen bg-green-100 flex justify-center items-center'>
                <ToastContainer />
                <div className='h-90 w-200 bg-red-50 shadow-2xl flex justify-center items-center rounded-3xl '>
                    <p className='text-3xl font-bold'>{status}</p>
                </div>
            </div>
        </div>
    )
}

export default Verifyemail