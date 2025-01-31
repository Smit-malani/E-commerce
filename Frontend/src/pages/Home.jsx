import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Hero from '../components/Hero'
import axios, { all } from 'axios'
import LatestCollection from '../components/LatestCollection'
import {useDispatch, useSelector} from 'react-redux'
import { setallProduct } from '../utils/slice/productSlice'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'


function Home({allProduct}) {

  return (
    <div>
        <Hero/>
        <LatestCollection allProduct={allProduct}/>
        <BestSeller allProduct={allProduct}/>
        <OurPolicy/>
    </div>
  )
}

export default Home