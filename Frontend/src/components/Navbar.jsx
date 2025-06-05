import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"
import { IoCartOutline } from "react-icons/io5"
import { TbMenuDeep } from "react-icons/tb"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux'
import { toogleSearch } from '../utils/slice/searchSlice'


function Navbar() {

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [token, setToken] = useState('')  
  const [name, setName] = useState('')
  const cartItem = useSelector((slice) => slice.cartItem)
  const cartCount = Object.values(cartItem).reduce((total, item) => total + item.quantity, 0);

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/login')
    setVisible(false)
  }

  useEffect(()=>{
    setName(localStorage.getItem('name'))
    setToken(localStorage.getItem('token'))
  },[localStorage.getItem('token')])

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}>
        <h1 className='uppercase font-bold'>Shop <span className='text-[#C586A5]'>Sphere</span></h1>
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col  items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col  items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col  items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col  items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        {
          location.pathname == '/collection' && <IoIosSearch className='text-xl cursor-pointer' onClick={() => dispatch(toogleSearch(true))} />
        }
        <div className='group relative'>
          <Link to={'/login'}>
          {
            token ?  <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`} 
            alt="User Profile"
            className="w-7 h-7 rounded-full object-cover"
          />: <FaRegUser className='cursor-pointer' />
          }
          </Link>
          {
            token
            && (
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-white border text-gray-700'>
                  <p onClick={()=> navigate('/user/profile')} className=' cursor-pointer hover:text-black hover:underline text-sm'>My Profile</p>
                  <p onClick={()=>navigate('/orders')} className=' cursor-pointer hover:text-black hover:underline text-sm'>Orders</p>
                  <p onClick={logout} className=' cursor-pointer hover:text-black hover:underline text-sm'>Logout</p>
                </div>
              </div>
            )
          }
        </div>
        <Link to={'/cart'} className='relative'>
          <IoCartOutline className='cursor-pointer text-lg' />
          <p className='absolute right-[-5px] bottom-[-5px] text-center w-3 flex justify-center items-center bg-black text-white aspect-square rounded-full text-[8px]'>{cartCount}</p>
        </Link>
        <div className='sm:hidden'>
          <TbMenuDeep className='cursor-pointer text-lg' onClick={() => setVisible(true)} />
        </div>
      </div>

      {/*Side bar menue for small screen*/}
      <div className={`absolute z-50 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-700 '>
          <div className='flex items-center gap-2 p-3 cursor-pointer' onClick={() => setVisible(false)}>
            <IoIosArrowBack />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to={'/'} className='py-2 pl-6 border-b-[1px]'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to={'/collection'} className='py-2 pl-6 border-b-[1px]'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to={'/about'} className='py-2 pl-6 border-b-[1px]'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to={'/contact'} className='py-2 pl-6 border-b-[1px]'>CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} to={'/orders'} className='py-2 pl-6 border-b-[1px]'>ORDERS</NavLink>
          <button className='py-2 pl-6 border-b-[1px] text-left' onClick={logout} >LOGOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar