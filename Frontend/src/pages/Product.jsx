import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import RelatedProduct from '../components/RelatedProduct'
import { useDispatch } from 'react-redux'
import { addToCart } from '../utils/slice/cartItemSlice'
import { setReview } from '../utils/slice/productSlice'
import Review from '../components/Review'

function Product() {

  const { productId } = useParams()
  const [productData, setProductData] = useState()
  const [image, setImage] = useState('')
  const [sizes, setSizes] = useState('')
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [reviewComment, setReviewComment] = useState('')
  const [reviewRating, setReviewRating] = useState('')


  async function fetchProductById() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`)

      setProductData(res.data.product)
      setImage(res.data.product.images[0].secure_url)

    } catch (err) {
      console.log(err)
      toast.error("internal server error")
    }
  }

  function handleAddToCart(productId, size) {
    if (!productId) {
      return toast.error("select product")
    }

    if (!sizes) {
      return toast.error("select Sizes")
    }
    dispatch(addToCart({ productId, size, token }))
  }

  async function handleSubmitReview() {
    if (!token) {
      return toast.error('Login required')
    }

    if (!reviewComment.trim()) {
      return toast.error("Please write a review comment");
    }

    if (reviewRating < 1 || reviewRating > 5) {
      return toast.error("Rating must be between 1 and 5");
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/review/${productId}`, { rating: reviewRating, comment: reviewComment }, { headers: { Authorization: `Bearer ${token}` } })
      if (res.status == 201) {
        setReviewComment('')
        setReviewRating('')
        toast.success('Review submitted!')
        dispatch(setReview({ productId, review: res.data.review }))
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Error submitting review');
    }
  }

  useEffect(() => {
    fetchProductById()
  }, [productId])

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* product Data */}
      <div className='flex gap-2 sm:gap-12 flex-col sm:flex-row'>

        {/* product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-evenly sm:justify-normal sm:w-[18%] w-full'>
            {
              productData?.images?.map((item, index) => (
                <img onClick={() => setImage(item.secure_url)} key={index} src={item.secure_url} className='w-[24%] h-[20%] sm:w-full object-cover sm:mb-3 cursor-pointer flex-shrink-0 border' />
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
          <p className='mt-3 text-2xl font-medium'>₹ {productData?.discountedPrice}</p>
          <p className='mt-5 text-gray-700 md:w-4/5'>{productData?.description}</p>
          <div className='flex flex-col gap-4 my-5'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData?.sizes?.length > 0 && productData?.sizes?.map((item, index) => (
                  <button onClick={() => setSizes(item)} className={`border border-gray-300 py-2 px-4 bg-gray-100 cursor-pointer ${item == sizes ? ' border-orange-500' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          {
            token ? (
              <button onClick={() => {
                handleAddToCart(productData._id, sizes)
              }}
                className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>
                ADD TO CART
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login')
                }}
                className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>
                LOGIN
              </button>
            )
          }
          <hr className='mt-8  sm:w-4/5' />
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery</p>
          </div>
        </div>
      </div>

      <RelatedProduct category={productData?.category} subCategory={productData?.subCategory} />

      {/* add product review */}

      <div className="mt-10 px-4 w-full sm:w-4/5 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

        <div className="flex flex-col gap-4">

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full h-28 p-3 border border-gray-300 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-[#C586A5]"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating (1 to 5):</label>
            <input
              type="number"
              id="rating"
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
              min="1"
              max="5"
              className="w-20 p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#C586A5]"
            />
          </div>

          {token ? (
            <button
              onClick={handleSubmitReview}
              className="bg-black text-white py-2 px-6 cursor-pointer hover:bg-gray-800  self-start"
            >
              Submit Review
            </button>
          ) : (
            <>
            <button
              onClick={() => {
                navigate('/login')
              }}
              className='bg-black text-white py-2 px-6 cursor-pointer hover:bg-gray-800  self-start'>
              LOGIN
            </button>
            <p>*Please login to add review.</p>
            </>
          )}


        </div>
      </div>

      <div>
        <Review reviews={productData?.review} productId={productId} />
      </div>

    </div>
  )
}

export default Product