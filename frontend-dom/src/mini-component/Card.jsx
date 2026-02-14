import React, { useContext } from 'react'
import { useCart } from '../NewContext/Cartcontext';

const Card = ({ data }) => {
  const { title, thumbnail, brand, description, price, discountPercentage, _id } = data;
  const { addtocart } = useCart()
  return (
    <div className="group relative bg-white border-2 border-black rounded-[2rem] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full max-w-[450px] overflow-hidden">

      <div className="relative h-44 border-b-4 border-black overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {discountPercentage && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 border-2 border-black rounded-full uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {Math.round(discountPercentage)}% OFF
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="w-fit bg-amber-400 border-2 border-black px-3 py-0.5 text-[10px] uppercase font-bold rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {brand || "Generic"}
          </span>
          <h4 className="text-2xl font-bold text-black line-clamp-1 uppercase italic tracking-tighter">
            {title}
          </h4>
          <p className="text-slate-500 text-xs font-bold line-clamp-2 leading-tight">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-black leading-none">${price}</span>
            <span className="text-[10px] text-green-600 font-bold uppercase">In Stock</span>
          </div>
          <span className="text-[10px] bg-green-300 border-2 border-black px-2 py-1 font-bold uppercase rounded-lg">
            Free Ship
          </span>
        </div>

        <button onClick={() => addtocart(data)} className="w-full bg-black hover:bg-amber-400 text-white
                 hover:text-black font-bold py-3 border-2 border-black rounded-xl 
                 transition-all active:translate-y-1 active:shadow-none uppercase
                  text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card