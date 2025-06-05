import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({ productId, image, name, price, offerEnabled, quantity, discount, discountedPrice }) {
  
  return (
    <Link to={`/product/${productId}`} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden h-60 '>
        <img className='h-full w-full object-cover object-top hover:scale-110 transition ease-in-out' src={image[0].secure_url} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm line-clamp-1'>{name}</p>
      <div className='flex items-center justify-around'>

        {
          offerEnabled ? <p className='text-sm text-gray-500 line-through'>₹ {price}</p> : <p className='text-sm font-medium'>{price}</p>
        }

        {
          offerEnabled && (
            <>
              <p className='text-sm text-red-500 font-medium'>-{discount}% OFF</p>
              <p className='text-base font-medium'>₹ {discountedPrice}</p>
            </>
          )
        }
      </div>
      {
        quantity <= 10 ? (
          <>
            {
              quantity == 0 ? (
                <p className='py-1 text-sm font-medium text-red-500'>Out Of Stock</p>
              ) : (
                <p className='py-1 text-sm font-medium text-yellow-500'>Item Left : {quantity}</p>
              )
            }

          </>
        ) : (
          <p className='py-1 text-sm text-green-500 font-medium'>In Stock</p>
        )
      }

    </Link>
  )
}

export default ProductItem