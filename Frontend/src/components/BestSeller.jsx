import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

function BestSeller({allProduct}) {
    
    const[bestSeller, setBestSeller]= useState([])

    useEffect(()=>{
        if(allProduct && allProduct.length > 0){
            const bestProduct = [...allProduct].filter((item)=> item.bestSeller)
            setBestSeller(bestProduct.slice(0,5))            
        }        
    },[allProduct])


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLER'}/>
      </div>

       {/* Rendring Product */}
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
        {
          bestSeller?.map((item, index)=>(
            <ProductItem key={index} productId={item._id} image={item.images} name={item.name} price={item.price} offerEnabled={item?.offerEnabled} quantity={item.quantity} discount={item?.discount} discountedPrice={item?.discountedPrice}/>
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller