import React, { useEffect, useState } from 'react'
import Card from '../mini-component/Card'
import Pagination from '../mini-component/Pagination'
import { ProgressBar } from "react-loader-loaders";

const Order = () => {
    const [Product, setProduct] = useState([])
    const [slice, setslice] = useState(10)
    const [page, setpage] = useState(1)
    const [search, setsearch] = useState('')
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    const fetchdata = async () => {
        setloading(true)
        try {
            const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${slice}&search=${search}`)
            const data = await res.json();
            setProduct(data)
        } catch (error) {
            console.error(error)
            seterror(true)
        }
        finally {
            setloading(false);
        }
    }

    // const slicediscription = Product.map((idx) => idx.description)
    // const finalslice = slicediscription.splice(0, 80, "...")
    // console.log(finalslice)
    useEffect(() => {
        fetchdata()
    }, [slice, page, search])
    const handlesearch = (e) => {
        setsearch(e.target.value)
    }

    return (
        <div className='bg-gradient-to-b from-[#faecb8] to-[#fff]'>
            <div className='w-full overflow-hidden text-center'>
                <h3 className='text-4xl font-bold text-center m-3'>Order Now</h3>
                <p className='m-3 text-gray-500'>Get Your Favorate items at your door-step</p>
                <input onChange={(e) => handlesearch(e)} className='outline-none border-b w-3xl p-3 rounded-3xl px-8 
                tracking-widest text-xl bg-amber-100' type="text" placeholder='Search All Item' />
            </div>
            {error ? (
                <div>
                    OOps Cant Find the Items
                </div>
            ) : (
                <div>
                    <div className='grid grid-cols-4 p-8 gap-5'>
                        {loading ? (
                            <div><ProgressBar
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /></div>) : (
                            Product.map((item, idx) => (
                                <div key={item._id || idx} className='flex justify-center item-center'>
                                    <Card data={item} />
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <Pagination setpage={setpage} setlimit={setslice} page={page}></Pagination>
                    </div>
                </div>
            )}

        </div>
    )
}
export default Order