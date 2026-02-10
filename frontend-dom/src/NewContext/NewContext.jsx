import React, { useState, useEffect, createContext } from "react";

export const Contextprovider = createContext();

const NewContext = ({ children }) => {
    const [Product, setProduct] = useState([]);
    const [Userdata, setUser] = useState([]);
    const [error, setError] = useState(null);

    const fetchdata = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/products/all");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setProduct(data);

        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const userdata = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/v3/profile");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setUser(data);

        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        userdata();
    }, []);



    return (
        <Contextprovider.Provider value={{ Product, error, Userdata }}>
            {children}
        </Contextprovider.Provider>
    );
};

export default NewContext;
