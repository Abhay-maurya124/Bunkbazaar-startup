import React, { useEffect, useState } from 'react'
import Card from '../mini-component/Card'

const Order = () => {
    const [Product, setProduct] = useState([])
    const [slice, setslice] = useState(10)
    // console.log(Product[1])
    const fetchdata = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/products?limit=10")
            const data = await res.json();
            setProduct(data)
        } catch (error) {
            console.log("somthing went wrong in hero.jsx")
        }
    }
    const slicedata = Product.slice(0, slice)

    useEffect(() => {
        fetchdata()
    }, [])
    // console.log(slicedata)
    return (
        <div>
            <div className='grid grid-cols-5 bg-red-200'>
                {slicedata.map((item, idx) => (
                    <div className='flex justify-center item-center'>
                        <Card key={idx} data={item} />
                    </div>
                ))}
            </div>
            <div>
                <button
                    className='font-bold text-4xl cursor-pointer'
                    onClick={(prev) => setslice(prev + 10)}
                >+</button>
            </div>
        </div>
    )
}
✅
export default Order