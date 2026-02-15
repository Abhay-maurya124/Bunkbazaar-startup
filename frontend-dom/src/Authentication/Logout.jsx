import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const token = localStorage.getItem("token")
    // console.log(token)
    const navigate = useNavigate()
    const Userlogout = async () => {
        try {
            const res = await axios.post("http://localhost:3000/user/v3/logout", {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(res.data)
        } catch (error) {
            localStorage.removeItem("token")
            console.log("Token already expired or invalid, clearing local storage.")
        }
        finally {
            navigate('/login')
        }
    }

    useEffect(() => {
        Userlogout()
    }, [])

    return (
        <div>
            hu
        </div>
    )
}

export default Logout