import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({productId, image, name, price}) {
  return (
    <Link to={`/product/${productId}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden h-60 '>
            <img className='h-full w-full object-cover object-top hover:scale-110 transition ease-in-out' src={image[0].secure_url} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm line-clamp-1'>{name}</p>
        <p className='text-sm font-medium'>₹ {price}</p>
    </Link>
  )
}

export default ProductItem