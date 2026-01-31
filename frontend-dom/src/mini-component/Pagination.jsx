import React from 'react'
const Pagination = ({ setpage, setslice, page }) => {
    const handleincrement = () => {
        setpage(prev => prev + 1)
    }
    const handledecrement = () => {
        setpage(prev => Math.max(1, prev - 1))
    }
    return (
        <div>

            <div className='flex justify-center items-center text-5xl '>
                <button className='bg-red-400 p-1 rounded-3xl text-center py-1 px-3 ' onClick={handledecrement}>-</button>
                <p>{page}</p>
                <button className='bg-red-400 p-1 rounded-3xl text-center py-1 px-2' onClick={handleincrement}>+</button>
            </div>

        </div>
    )
}

export default Pagination