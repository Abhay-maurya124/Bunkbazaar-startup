import React, { useEffect, useState } from 'react'
const hero = () => {


  return (
    <>
      <div className='bg-amber-100'>
        <div className='grid grid-cols-2'>
          <div className='m-11'>
            <h1 className='text-6xl p-4 leading-20 font-bold'>
              Students, Campus first market Place
              <span className='px-7 bg-amber-400 h-10 rounded-4xl'>
                <span className='tracking-wider'>Bunk</span>
                <span className='tracking-widest'>Bazzar</span>
              </span>
            </h1>
            <div className='flex text-2xl mt-10 gap-3.5 font-bold'>
              <button className="h-20  w-2xs rounded-4xl  hover:bg-amber-200 
            transition-all ease-in-out
            bg-gradient-to-r from-[#eee] to-[#333]
              focus:outline-none active:scale-95 ring-[#e0cc10]
              duration-500">
                Explore Items
              </button>

              <button className='h-20  w-2xs rounded-4xl  hover:bg-amber-200 
            transition-all ease-in-out
              focus:outline-none ring-4 active:scale-95 ring-[#e0cc10]
              duration-500'>Start Yours business</button>
            </div>
          </div>
          <div>
            <img src="./original-0997d5c6b8b6f03d840209c19a9e7de4-removebg-preview.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default hero