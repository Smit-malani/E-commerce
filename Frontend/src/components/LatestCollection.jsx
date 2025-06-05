import React, { useEffect, useState } from 'react'
import Title from './Title'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'

function LatestCollection({allProduct}) {

  const [latestProduct, setLatestProduct] = useState([])
  console.log(allProduct)


  useEffect(()=>{
    if(allProduct && allProduct.length > 0){
      
      const sortProducts = [...allProduct].reverse()
      setLatestProduct(sortProducts.slice(0, 10))
    }
  }, [allProduct])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
      </div>

      {/* Rendring Product */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
        {
          latestProduct?.map((item, index)=>(
            <ProductItem key={index} productId={item._id} image={item.images} name={item.name} price={item.price} offerEnabled={item?.offerEnabled} discount={item?.discount} discountedPrice={item?.discountedPrice}/>
          ))
        }
      </div>
        
    </div>
  )
}

export default LatestCollection