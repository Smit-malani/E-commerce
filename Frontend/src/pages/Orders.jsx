import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Orders() {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [orders, setOrders] = useState([])

  async function fetchOrder() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/userorders`, { headers: { Authorization: `Bearer ${token}` } })
      setOrders(res.data.order)
    } catch (err) {
      toast.error('Internal server error')
    }
  }

  function formatDate(timestamp){
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear()

    return `${day}, ${month}, ${year}`
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <div className='border-t pt-16 min-h-64'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
      {
        orders.length > 0 ? (
          <div>
            {
              orders?.map((item, index)=>(
                <div key={index} className='py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item?.items[0]?.images[0]?.secure_url} alt="" />
                    <div>
                      <p className='sm:text-base font-medium'>{item?.items[0]?.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>₹ {item?.items[0]?.price}</p>
                        <p>Quantity: {item?.items[0]?.quantity}</p>
                        <p>Size: {item?.items[0]?.size}</p>
                      </div>
                      <p className='mt-2'>
                        Date: <span className='text-gray-500'>{formatDate(item?.date)}</span>
                      </p>
                    </div>
                  </div>
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p>{item?.orderStatus}</p>
                    </div>
                    <button onClick={()=>fetchOrder()} className='border px-4 py-2 text-sm font-medium bg-white cursor-pointer active:bg-gray-50 hover:bg-gray-50'>Track Order</button>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className='text-xl w-full flex flex-col gap-4 items-center justify-center'>
            <h1>No orders</h1>
            <Link to={'/collection'}>
              <button className='bg-black text-white text-sm px-6 py-2 active:bg-gray-700 hover:bg-gray-700 cursor-pointer'>Browse Collection</button>
            </Link>
          </div>
        )
      }
      <div>

      </div>
    </div>
  )
}

export default Orders