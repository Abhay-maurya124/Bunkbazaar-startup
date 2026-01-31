import React from 'react'

const Card = ({ data }) => {
    const { title, thumbnail, brand, description, price, discountPercentage } = data;

    return (
        <div className="group relative bg-white rounded-2xl shadow-sm border
         border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 
         transform hover:-translate-y-1 w-full max-w-[280px] p-2">
            
            <div className="relative h-48 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {discountPercentage && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        {Math.round(discountPercentage)}% OFF
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col justify-between h-[220px]">
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                        {brand || "Generic"}
                    </span>
                    <h4 className="text-md font-bold text-gray-800 line-clamp-1 mt-1">
                        {title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-extrabold text-gray-900">${price}</span>
                        <span className="text-xs text-green-600 font-semibold">Free Delivery</span>
                    </div>
                    
                    <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 text-sm shadow-md active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card