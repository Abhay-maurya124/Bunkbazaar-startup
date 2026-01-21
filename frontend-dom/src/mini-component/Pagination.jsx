import React from 'react'
import { useContext } from 'react'
import NewContext, { Contextprovider } from '../../NewContext/NewContext'
const Pagination = () => {
    const { Product } = useContext(Contextprovider)
    console.log(Product)
    return (
        <div>
            hello
        </div>
    )
}

export default Pagination