import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


function Add({token}) {



  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBeseller] = useState(true)
  const [sizes, setSizes] = useState([])

  const [offerEnabled, setOfferEnabled] = useState(false)
  const [discount, setDiscount] = useState('')
  const [discountedPrice, setDiscountedPrice] = useState('')

  const [loading, setLoading] = useState(false)

  async function onSubmitHandler(e){
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('quantity',quantity)

      if(offerEnabled){
        formData.append('offerEnabled', offerEnabled)   
        formData.append('discount', discount)
        formData.append('discountedPrice', discountedPrice) 
    }

      // for image's
      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)

    
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/addproduct`,formData, {headers : {"Content-Type": "multipart/form-data"  , Authorization: `Bearer ${token}`}})
      if(res.status == 201){
        toast.success("Product added successfully")
        setLoading(false)
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setSizes([]);
        setOfferEnabled(true);
        setDiscount('');
        setDiscountedPrice('');
        setQuantity('')
      }
      
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='mb-2'>
        <p className='mb-3 font-medium'>Upload Image</p>
        <div className='flex flex-wrap sm:items-center gap-2'>
          <label htmlFor='image1' className='border h-20 w-16 overflow-hidden'>
            {
              image1
                ? <img className='h-20 w-16' src={URL.createObjectURL(image1)} alt="" />
                : <div className='h-20 w-16 bg-gray-200 text-xs text-gray-500 flex items-center text-center'>Upload Image</div>

            }
            <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image1' hidden />
          </label>
          <label htmlFor='image2' className='border h-20 w-16 overflow-hidden'>
            {
              image2
                ? <img className='h-20 w-16' src={URL.createObjectURL(image2)} alt="" />
                : <div className='h-20 w-16 bg-gray-200 text-xs text-gray-500 flex items-center text-center'>Upload Image</div>

            }
            <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' hidden />
          </label>
          <label htmlFor='image3' className='border h-20 w-16 overflow-hidden'>
            {
              image3
                ? <img className='h-20 w-16' src={URL.createObjectURL(image3)} alt="" />
                : <div className='h-20 w-16 bg-gray-200 text-xs text-gray-500 flex items-center text-center'>Upload Image</div>

            }
            <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id='image3' hidden />
          </label>
          <label htmlFor='image4' className='border h-20 w-16 overflow-hidden'>
            {
              image4
                ? <img className='h-20 w-16' src={URL.createObjectURL(image4)} alt="" />
                : <div className='h-20 w-16 bg-gray-200 text-xs text-gray-500 flex items-center text-center'>Upload Image</div>

            }
            <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='text-sm mb-2'>Product name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 placeholder:text-sm' type='text' placeholder='Type here...' required />
      </div>

      <div className='w-full'>
        <p className='text-sm mb-2'>Product description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 placeholder:text-sm' type='text' placeholder='Write Description here...' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2 text-sm'>Product Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} value={category} className='text-sm w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2 text-sm'>Sub Category</p>
          <select onChange={(e)=> setSubCategory(e.target.value)} value={subCategory} className='text-sm w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2 text-sm'>Product Price</p>
          <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" placeholder='199' className='text-sm px-3 py-2 w-full sm:w-[120px]' />
        </div>

        <div>
          <p className='mb-2 text-sm'>Product Quantity</p>
          <input onChange={(e)=> setQuantity(e.target.value)} value={quantity} type="number" placeholder='10 quantity' className='text-sm px-3 py-2 w-full sm:w-[120px]' />
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
              required
              value={discount}
              onChange={(e) => {
                const value = e.target.value;
                setDiscount(value);

                // Calculate discounted price
                if (price) {
                  const calculatedPrice = parseFloat(price) - (parseFloat(price) * parseFloat(value)) / 100;
                  setDiscountedPrice(calculatedPrice.toFixed(2)); // Round to 2 decimal places
                }
              }}
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

      <div className='flex gap-2 mt-2'>
        <input onChange={()=> setBeseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer text-sm' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button className={`${loading ? 'cursor-pointer ' : 'cursor-pointer '} w-28 py-2 mt-4 bg-black text-white text-sm hover:bg-gray-800`}>{loading ? "UPLOADING.." : "ADD"}</button>

    </form>
  )
}

export default Add