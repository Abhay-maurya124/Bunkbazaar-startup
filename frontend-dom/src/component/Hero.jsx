import React, { useEffect, useState } from 'react'
import Card from '../mini-component/Card'

const hero = () => {
  const [Product, setProduct] = useState([])
  // console.log(Product[1])
  const fetchdata = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products")
      const data = await res.json();
      setProduct(data)
    } catch (error) {
      console.log("somthing went wrong in hero.jsx")
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div className='grid grid-5 bg-red-200'>
      {Product.map((item, idx) => (
        <div className='flex justify-center item-center'>
          <Card key={idx} data={item}/>
        </div>
      ))}
    </div>
  )
}

export default hero