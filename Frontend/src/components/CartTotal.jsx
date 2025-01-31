import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from './Title'
import { setTotalAmountCart } from '../utils/slice/totalAmountSlice'

function CartTotal() {

    const cartItem = useSelector(slice => slice.cartItem)
    const { allProduct } = useSelector(slice => slice.allProducts)
    const [totalAmount, setTotalAmount] = useState('')
    const dispatch = useDispatch()

    function getTotalAmount() {        
        let totalAmount1 = 0
        for (const items in cartItem) {       
            let itemInfo = allProduct.find((product)=> product._id == items.split('_')[0])
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item] > 0){
                        totalAmount1 += itemInfo.price * cartItem[items][item]
                    }
                } catch (err) {
                    //pass
                }    
            }   
        }
        setTotalAmount(totalAmount1)
        dispatch(setTotalAmountCart(totalAmount1))
    }

    useEffect(()=>{
        getTotalAmount()
    },[cartItem])

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'}/>
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>₹ {totalAmount}.00</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Shipping fee</p>
                    <p>₹ 50.00</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>₹ {totalAmount == 0 ? 0 : totalAmount + 50}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal