import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBin4Line } from "react-icons/ri"
import axios from 'axios'
import { setCartData } from '../utils/slice/cartItemSlice'
import toast from 'react-hot-toast'
import CartTotal from '../components/CartTotal'


function Cart() {

  const { allProduct } = useSelector(slice => slice.allProducts)
  const cartItem = useSelector(slice => slice.cartItem)
  const [cartData1, setCartData1] = useState([])
  const [isPopup, setPopup] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function fetchCartData() {
    const tempData = []
    for (const key in cartItem) {
      const { size, quantity } = cartItem[key];
      if (quantity > 0) {
        tempData.push({
          _id: key.split('_')[0],
          size,
          quantity,
          key
        })
      }
    }
    setCartData1(tempData)
  }

  function showPopup(key) {
    setPopup(key)
  }

  async function handleDeleteItem(key) {
    const productId = key.split('_')[0]
    const size = key.split('_')[1]
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/${key}`, { headers: { Authorization: `Bearer ${token}` } })
      dispatch(setCartData(res.data.cartData))
      toast.success('cart updated')
    } catch (err) {
      toast.error('Internal server error')

    }
    setPopup(null)
  }

  useEffect(() => {
    fetchCartData()
  }, [cartItem])

  return (
    <div className='border-t pt-14 min-h-[50vh]'>
      <div className='flex justify-between text-base sm:text-2xl mb-2'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Data */}
      <div>
        {
          cartData1?.map((item, index) => {
            const productData = allProduct.find((product) => product._id == item._id)
            return (
              <div key={index} className='relative py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData?.images[0].secure_url} alt="" />
                  <div>
                    <Link to={`/product/${productData?._id}`} className='text-xs sm:text-lg font-medium'>{productData.name}</Link>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>₹ {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-white text-sm'>{item.size}</p>
                      <p className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-white text-[10px] sm:text-sm'>
                        QTY: <span>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <RiDeleteBin4Line onClick={() => showPopup(item.key)} className='text-xl cursor-pointer text-gray-700 hover:text-black' />
                {
                  isPopup == item.key && (
                    <div className='bg-white w-[70%] sm:w-[40%] px-3 py-2 flex flex-col gap-2 absolute top-[50%] left-[50%] border transform translate-x-[-50%] translate-y-[-50%]'>
                      <p className='text-[10px] sm:text-sm'>Are you Sure You want to Remove Item?</p>
                      <div className='flex items-center justify-between'>
                        <button onClick={() => handleDeleteItem(item.key)} className='cursor-pointer hover:bg-red-500 bg-red-600 text-white px-2 py-1 text-xs active:bg-red-500'>Yes, Remove</button>
                        <button onClick={() => setPopup(null)} className='cursor-pointer hover:bg-gray-700 bg-black text-white px-2 py-1 text-xs active:bg-gray-700'>Cancel</button>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
      {
        Object.keys(cartItem).length > 0 ? (
          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm  my-8 px-8 py-3 cursor-pointer uppercase'>proceed to checkout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full flex flex-col items-center justify-center gap-5 mt-16'>
            <h1 className='font-medium uppercase'>Cart is empty</h1>
            <Link to={'/collection'}>
              <button className='bg-black text-white text-sm px-6 py-2 active:bg-gray-700 hover:bg-gray-700 cursor-pointer'>Browse Collection</button>
            </Link>
          </div>
        )
      }


    </div>
  )
}

export default Cart