import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams,useNavigate } from 'react-router-dom'

function UpdateProduct() {

  const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')
  const productId = useParams().id

  const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
  
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [sizes, setSizes] = useState([])
  
    const [offerEnabled, setOfferEnabled] = useState(false)
    const [discount, setDiscount] = useState('')
    const [discountedPrice, setDiscountedPrice] = useState('')

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

  async function fetchProduct(){
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`,{ headers: { Authorization: `Bearer ${token}` } })
    const {data} = res
    
    setName(data.product.name)
    setDescription(data.product.description)
    setCategory(data.product.category)
    setSubCategory(data.product.subCategory)
    setPrice(data.product.price)
    setQuantity(data.product.quantity)
    setOfferEnabled(data.product.offerEnabled)
    setDiscount(data.product.discount)
    setDiscountedPrice(data.product.discountedPrice)
    setSizes(data.product.sizes)
  } catch (err) {
    console.log(err)
    toast.error('Internal server error')
  }
  }

  async function onSubmitHandler(e){
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/update/${productId}`,{name,description,price,quantity,category,subCategory,sizes,offerEnabled,discount,discountedPrice},{ headers: { Authorization: `Bearer ${token}` } })

      if(res.status == 200){
        toast.success("Product Updated")
        setLoading(false)
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      toast.error('Internal server error')
    }
    
  }



useEffect(()=>{
  fetchProduct()
}, [])



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='text-sm mb-2'>Product name</p>
        <input 
          onChange={(e)=> setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2 placeholder:text-sm' 
          type='text' 
          placeholder='Type here...' 
        />
      </div>

      <div className='w-full'>
        <p className='text-sm mb-2'>Product description</p>
        <textarea 
          onChange={(e)=> setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2 placeholder:text-sm' 
          type='text' 
          placeholder='Write Description here...' 
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2 text-sm'>Product Category</p>
          <select 
            onChange={(e)=> setCategory(e.target.value)} 
            value={category} 
            className='text-sm w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2 text-sm'>Sub Category</p>
          <select 
            onChange={(e)=> setSubCategory(e.target.value)} 
            value={subCategory} 
            className='text-sm w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2 text-sm'>Product Price</p>
          <input 
            onChange={(e)=> setPrice(e.target.value)} 
            value={price} 
            type="number" 
            placeholder='199' 
            className='text-sm px-3 py-2 w-full sm:w-[120px]' />
        </div>

        <div>
          <p className='mb-2 text-sm'>Product Quantity</p>
          <input 
            onChange={(e)=> setQuantity(e.target.value)} 
            value={quantity} 
            type="number" 
            placeholder='10 quantity' 
            className='text-sm px-3 py-2 w-full sm:w-[120px]' />
        </div>
      </div>

      <div>
        <p className='mb-2 text-sm'>Product Size</p>
        <div className='flex gap-3'>

          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !='S') : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? 'bg-pink-100 ' : 'bg-slate-200 '}px-3 py-1 font-light cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !='M') : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? 'bg-pink-100 ' : 'bg-slate-200 '}px-3 py-1 font-light cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !='L') : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? 'bg-pink-100 ' : 'bg-slate-200 '}px-3 py-1 font-light cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !='XL') : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? 'bg-pink-100 ' : 'bg-slate-200 '}px-3 py-1 font-light cursor-pointer`}>XL</p>
          </div>

        </div>
      </div>

      <div className='w-full'>
        <div className='felx items-center gap-2'>
        <input
            type="checkbox"
            id="offerEnabled"
            checked={offerEnabled}
            onChange={() => setOfferEnabled((prev) => !prev)}
          />
          <label htmlFor="offerEnabled" className='text-sm cursor-pointer ml-1'>Enable Offer</label>
        </div>
        {offerEnabled && (
          <div className='mt-3'>
            <p className='text-sm mb-2'>Discount Percentage</p>
            <input
              type="number"
              value={discount}
              onChange={(e) => {
                const value = e.target.value;
                setDiscount(value);
              //  Calculate discounted price
                if (price) {
                  const calculatedPrice = parseFloat(price) - (parseFloat(price) * parseFloat(value)) / 100;
                  setDiscountedPrice(calculatedPrice.toFixed(2)); 
                }
              }
            }
              placeholder="Enter discount percentage"
              className='w-full max-w-[200px] px-3 py-2 placeholder:text-sm border border-gray-700'
            />

            {discountedPrice && (
              <p className='text-sm mt-2'>
                Discounted Price: <span className='font-medium'>₹{discountedPrice}</span>
              </p>
            )}
            
          </div>
        )}
      </div>

      <button className={`${loading ? 'cursor-pointer ' : 'cursor-pointer '} w-28 py-2 mt-4 bg-black text-white text-sm hover:bg-gray-800`}>{loading ? "UPLOADING.." : "Update"}</button>

    </form>
  )
}

export default UpdateProduct