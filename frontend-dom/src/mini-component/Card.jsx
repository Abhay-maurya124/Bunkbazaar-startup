import React from 'react';
import { useCart } from '../NewContext/Cartcontext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck } from 'lucide-react';

const Card = ({ data,addtocart }) => {
  const { title, thumbnail, brand, description, price, discountPercentage, _id } = data;
  return (
    <div className="group relative bg-white border-2 border-black rounded-[2.5rem] transition-all hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full overflow-hidden flex flex-col h-full">
      <Link to={`/singlepage/${_id}`} className="block relative h-64 border-b-4 border-black overflow-hidden bg-black">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-4"
        />
        {discountPercentage && (
          <div className="absolute top-5 right-5 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 border-2 border-black rounded-full uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10">
            {Math.round(discountPercentage)}% OFF
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="bg-amber-400 border-2 border-black px-3 py-1 text-[10px] uppercase font-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {brand || "Generic"}
            </span>
            <div className="flex items-center gap-1 text-green-600 font-black text-[10px] uppercase">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></div>
              In Stock
            </div>
          </div>

          <Link to={`/singlepage/${_id}`}>
            <h4 className="text-2xl font-black text-black line-clamp-1 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">
              {title}
            </h4>
          </Link>

          <p className="text-gray-500 text-xs font-bold line-clamp-2 leading-snug">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t-2 border-dashed border-gray-200">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] font-black uppercase">Price</span>
            <span className="text-3xl font-black text-black leading-none">₹{(price / (1 - discountPercentage / 100)).toFixed(0)}</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1 text-[10px] bg-indigo-200 border-2 border-black px-2 py-1 font-black uppercase rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Truck size={12} strokeWidth={3} />
              Free Ship
            </span>
          </div>
        </div>

        <button
          onClick={() => addtocart(data)}
          className="w-full mt-2 bg-black hover:bg-amber-400 text-white hover:text-black font-black py-4 border-2 border-black rounded-2xl transition-all active:translate-y-1 active:shadow-none uppercase text-xs tracking-widest shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingBag size={16} className="group-hover/btn:rotate-12 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;