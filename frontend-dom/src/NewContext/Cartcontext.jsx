import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
import { useProduct } from './NewContext';
export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {

        case "SYNC_CART":
            return action.payload || []

        case "ADD_TO_CART":
            const existingItem = state.find(item =>
                (item.productId?._id || item._id) === action.payload._id
            );

            if (existingItem) {
                return state.map(item =>
                    (item.productId?._id || item._id) === action.payload._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...state, {
                productId: action.payload,
                quantity: 1,
                _id: action.payload._id
            }];

        case "REMOVE_FROM_CART":
            return state.filter(item => item._id !== action.payload);

        case "CART_INCREMENT":
            return state.map(item =>
                item._id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

        case "CART_DECREMENT":
            return state.map(item =>
                item._id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

        case "CART_CLEAR":
            return [];

        default:
            return state;
    }
};
export const Cartcontextdata = ({ children }) => {
    const [cartstate, dispatch] = useReducer(cartReducer, []);
    const { Userdata } = useProduct()

    const addtocart = async (product) => {
        const Token = localStorage.getItem("accesstoken")
        const productId = product._id
        const quantity = 1
        try {
            const res = await axios.post("http://localhost:3000/user/cart/additem", { productId, quantity }, {
                headers: {
                    "Authorization": `Bearer ${Token}`,
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: "ADD_TO_CART", payload: product })

        } catch (error) {
            console.log(error)
        }

    };
    const removefromcart = async (id) => {
        const Token = localStorage.getItem("accesstoken")

        try {
            await axios.delete(`http://localhost:3000/user/cart/removefromcart/${id}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`,
                    "Content-Type": "application/json"
                }
            });
            dispatch({ type: "REMOVE_FROM_CART", payload: id });
        } catch (error) {
            console.error("Remove failed", error);
        }
    };
    const incrementcart = async (id) => {
        const item = cartstate.find(i => i._id === id);
        if (!item) return;
        const Token = localStorage.getItem("accesstoken")

        const newQuantity = item.quantity + 1;

        try {
            await axios.patch(`http://localhost:3000/user/cart/updatecart/${id}`,
                { quantity: newQuantity },
                {
                    headers: {
                        "Authorization": `Bearer ${Token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            dispatch({ type: "CART_INCREMENT", payload: id });
        } catch (error) {
            console.error("Increment failed", error);
        }
    };

    const decrementcart = async (id) => {
        const Token = localStorage.getItem("accesstoken")

        const item = cartstate.find(i => i._id === id);
        if (!item || item.quantity <= 1) return;

        const newQuantity = item.quantity - 1;

        try {
            await axios.patch(`http://localhost:3000/user/cart/updatecart/${id}`,
                { quantity: newQuantity },
                {
                    headers: {
                        "Authorization": `Bearer ${Token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            dispatch({ type: "CART_DECREMENT", payload: id });
        } catch (error) {
            console.error("Decrement failed", error);
        }
    };
   const clearAll = async () => {
    const Token = localStorage.getItem("accesstoken");
    try {
        // Change .post to .delete to match your backend route
        const res = await axios.delete(`http://localhost:3000/user/cart/clearall`, {
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        });
        dispatch({ type: "CART_CLEAR" });
    } catch (error) {
        console.error("Clear cart failed", error);
    }
};

    const synccart = async () => {
        const Token = localStorage.getItem("accesstoken")

        try {
            const res = await axios.get("http://localhost:3000/user/cart/getallitem", {

                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: "SYNC_CART", payload: res.data.cartdata });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Userdata?._id) {
            synccart();
        }
    }, [Userdata]);
    return (
        <CartContext.Provider value={{
            addtocart,
            cartstate,
            removefromcart,
            incrementcart,
            decrementcart,
            clearAll,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a Cartcontextdata Provider");
    }
    return context;
};