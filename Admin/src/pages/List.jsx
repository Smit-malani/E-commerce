import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDots } from "react-icons/bs"
import { Link } from 'react-router-dom'

function List({ token }) {

  const [list, setList] = useState([])
  const [loadind, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState('')

  async function fetchList() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      if (res.status == 200) {
        setList(res.data.product)
      }

    } catch (err) {
      toast.error('Internal server error')
    }
  }

  async function removeItem(productId) {
    setLoading(true)
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/remove/${productId}`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.status == 200) {
        toast.success('Product Removed From Site')
        await fetchList()
      }
    } catch (err) {
      console.log(err)
      toast.error('Internal server error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList() 
  }, [])

  return (
    <>
      {
        loadind ? (
          <div className="w-full h-full inset-0 bg-gray-100 bg-opacity-50 z-10 flex items-center justify-center">
            <p className="text-black text-lg font-medium">Processing...</p>
          </div>
        ) : (
          <>
            <p className='mb-3 font-medium'>All Products List</p>
            <div className='flex flex-col gap-2'>

              {/* List Table Title */}
              <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm text-gray-700'>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className='text-center'>Action</b>
              </div>

              {/* Product List */}
              {
                list.map((item, index) => (
                  <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'>
                    <img className='w-12' src={item.images[0].secure_url} alt="" />
                    {
                      showPopup == item._id ? (
                        <div className='sm:w-96'>
                          <div className='flex items-center justify-between'>
                            <button onClick={() => removeItem(item._id)} className='cursor-pointer hover:bg-red-500 bg-red-600 text-white px-2 py-1 text-xs active:bg-red-500'>Remove Product</button>
                            <Link to={`/updateproduct/${item._id}`} className='cursor-pointer hover:bg-gray-700 bg-black text-white px-2 py-1 text-xs active:bg-gray-700'>Update Product</Link>
                            <button onClick={() => setShowPopup(null)} className='cursor-pointer hover:bg-gray-700 bg-black text-white px-2 py-1 text-xs active:bg-gray-700'>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>{item.name}</p>
                          <p>{item.category}</p>
                          <p>₹ {item.price}</p>
                          <p onClick={() => setShowPopup(item._id)} className='text-right mx-auto cursor-pointer text-lg'>
                            <BsThreeDots />
                          </p>
                        </>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </>
        )}

    </>
  )
}

export default List