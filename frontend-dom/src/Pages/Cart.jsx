import React from 'react';
import { useCart } from '../NewContext/Cartcontext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProduct } from '../NewContext/NewContext';

const Cart = () => {
  const { cartstate, removefromcart, incrementcart, decrementcart } = useCart();
  // const { Products } = useProduct()

  const totalPrice = cartstate.reduce((acc, item) => acc + ((item.price / (1 - item.discountPercentage / 100)).toFixed(0) * (item.quantity || 1)), 0);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Shopping Cart
        </h1>
        {/* <Link to={`/singlepage/:${_id}`}></Link> */}
        {cartstate.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl font-medium">Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              {cartstate.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-28 h-28 shrink-0 bg-black rounded-lg overflow-hidden">
                    <Link to={`/singlepage/${item.id}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.description}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                      {item.title || "Product"}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                      {item.description}
                    </p>
                    <p className="mt-2 text-indigo-600 font-bold text-lg">
                      ₹{(item.price / (1 - item.discountPercentage / 100)).toFixed(0)}
                    </p>
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                    <button
                      onClick={() => decrementcart(item._id)}
                      className="p-2.5 hover:bg-gray-200 transition-colors text-gray-600 active:scale-90"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="px-4 font-bold text-gray-800 min-w-10 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementcart(item._id)}
                      className="p-2.5 hover:bg-gray-200 transition-colors text-gray-600 active:scale-90"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  <button
                    onClick={() => removefromcart(item._id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors group"
                  >
                    <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Grand Total</p>
                <h2 className="text-3xl font-black text-gray-900">
                  ₹{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <button className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg active:scale-95">
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;