import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        allProduct : []    
    },
    reducers:{
        setallProduct(state, action){
            state.allProduct = action.payload
        },
        setReview(state,action){
            const { productId, review } = action.payload;
            const productIndex = state.allProduct.findIndex(p => p._id === productId)
          console.log(productIndex)
            if (productIndex !== -1) {
              state.allProduct[productIndex].review.push(review.user);
            }
        }
    }
})

export const {setallProduct, setReview} = productSlice.actions
export default productSlice.reducer