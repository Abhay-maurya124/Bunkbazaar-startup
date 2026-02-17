import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
export const CartContext = createContext();


const cartReducer = (state, action) => {
    switch (action.type) {
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
        case "SET_CART":
            return action.payload;

        case "CART_CLEAR":
            return [];

        default:
            return state;
    }
};




export const Cartcontextdata = ({ children }) => {
    const [cartstate, dispatch] = useReducer(cartReducer, []);
    const addtocart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product })
    };
    const removefromcart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
    const setcart = (id) => dispatch({ type: "SET_CART", payload: id });
    const incrementcart = (id) => dispatch({ type: "CART_INCREMENT", payload: id });
    const decrementcart = (id) => dispatch({ type: "CART_DECREMENT", payload: id });
    const clearAll = () => dispatch({ type: "CART_CLEAR" });



    const getAccessToken = () => localStorage.getItem("accesstoken")

    const fetchSavedCart = async () => {
        const token = getAccessToken();
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:3000/user/v3/getcart", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.data.success && res.data.cart) {
                dispatch({ type: "SET_CART", payload: res.data.cart });
            }
        } catch (error) {
            console.log("Error fetching cart:", error);
        }
    };

    const sendcart = async () => {
        const token = getAccessToken();
        if (!token) return;

        try {
            await axios.post("http://localhost:3000/user/v3/cartitem", { cartstate }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log("Error syncing cart:", error);
        }
    };

    // Run fetch once on mount
    useEffect(() => {
        fetchSavedCart();
    }, []);

    useEffect(() => {
        if (cartstate.length > 0) {
            sendcart();
        }
    }, [cartstate]);

    return (
        <CartContext.Provider value={{
            addtocart,
            cartstate,
            removefromcart,
            incrementcart,
            decrementcart,
            clearAll,
            setcart
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