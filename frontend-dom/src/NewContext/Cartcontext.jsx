import React, { createContext, useContext, useReducer } from 'react';

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
            console.log(existingItem)
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
    const [cartitem, dispatch] = useReducer(cartReducer, []);

    const addtocart = (product) => {
        console.log("Product being added:", product);
        dispatch({ type: "ADD_TO_CART", payload: product })
    };
    const removefromcart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
    const incrementcart = (id) => dispatch({ type: "CART_INCREMENT", payload: id });
    const decrementcart = (id) => dispatch({ type: "CART_DECREMENT", payload: id });
    const clearAll = () => dispatch({ type: "CART_CLEAR" });

    return (
        <CartContext.Provider value={{
            addtocart,
            cartitem,
            removefromcart,
            incrementcart,
            decrementcart,
            clearAll
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