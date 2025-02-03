import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { GoEye } from "react-icons/go"
import { GoEyeClosed } from "react-icons/go"


function Login() {

  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmitHandler(e) {
    e.preventDefault()
    if (currentState == 'Login') {
      // console.log("Login api")
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password })
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)

          setEmail('')
          setPassword('')
          toast.success("Sign In successfully")
          navigate('/')
        }
      } catch (err) {
        toast.error(err.response.data.message)
      }

    } else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, { name, email, password })
        if (res.status == 201) {
          localStorage.setItem('token', res.data.token)
          setName('')
          setEmail('')
          setPassword('')
          toast.success("Sign Up successfully")
          navigate('/')
        }
      } catch (err) {
        toast.error(err.response.data.message)
      }
    }
  }


  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
      </div>
      {currentState == 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type='text' value={name} required className='w-full px-3 py-2 border border-gray-700' placeholder='Name' />}
      <input onChange={(e) => setEmail(e.target.value)} type='email' value={email} required className='w-full px-3 py-2 border border-gray-700' placeholder='Email' />
      <div className='relative w-full'>
        <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} value={password} required className='w-full px-3 py-2 border border-gray-700' placeholder='Password' />
        {
          showPassword ? <GoEye onClick={() => setShowPassword(false)} className='absolute top-1/2 -translate-y-1/2 right-2  opacity-50 cursor-pointer text-black' /> : <GoEyeClosed onClick={() => setShowPassword(true)} className='absolute text-black top-1/2 -translate-y-1/2 right-2  opacity-50 cursor-pointer' />
        }
      </div>
      <div className='w-full text-sm mt-[-8px]'>
        {
          currentState == 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-black hover:underline'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-black hover:underline'>Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer hover:bg-gray-800'>{currentState == 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login