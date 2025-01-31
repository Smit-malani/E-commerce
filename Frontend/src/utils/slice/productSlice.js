import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        allProduct : []
    },
    reducers:{
        setallProduct(state, action){
            state.allProduct = action.payload
        }
    }
})

export const {setallProduct} = productSlice.actions
export default productSlice.reducer