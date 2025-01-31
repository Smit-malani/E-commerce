import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoAddCircleOutline } from "react-icons/io5"
import { CiBoxList } from "react-icons/ci"
import { PiBasket } from "react-icons/pi"

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r-[1px] border-gray-300'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink to={'/add'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
          <IoAddCircleOutline />
          <p className='hidden md:block text-sm'>Add Items</p>
        </NavLink>
        <NavLink to={'/'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
          <CiBoxList />
          <p className='hidden md:block text-sm'>Listed Items</p>
        </NavLink>
        <NavLink to={'/order'} className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
          <PiBasket />
          <p className='hidden md:block text-sm'>Orders</p>
        </NavLink>



      </div>
    </div>
  )
}

export default Sidebar