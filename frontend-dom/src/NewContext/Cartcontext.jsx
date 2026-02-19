import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {

        case "SYNC_CART":
            return action.payload || []

        case "ADD_TO_CART":
            const existingItem = state.find(item => item._id === action.payload._id);

            if (existingItem) {
                return state.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }

            return [...state, { ...action.payload, quantity: 1 }];

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
    const Token = localStorage.getItem("accesstoken")
    const [cartstate, dispatch] = useReducer(cartReducer, []);

    const addtocart = async (product) => {
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
        const res = await axios.post(`http://localhost:3000/user/cart/removefromcart/${id}`, {
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "REMOVE_FROM_CART", payload: id })
    };
    const incrementcart = async (id) => {
        const res = await axios.post(`http://localhost:3000/user/cart/updatecart/${id}`, {
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "CART_INCREMENT", payload: id });
    }
    const decrementcart = async (id) => {
        const res = await axios.post(`http://localhost:3000/user/cart/updatecart/${id}`, {
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "CART_DECREMENT", payload: id })
    };
    const clearAll = async () => {
        const res = await axios.post(`http://localhost:3000/user/cart/clearall`, {
            headers: {
                "Authorization": `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "CART_CLEAR" })
    };

    const synccart = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/cart/getallitem", {

                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: "SYNC_CART", payload: res.data.cartdata });
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        synccart();
    }, []);


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