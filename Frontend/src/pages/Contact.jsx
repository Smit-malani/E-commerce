import React from 'react'
import Title from '../components/Title'
import contactUs from '../assets/contactUs.jpg'

function Contact() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row md:items-center gap-10 mb-10'>
        <img className='w-full md:max-w-[450px]' src={contactUs} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
          <p className='font-semibold text-xl'>Our Store</p>
          <p className='text-base'>364515 Shop-Sphere <br/> Shop 104, Savar Kundla, <br/>Amreli, Gujarat, India</p>
          <p className='text-base'>Tel: +91-875-899-4652 <br/>shop@sphere.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact