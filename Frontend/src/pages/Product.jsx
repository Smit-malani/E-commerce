import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import RelatedProduct from '../components/RelatedProduct'
import { useDispatch } from 'react-redux'
import { addToCart } from '../utils/slice/cartItemSlice'

function Product() {

  const {productId} = useParams()
  const [productData, setProductData] = useState()  
  const [image, setImage] = useState('') 
  const [sizes, setSizes] = useState('')  
  const dispatch = useDispatch()
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  
  async function fetchProductById() {
    try {      
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`)
      setProductData(res.data.product)      
      setImage(res.data.product.images[0].secure_url)
    } catch (err) {      
      toast.error("internal server error") 
    }
  }

  function handleAddToCart(productId, size){    
    if(!productId){
      return toast.error("select product")
    }

    if (!sizes) {
      return toast.error("select Sizes")
    }
    dispatch(addToCart({productId, size, token}))
  }

  useEffect(()=>{
    fetchProductById()
  },[productId])

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* product Data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>

        {/* product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-evenly sm:justify-normal sm:w-[18%] w-full'>
            {
              productData?.images?.map((item, index) => (
                <img onClick={()=>setImage(item.secure_url)} key={index} src={item.secure_url} className='w-[24%] h-[20%] sm:w-full object-cover sm:mb-3 cursor-pointer flex-shrink-0 border' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-[80%] object-cover object-top' src={image} alt="" />
          </div>
        </div>

        {/* product info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData?.name}</h1>
            <p className='mt-3 text-2xl font-medium'>₹ {productData?.price}</p>
            <p className='mt-5 text-gray-700 md:w-4/5'>{productData?.description}</p>
            <div className='flex flex-col gap-4 my-5'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {
                  productData?.sizes?.length > 0  && JSON.parse(productData?.sizes[0])?.map((item, index)=>(
                    <button onClick={()=> setSizes(item)} className={`border border-gray-300 py-2 px-4 bg-gray-100 cursor-pointer ${ item == sizes ? ' border-orange-500' : ''}`} key={index}>{item}</button>
                  ))
                }
              </div>
            </div>
            {
              token && <button onClick={()=> handleAddToCart(productData._id, sizes)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
            }
            <hr className='mt-8  sm:w-4/5'/>
            <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Cash on Delivery</p>
                <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
      </div>
      <RelatedProduct category={productData?.category} subCategory={productData?.subCategory} />
    </div>
  )
}

export default Product