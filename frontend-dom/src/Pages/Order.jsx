import React, { useEffect, useState } from 'react'
import Card from '../mini-component/Card'
import Pagination from '../mini-component/Pagination'
import { Audio } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { useCart } from '../NewContext/Cartcontext';
import { useProduct } from '../NewContext/NewContext';

const Order = () => {
    const { addtocart } = useCart()
    const [Product, setProduct] = useState([])
    const [slice, setslice] = useState(12)
    const [page, setpage] = useState(1)
    const [search, setsearch] = useState('')
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    const { Userdata } = useProduct()
    const hasToken = !!localStorage.getItem("accesstoken");
    const user = Array.isArray(Userdata) ? Userdata[0] : Userdata;
    const isAuthenticated = hasToken && user && (user.islogged || user._id);
    const fetchdata = async () => {
        setloading(true)
        seterror(false)
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

    useEffect(() => {
        fetchdata()
    }, [slice, page, search])

    const handlesearch = (e) => {
        setsearch(e.target.value)
        setpage(1)
    }

    const noResults = !loading && !error && Product.length === 0;

    return (
        <div className='bg-gradient-to-b from-[#faecb8] to-[#fff] min-h-screen pb-20 font-sans'>
            <div className='w-full overflow-hidden text-center py-12 px-6'>
                <h3 className='text-6xl font-bold text-center mb-2 italic uppercase tracking-tighter'>
                    Bunk Bazaar
                </h3>
                <p className='mb-8 text-black font-bold uppercase text-sm tracking-widest'>
                    Essentials for the academic Noobs
                </p>

                <div className="relative max-w-2xl mx-auto">
                    <input
                        onChange={handlesearch}
                        value={search}
                        className='w-full p-5 rounded-2xl px-12 tracking-wide text-xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold'
                        type="text"
                        placeholder='Search the bazaar...'
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {error ? (
                    <div className='flex justify-center py-20'>
                        <div className="bg-white border-4 border-black p-10 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(239,68,68,1)] text-center max-w-lg">
                            <p className='text-5xl mb-4'>⚠️</p>
                            <p className='text-2xl font-bold uppercase italic'>System Crash!</p>
                            <p className='font-bold mt-2 text-gray-700'>The server is taking a nap. Try refreshing or come back later.</p>
                        </div>
                    </div>
                ) : noResults ? (
                    <div className='flex justify-center py-20'>
                        <div className="bg-white border-4 border-black p-10 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center max-w-lg transform -rotate-1">
                            <h4 className='text-3xl font-bold uppercase italic'>Item Not Found</h4>
                            <p className='font-bold mt-4 text-gray-600'>
                                We couldn't find <span className="text-red-500 underline">"{search}"</span> in our dorm inventory.
                            </p>
                            <button
                                onClick={() => setsearch('')}
                                className="mt-6 bg-amber-400 border-2 border-black px-6 py-2 font-bold uppercase hover:bg-black hover:text-white transition-colors rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10 py-10 justify-items-center'>
                            {loading ? (
                                <div className='col-span-full h-80 w-full flex justify-center flex-col items-center bg-white border-4 border-dashed border-black rounded-[3rem]'>
                                    <Audio height="80" width="80" color="#000" ariaLabel="loading" />
                                    <h3 className='text-2xl font-bold mt-4 uppercase italic tracking-tighter'>Scouring the aisles...</h3>
                                </div>
                            ) : (
                                Product.map((item, idx) => (
                                    <Card key={item._id || idx} data={item} addtocart={addtocart} image={item.thumbnail} isAuthenticated={isAuthenticated} />
                                ))
                            )}
                        </div>

                        {!loading && Product.length > 0 && (
                            <div className='mt-12 flex justify-center pb-10'>
                                <div className="bg-white border-4 border-black p-2 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <Pagination setpage={setpage} setlimit={setslice} page={page} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Order