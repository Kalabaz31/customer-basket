import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { butter_img } from '../../assets'
import { productsList } from '../../data/productsList'
import CartItem from '../CartItem/CartItem'
import "./Cart.scss"

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart)
    const [total, setTotal] = useState(0)

    useEffect(() => {

        if (cartItems?.length > 0) {
            const totalPriceAfterDiscount = cartItems.reduce(
                (previousValue, currentValue) => {
                    let previousPrice = typeof (previousValue) === "number" ? previousValue : Number.parseFloat(previousValue.priceAfterDiscount)
                    let currentPrice = Number.parseFloat(currentValue.priceAfterDiscount)
                    return previousPrice + currentPrice
                }, 0
            );
            setTotal(totalPriceAfterDiscount)
        }

        
    }, [cartItems])

    return (
        <div className='app__cart'>

            <h2 className='app__cart__header'>
                CART
            </h2>

            {
                cartItems && cartItems?.map(product => (
                    <CartItem key={product.name} item={product} />
                ))
            }

            <div className="total">
                <h5>Subtotal: {total.toFixed(2)} </h5>
            </div>



        </div>
    )
}

export default Cart