import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PiPackageLight } from "react-icons/pi"


function Order({ token }) {

  const [orders, setOrders] = useState([])

  async function fetchOrders() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/list`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.status == 200) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  async function updateStatus(orderId, status) {
    try {

      const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/status`, { orderId, status}, { headers: { Authorization: `Bearer ${token}` } })
      if (res.status == 200) {
        fetchOrders()
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }


  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <h3>Order page</h3>
      <div>
        {
          orders.length > 0 ? (
            orders.map((order, index) => (
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-300 px-5 md:p-8 mb-3 text-gray-700' key={index}>
                <PiPackageLight className='text-4xl' />
                <div>
                  <div className=''>
                    {
                      order.items.map((item, index) => {
                        return <p className='py-0.5' key={index}> {item.name} X {item.quantity} </p>
                      })
                    }
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstname} {order.address.lastname}</p>
                  <div>
                    <p>{order.address.street + ','}</p>
                    <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                  <p>Payment: {order.paymentStatus ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>₹ {order.amount}</p>
                <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.orderStatus} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <div>No Order</div>
          )
        }
      </div>
    </div>
  )
}

export default Order