import React from 'react'
import { RiExchangeFundsFill } from "react-icons/ri"
import { MdVerified } from "react-icons/md"
import { BiSupport } from "react-icons/bi"


function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm sm:text-base text-gray-700'>
        
        <div>
            <RiExchangeFundsFill className='m-auto mb-3 text-3xl'/>
            <p className='font-semibold'>Easy  Exchange Policy</p>
            <p className='text-gray-500'>We offer hassale free exchange policy</p>
        </div>

        <div>
            <MdVerified className='m-auto mb-3 text-3xl'/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-500'>We provide 7 days free return policy</p>
        </div>

        <div>
            <BiSupport className='m-auto mb-3 text-3xl'/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-500'>We offer 24/7 customer support</p>
        </div>
   
    </div>
  )
}

export default OurPolicy