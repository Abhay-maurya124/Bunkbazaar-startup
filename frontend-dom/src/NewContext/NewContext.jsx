import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const Contextprovider = createContext();

axios.defaults.withCredentials = true;

const NewContext = ({ children }) => {
    const [Userdata, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Products, setProduct] = useState([]);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/v3/profile");
            if (res.data) {
                setUser(res.data);
            }
        } catch (err) {
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
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, []);

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

export default NewContext;