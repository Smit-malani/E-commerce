import React from 'react'

function Navbar({ setToken }) {
  return (
    <div className=' px-5 flex items-center justify-between py-5 font-medium border-b-[1px] border-gray-300'>
      <div className='flex flex-col items-start'>
        <h1 className='uppercase font-bold'>Shop <span className='text-[#C586A5]'>Sphere</span></h1>
        <p className=' uppercase font-light text-black text-xs'>Admin Panel</p>
      </div>
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 text-xs cursor-pointer font-light hover:bg-gray-800'>Log Out</button>
    </div>
  )
}

export default Navbar