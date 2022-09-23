import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../productCard/ProductCard'
import "./ProductsList.scss"
import { productsList } from '../../data/productsList'


const ProductsList = () => {


    return (
        <div className='app__products-list'>

            {productsList && productsList?.map(product => (
                <ProductCard key={product.name} item={product} />
            ))}

        </div>
    )
}

export default ProductsList