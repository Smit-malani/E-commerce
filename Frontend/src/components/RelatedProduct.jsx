import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title'
import ProductItem from './ProductItem'

function RelatedProduct({ category, subCategory }) {

    const { allProduct } = useSelector(slice => slice.allProducts)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (allProduct.length > 0) {
            let productCopy = [...allProduct]
            productCopy = productCopy.filter((item) => category == item.category)
            productCopy = productCopy.filter((item) => subCategory == item.subCategory)
            
            const shuffledProducts = productCopy.sort(()=> Math.random() - 0.5)            
        
            setRelatedProduct(shuffledProducts.slice(0, 5))
        }
    }, [category, subCategory, allProduct,window.location.pathname])

    return (
        <div className=''>
            <div className=' text-center py-2 text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    relatedProduct?.map((item, index) => (
                        <ProductItem key={index} productId={item._id} image={item.images} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProduct