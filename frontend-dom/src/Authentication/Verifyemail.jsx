import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verifyemail = () => {
    const { token } = useParams()
    const [status, setstatus] = useState("verifying....")
    const navigate = useNavigate()
    useEffect(() => {
        const verifyusermail = async () => {
            try {
                const res = await axios.post('http://localhost:3000/user/v3/verify-email', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setstatus('Verification succesfull')
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }
                else {
                    setstatus('Verification failed:invalid or Expired link')
                }
            } catch (error) {
                console.log(error)
                setstatus("Verification failed")
            }
        }
        verifyusermail()

    }, [token, navigate])
    return (
        <div>
            <div className='h-screen w-screen bg-green-100 flex justify-center items-center'>

                <div className='h-90 w-200 bg-red-50 shadow-2xl flex justify-center items-center rounded-3xl '>
                    <p className='text-3xl font-bold'>{status}</p>
                </div>
            </div>
        </div>
    )
}

export default Verifyemail