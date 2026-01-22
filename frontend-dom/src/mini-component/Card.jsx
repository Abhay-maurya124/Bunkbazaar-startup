import React from 'react'

const Card = (prop) => {
    return (
        <div className="flex justify-center p-4">
            
            <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                    src={prop.data.thumbnail}
                    alt="Card Image"
                    className="w-full h-44 object-cover"
                />

                <div className="p-4 space-y-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                        {prop.data.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                        Brand:{prop.data.brand}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {prop.data.description}
                    </p>

                    <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200">
                        Add to cart
                    </button>
                </div>
            </div>

        </div>)
}

export default Card