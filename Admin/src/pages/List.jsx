import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function List({token}) {
  
  const[list, setList] = useState([])  

  async function fetchList() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      if(res.status == 200){
        setList(res.data.product)
      }
      
    } catch (err) {
      toast.error('Internal server error')
    }
  }

  async function removeItem(productId){
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/remove/${productId}`, {headers : {Authorization: `Bearer ${token}`}})
      if(res.status == 200){
        toast.success('Product Removed From Site')
        await fetchList()
      }
    } catch (err) {
      console.log(err)
      toast.error('Internal server error')
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
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
            list.map((item, index)=> (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'>
                <img className='w-12' src={item.images[0].secure_url} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>
                <p onClick={()=> removeItem(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
            ))
          }
      </div>
    </>
  )
}

export default List