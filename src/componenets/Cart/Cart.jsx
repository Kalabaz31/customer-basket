import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../CartItem/CartItem'
import "./Cart.scss"
import { AiOutlineShoppingCart } from "react-icons/ai"
const Cart = () => {
    const { cartItems, totalDiscount } = useSelector(state => state.cart)


    return (
        <div className='app__cart'>

            <h2 className='app__cart__header'>
                CART <AiOutlineShoppingCart />
            </h2>

            {
                cartItems && cartItems?.map(product => (
                    <CartItem key={product.name} item={product} />
                ))
            }

            <div className="total">
                <p>Subtotal
                    <span>
                        £{totalDiscount?.subTotal?.toFixed(2)}
                    </span>
                </p>

                <p>Discount
                    <span>
                        £{totalDiscount?.discount?.toFixed(2)}
                    </span>
                </p>

                <p>Total
                    <span>
                        £{totalDiscount?.total?.toFixed(2)}
                    </span>
                </p>
            </div>



        </div>
    )
}

export default Cart