import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

async function addToCartDB(itemId, size, token){
    try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/add`,{itemId, size}, {headers : {Authorization: `Bearer ${token}`}})
    toast.success("item added")
    return res   
    } catch (err) {
        toast.error("internal server error")
    }
}



const cartItemSlice = createSlice({
    name: 'cartItem',
    initialState :{} ,
    reducers:{
    addToCart(state, action){
            const {productId, size, token} = action.payload
            const res = addToCartDB(productId, size, token)
            const key = `${productId}_${size}`           
            if(state[key]){
                state[key].quantity +=1
            }else{
                state[key] = {productId, size, quantity: 1}
            }
    },
    setCartData(state, action){
        const dbCartData = action.payload
        const transformedCart = {}

        Object.entries(dbCartData).forEach(([productId, sizes]) => {
            Object.entries(sizes).forEach(([size, quantity]) => {
                const key = `${productId}_${size}`;
                transformedCart[key] = { productId, size, quantity };
            });
        });

        return transformedCart; 
    }
    }
})

export const {addToCart, setCartData} = cartItemSlice.actions
export default cartItemSlice.reducer