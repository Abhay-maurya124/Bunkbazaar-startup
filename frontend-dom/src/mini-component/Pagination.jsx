import React from 'react'
import { useContext } from 'react'
import { Contextprovider } from '../../NewContext/NewContext'
const Pagination = () => {
    const { Product } = useContext(Contextprovider)
    return (
        <div>
            hello
        </div>
    )
}

export default Pagination