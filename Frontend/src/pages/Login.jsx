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
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  const [phoneErrorMessage, setPhoneErrorMessage] = useState()
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  async function onSubmitHandler(e) {

    e.preventDefault()
    
    if (currentState == 'Sign Up' && !name || nameErrorMessage) {
      setNameErrorMessage('only alphabets are allowed')
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    if (!password || !passwordRegex.test(password) || passwordErrorMessage) {
      setPasswordErrorMessage('Password must contain at least 4 characters, one uppercase, one lowercase, one number, and one special character.')
      return
    }


    if (currentState == 'Login') {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, password })
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.user)
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
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, { name, email, password, phoneNumber})
        
        if (res.status == 201) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.user)
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
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate],)

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-700' />
      </div>

      {/* input name if page is register */}
      {currentState == 'Login' ? '' : (
        <>
          <input onChange={(e) => {
            const value = e.target.value
            if (/^[a-zA-Z\s]*$/.test(value)) {
              setName(value)
              setNameErrorMessage('')
            } else {
              setNameErrorMessage('Only alphabets are allowed')
            }
          }}
            type='text'
            value={name}
            required
            className='w-full px-3 py-2 border border-gray-700'
            placeholder='Full - Name'
          />
          {
            nameErrorMessage && <p className='text-red-500 text-sm'>{nameErrorMessage}</p>
          }

          <input
            required
            onChange={(e) => {
              const value = e.target.value
              setPhoneNumber(value)

              const phoneRegex = /^\d{10}$/
              if (!phoneRegex.test(value)) {
                setPhoneErrorMessage('Phone number must be exactly 10 digits!')
              } else {
                setPhoneErrorMessage('')
              }

            }}
            value={phoneNumber}
            className='w-full px-3 py-2 border border-gray-700'
            type="number"
            placeholder='Phone'
          />

          {
            phoneErrorMessage && <p className='text-red-500 text-sm'>{phoneErrorMessage}</p>
          }
        </>
      )}


      {/* input email */}
      <input
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        type='email'
        value={email}
        required
        className='w-full px-3 py-2 border border-gray-700'
        placeholder='Email'
      />

      {/* input password */}
      <div className='relative w-full'>
        <input
          onChange={(e) => {
            const value = e.target.value
            setPassword(value)

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
            if (!passwordRegex.test(value)) {
              setPasswordErrorMessage('Password must contain at least 4 characters, one uppercase, one lowercase, one number and one special character')
            } else {
              setPasswordErrorMessage('')
            }
          }}
          type={showPassword ? 'text' : 'password'}
          value={password}
          required
          className='w-full px-3 py-2 border border-gray-700'
          placeholder='Password'
        />

        {
          showPassword ? (
            <GoEye onClick={() => {
              setShowPassword(false)
            }}
              className='absolute top-1/2 -translate-y-1/2 right-2  opacity-50 cursor-pointer text-black'
            />
          ) : (
            <GoEyeClosed
              onClick={() => {
                setShowPassword(true)
              }}
              className='absolute text-black top-1/2 -translate-y-1/2 right-2  opacity-50 cursor-pointer' />
          )
        }

      </div>
      {
        passwordErrorMessage && <p className='text-red-500 text-sm'>{passwordErrorMessage}</p>
      }

      {/* button */}
      <div className='w-full text-sm mt-[-8px]'>
        {
          currentState == 'Login'
            ? (
              <p onClick={() => {
                setCurrentState('Sign Up')
              }}
                className='cursor-pointer hover:text-black hover:underline'>
                Create account
              </p>
            ) : (
              <p onClick={() => {
                setCurrentState('Login')
              }}
                className='cursor-pointer hover:text-black hover:underline'>
                Login here
              </p>
            )
        }
      </div>
      <button className={`bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer hover:bg-gray-800`}>
        {currentState == 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login