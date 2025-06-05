import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Orders from "../src/pages/Order"
import Add from "../src/pages/Add"
import List from "../src/pages/List"
import Sidebar from "../src/components/Sidebar"
import UpdateProduct from "./pages/UpdateProduct"


function App() {

  const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')

  useEffect(() => {
    localStorage.setItem('adminToken', token)
  }, [token])

  return (
    <div className='min-h-screen bg-gray-50'>
      {
        token == ''
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[25px] my-8 teaxt-gray-700 text-base">
                <Routes>
                  <Route path="/add" element={<Add  token={token}/>} />
                  <Route path="/" element={<List token={token}/>} />
                  <Route path="/order" element={<Orders token={token} />} />
                  <Route path="/updateproduct/:id" element={<UpdateProduct token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App
