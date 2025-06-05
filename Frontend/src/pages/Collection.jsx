import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowForward } from "react-icons/io"
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { setallProduct } from '../utils/slice/productSlice'
import toast from 'react-hot-toast'
import axios from 'axios'


function Collection() {

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [product, setProduct] = useState([])
  const [sortType, setSortType] = useState('relavent') 
  
  let {searchQuery} = useSelector(slice => slice.searchQuery)
  const {showSearch} = useSelector(slice => slice.toogleSearch)  

  async function fetchProduct() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      if(res.status == 200){
        setProduct(res.data.product)
        setFilterProduct(res.data.product)
      }
    } catch (err) {
      toast.err("internal server error")
    }
  }

  function toggleCategory(e){
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item != e.target.value ))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  function toogleSubCategory(e){
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item != e.target.value))
    }else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  function applyFilter(){
    let productCopy = [...product]

    if(searchQuery){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      if(showSearch == false){
        productCopy = [...product]
      }
    }

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProduct(productCopy)
  }

  function sortProduct(){
    let fpCopy = [...filterProducts]

    switch(sortType){
      case 'low-high':
        setFilterProduct(fpCopy.sort((a, b)=> a.discountedPrice - b.discountedPrice))
        break;

      case 'high-low':
        setFilterProduct(fpCopy.sort((a,b)=> b.discountedPrice - a.discountedPrice))
        break;

      case 'high-low-offer':
        setFilterProduct(fpCopy.sort((a,b)=> b.discount - a.discount))
        break;

        case 'low-high-offer':
          setFilterProduct(fpCopy.sort((a,b)=> a.discount - b.discount))
          break;

      default:
        applyFilter()
        break;
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, searchQuery, showSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Option */}
      <div className='min-w-60 mb-5 sm:mb-0'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
          <IoIosArrowForward className={`sm:hidden ${showFilter ? ' rotate-90' : ' '}`} />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 bg-white ${showFilter ? ' ' : ' hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 bg-white mt-6 ${showFilter ? ' ' : ' hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toogleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toogleSubCategory}/> Bottomwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-2'>
          <Title text1={'ALL'} text2={'COLLECTION'} />

          {/* Product Sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm sm:px-2 '>
            <option value={"relavent"}>Sort By: Relavent</option>
            <option value={"low-high"}>Sort By: Low to High</option>
            <option value={"high-low"}>Sort By: High to Low</option>
            <option value={"high-low-offer"}>Sort By: High to Low Offer</option>
            <option value={"low-high-offer"}>Sort By: Low to High Offer</option>
          </select>
        </div>

        {/* Map Product */}
        <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 sm:mt-0'>
          {
            filterProducts && filterProducts.length > 0 ? (
              filterProducts?.map((item, index) => (
                <ProductItem key={index} productId={item._id} image={item.images} name={item.name} price={item.price} offerEnabled={item?.offerEnabled} quantity={item.quantity} discount={item?.discount} discountedPrice={item?.discountedPrice}/>
              ))
            ):(
              <p className="text-center col-span-full text-gray-500 text-3xl mt-16 font-medium">No product found.</p>
            )
          }
        </div>

      </div>

    </div>
  )
}

export default Collection