import { createSlice } from "@reduxjs/toolkit";


const totalAmountSlice = createSlice({
    name: 'totalAmount',
    initialState: 0 ,
    reducers:{
        setTotalAmountCart(state, action){ 
            const amount = action.payload + 50            
            state = amount
            return state
        }
    }
})

export const {setTotalAmountCart} = totalAmountSlice.actions
export default totalAmountSlice.reducer