import React from 'react';
import { useCart } from '../NewContext/Cartcontext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartstate, removefromcart, incrementcart, decrementcart } = useCart();

  const totalPrice = cartstate.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    const discount = item.productId?.discountPercentage || 0;
    const quantity = item.quantity || 1;

    const finalPrice = price / (1 - discount / 100);
    return acc + (finalPrice * quantity);
  }, 0);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Shopping Cart
        </h1>

        {cartstate.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xl font-medium">Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              {cartstate.map((item) => {
                const product = item.productId;
                const imagePath = product?.thumbnail || product?.image || product?.images?.[0];
                const cleanPath = imagePath?.startsWith('/') ? imagePath.substring(1) : imagePath;
                const finalImageSrc = imagePath?.startsWith('http')
                  ? imagePath
                  : `http://localhost:3000/${cleanPath}`;
                return (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-28 h-28 shrink-0 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                      <Link to={`/singlepage/${item.productId?._id}`}>
                        <img
                          src={finalImageSrc || "https://placehold.co/150?text=No+Image"}
                          alt={product?.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                        {item.productId?.title || "Product"}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                        {item.productId?.description}
                      </p>
                      <p className="mt-2 text-indigo-600 font-bold text-lg">
                        ₹{(item.productId?.price / (1 - (item.productId?.discountPercentage || 0) / 100)).toFixed(0)}
                      </p>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => {
                          decrementcart(item._id)
                          console.log(item._id)
                        }}
                        className="p-2.5 hover:bg-gray-200 transition-colors text-gray-600"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <span className="px-4 font-bold text-gray-800 min-w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementcart(item._id)}
                        className="p-2.5 hover:bg-gray-200 transition-colors text-gray-600"
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
                )
              })}
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Grand Total</p>
                <h2 className="text-3xl font-black text-gray-900">
                  ₹{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </h2>
              </div>
              <button className="w-full sm:w-auto bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg">
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