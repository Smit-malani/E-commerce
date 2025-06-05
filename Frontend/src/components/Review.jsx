import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsThreeDots } from "react-icons/bs"
import { FaStar, FaRegStar } from 'react-icons/fa'

function Review({ reviews, productId }) {

    const [activeMenu, setActiveMenu] = useState(null)
    const [allReviews, setAllReviews] = useState(reviews)

    const userToken = localStorage.getItem("token")

    function handleToggleMenu(index) {
        setActiveMenu(activeMenu === index ? null : index)
    }

    async function handleDeleteReview(reviewId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/review/${reviewId}`, { data: { productId }, headers: { Authorization: `Bearer ${userToken}` } })

            if (res.status == 200) {
                setAllReviews(prev => prev?.filter(r => r._id !== reviewId))
                setActiveMenu(null)
                toast.success('Review deleted')
            }

        } catch (err) {
            console.log(err)
            toast.error("internal server error")
        }
    }


    return (
        <div className="mt-8 border-t  pt-4 px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Customer Reviews</h2>

            {reviews?.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base">No reviews yet.</p>
            ) : (
                <div className="space-y-4 sm:w-1/2">
                    {reviews?.map((review, index) => (
                        <div
                            key={index}
                            className="border p-4 sm:p-2 sm:px-4 bg-white relative"
                        >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center">
                                        <img
                                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${review?.user?.name}`}
                                            alt="User Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm ">
                                            {review?.user?.name || 'Anonymous'}
                                        </p>

                                        <p className="text-xs sm:text-xs text-gray-400 mt-1 sm:mt-0">
                                            {new Date(review.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>
                                <div className='flex items-center gap-5'>

                                    <button
                                        onClick={() => handleToggleMenu(index)}
                                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        <BsThreeDots />
                                    </button>
                                </div>
                            </div>
                            <div className='flex  justify-between items-center gap-3'>
                                <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
                                <div className="flex text-yellow-400 text-sm mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>
                                            {i < review.rating ? <FaStar /> : <FaRegStar />}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* review dropdown menu */}

                            {activeMenu === index && (
                                <div className="absolute right-4 top-1 sm:top-7 bg-white border w-40 z-10">
                                    <button
                                        onClick={() => handleDeleteReview(review._id)}
                                        className="w-full px-4 py-1 text-left hover:bg-gray-200 text-xs cursor-pointer"
                                    >
                                        Delete Review
                                    </button>
                                    <button
                                        onClick={() => setActiveMenu(null)}
                                        className="w-full px-4 py-1 text-left hover:bg-gray-200 text-xs text-red-500 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Review