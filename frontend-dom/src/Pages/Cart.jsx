import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Cart = () => {
    const [data, setdata] = useState([])
    const [quantity, setquantity] = useState(1)

    const fetchdata = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/v3/cartitem", {
                withCredentials: true
            })
            console.log(res.data.cart)
            setdata(res.data.cart)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchdata()

    }, [])

    return (
        <div>
            {
                data.map((val, idx) => (
                    <div key={idx}>
                        <p>Product ID: {val.ProductId}</p>
                    </div>
                ))}
        </div>
    )
}

export default Cart