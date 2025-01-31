import React, { useEffect, useState } from "react"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setallProduct } from "./utils/slice/productSlice"
import toast from "react-hot-toast"
import Search from "./components/Search"
import { setCartData } from "./utils/slice/cartItemSlice"


function App() {

  const dispatch = useDispatch()
  const dispatch1 = useDispatch()
  const { allProduct } = useSelector(slice => slice.allProducts)
  const [token, setToken] = useState(localStorage.getItem('token'))

  async function fetchProduct() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      dispatch(setallProduct(res.data.product))
    } catch (err) {
      toast.error("internal server error")
    }
  }

  async function fetchCartData(){
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/get`, {headers: {Authorization: `Bearer ${token}`}})
      dispatch1(setCartData(res.data.cartData))
    } catch (err) {
      toast.error("internal server error")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(()=>{
    fetchCartData()
  },[dispatch1, token])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#FAF9F6]'>
      <Navbar />
      <Search/>
      <Routes>
        <Route path="/" element={<Home allProduct={allProduct} />} />
        <Route path="/collection" element={<Collection allProduct={allProduct} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
