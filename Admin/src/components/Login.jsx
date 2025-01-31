import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'


function Login({setToken}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function onSubmitHandler(e) {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin-login`,{email, password})
      if(res.status == 200){
        setEmail('')
        setPassword('')
        toast.success("Sign In successfully")
        setToken(res.data.token)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-black mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm text-gray-700 font-medium mb-2'>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email' required className='w-full px-3 py-2 border border-gray-700'/>
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm text-gray-700 font-medium mb-2'>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='w-full px-3 py-2 border border-gray-700'/>
          </div>
          <button className='mt-2 text-white bg-black w-full py-2 px-4 hover:bg-gray-800 cursor-pointer'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login