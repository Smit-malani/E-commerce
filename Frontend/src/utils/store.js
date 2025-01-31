import {configureStore} from '@reduxjs/toolkit'
import productSlice from './slice/productSlice'
import searchSlice from './slice/searchSlice'
import searchQuerySlice from './slice/searchQuerySlice'
import cartItemSlice from './slice/cartItemSlice'
import totalAmountSlice from './slice/totalAmountSlice'

const store = configureStore({
    reducer:{
      allProducts : productSlice,
      toogleSearch : searchSlice,
      searchQuery : searchQuerySlice,
      cartItem : cartItemSlice,
      totalAmount: totalAmountSlice
    }
})

export default store