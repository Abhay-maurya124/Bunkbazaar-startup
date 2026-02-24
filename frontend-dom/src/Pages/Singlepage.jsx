import React, { useState } from "react"; // Added useState
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../NewContext/NewContext";
import { useCart } from "../NewContext/Cartcontext";
import { Star, Truck, ShieldCheck, RefreshCcw, Package, Plus, Minus, ArrowBigLeft } from "lucide-react";

const Singlepage = () => {
  const { id } = useParams();
  const { Products, loading, error } = useProduct();
  const { addtocart, incrementcart, decrementcart } = useCart();
  const isAuthenticated = localStorage.getItem("accesstoken")
  const [quantity, setQuantity] = useState(1);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500 animate-pulse font-medium">Loading product...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;

  const product = Products?.find((item) => item._id === id);

  if (!product) return <div className="text-center mt-20 text-gray-600">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <Link to="/order" className="text-2xl font-black flex items-center gap-4 hover:text-green-500 transition-all ease-in "> <ArrowBigLeft /> Go Back</Link>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">

          <div className="md:w-1/2 bg-black flex items-center justify-center p-8">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="w-full h-auto max-h-125 object-contain transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="md:w-1/2 p-8 lg:p-12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 text-yellow-500 font-bold">
                <Star size={18} fill="currentColor" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal text-sm">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed italic border-l-4 border-gray-100 pl-4">
              "{product.description}"
            </p>

            <div className="py-4 border-y border-gray-100">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-lg text-red-500 font-bold line-through opacity-50">
                  ₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(0)}
                </span>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Select Quantity</p>
              <div className="flex items-center w-max border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <button
                  onClick={() => decrementcart(product._id)}
                  className="p-3 hover:bg-gray-200 transition-colors text-gray-600 active:scale-90"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="px-6 font-black text-gray-900 text-lg min-w-15 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => incrementcart(product._id)}
                  className="p-3 hover:bg-gray-200 transition-colors text-gray-600 active:scale-90"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
            {isAuthenticated ? (<>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => addtocart({ ...product, quantity })}
                  className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  Buy Now
                </button>
              </div>

            </>) : (<>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/login"
                  className="w-full mt-2 bg-gray-200 hover:bg-black text-black hover:text-white font-black py-4 border-2 border-black rounded-2xl transition-all uppercase text-xs tracking-widest shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  <Lock size={16} />
                  Login to Buy
                </Link>
              </div>
            </>)}
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-gray-400" />
                <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                  {product.stock} in stock
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck size={16} className="text-gray-400" />
                <span>{product.brand}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <RefreshCcw size={20} className="text-indigo-600" />
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4 text-sm">
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Weight</span> <span className="font-bold">{product.weight}g</span></p>
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Warranty</span> <span className="font-bold text-right">{product.warrantyInformation}</span></p>
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Return Policy</span> <span className="font-bold">{product.returnPolicy}</span></p>
              </div>
              <div className="space-y-4 text-sm">
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Width</span> <span className="font-bold">{product.dimensions?.width}cm</span></p>
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Height</span> <span className="font-bold">{product.dimensions?.height}cm</span></p>
                <p className="flex justify-between border-b pb-2"><span className="text-gray-500 font-medium">Depth</span> <span className="font-bold">{product.dimensions?.depth}cm</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 text-center">
            <img src={product.meta?.qrCode} alt="QR Code" className="w-32 h-32 opacity-80 hover:opacity-100 transition-opacity" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">SKU: {product.sku}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase">Barcode: {product.meta?.barcode}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {product.tags?.map((tag, i) => (
                <span key={i} className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl space-y-3 relative border border-gray-100">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-900">{review.reviewerName}</p>
                  <div className="flex text-yellow-500"><Star size={12} fill="currentColor" /> <span className="text-xs ml-1 font-bold">{review.rating}</span></div>
                </div>
                <p className="text-gray-500 text-xs italic">{new Date(review.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700 leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Singlepage;