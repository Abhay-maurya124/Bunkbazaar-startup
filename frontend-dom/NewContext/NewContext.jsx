import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'

export const Contextprovider = createContext()

const NewContext = ({children}) => {
    const [Product, setProduct] = useState([])
    const fetchdata = async () => {
        try {
            const res = await fetch('https://localhost:3000/api/products');
            const data =await res.json()
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <Contextprovider.Provider value={{Product}}>
            {children}
        </Contextprovider.Provider>
    )
}

export default NewContext