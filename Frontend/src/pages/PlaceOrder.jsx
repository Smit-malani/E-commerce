import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCartData } from '../utils/slice/cartItemSlice'

function PlaceOrder() {

  const cartItem = useSelector(slice => slice.cartItem)
  const {allProduct} = useSelector(slice => slice.allProducts)    
  const totalAmount = useSelector(slice => slice.totalAmount)  
  const [token, setToken] = useState(localStorage.getItem('token'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  function onChangeHandler(e) {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  async function submitHandler(e) {
    e.preventDefault()
    try {
      let orderItem = []
      for(const key in cartItem){                
        const {size, quantity} = cartItem[key]
        if(quantity > 0){
          const itemInfo = structuredClone(allProduct.find(product => product._id == key.split('_')[0]))          
          if(itemInfo){
            itemInfo.size = size
            itemInfo.quantity = quantity
            orderItem.push(itemInfo)
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount: totalAmount
      }

      let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/place`, {orderData}, {headers:{ Authorization: `Bearer ${token}`}})
      console.log(res)
      if(res.status == 201){
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          phone: ''
        })
        toast.success('Order Placed')
        dispatch(setCartData(res.data.cartData))
        navigate('/orders')
      }
    } catch (err) {
      toast.error('Internal server error')
    }
  }

  return (
    <form onSubmit={submitHandler} className='min-h-[90vh] flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:pt-14'>
      {/* left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstname' value={formData.firstname} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='First name' />
          <input onChange={onChangeHandler} name='lastname' value={formData.lastname} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Last name' />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="email"  placeholder='Email address' />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Street' />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="number"  placeholder='Zipcode' />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="text"  placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type="number"  placeholder='Phone' />
      </div>

      {/* Right side */}
      <div>
        <div className='sm:min-w-80 mt-8 sm:mt-0'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <p className='text-sm text-gray-700'>CASH ON DELIVERY</p>
          <div className='w-full mt-8 text-end'>
            <button className='bg-black text-white cursor-pointer px-16 py-3 text-sm active:bg-gray-700 hover:bg-gray-700'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder