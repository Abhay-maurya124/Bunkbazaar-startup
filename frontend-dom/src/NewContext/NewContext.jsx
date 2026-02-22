import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const Contextprovider = createContext();

axios.defaults.withCredentials = true;

export const NewContext = ({ children }) => {
    const [Userdata, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Products, setProduct] = useState([]);
    const [error, setError] = useState(null);
    const fetchUser = async () => {
        const token = localStorage.getItem("accesstoken"); // Get the latest token

        // If no token exists, don't even try to fetch; just set user to null
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get("http://localhost:3000/user/v3/profile", {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token here
                },
            });

            if (res.data) {
                setUser(res.data);
            }
        } catch (err) {
            console.error("Profile fetch failed:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/products/all");
            setProduct(res.data.products || res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post("http://localhost:3000/user/v3/logout");
            localStorage.removeItem("accesstoken"); // Clear the token!
            localStorage.removeItem("refreshtoken");
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, [localStorage.getItem("accesstoken")])
    return (
        <Contextprovider.Provider value={{
            Userdata,
            setUser,
            fetchUser,
            userdata: fetchUser,
            logoutUser,
            loading,
            Products,
            setProduct,
            error
        }}>
            {children}
        </Contextprovider.Provider>
    );
};

export const useProduct = () => {
    const productcontext = useContext(Contextprovider)
    if (!productcontext) {
        throw new Error("This is happening in contextprovider")
    }
    return productcontext
}