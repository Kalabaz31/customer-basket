import React from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../features/cartSlice'
import "./CartItem.scss"


const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    const addToCart = (item) => {
        dispatch(addItemToCart({ name: item.name, cost: item.cost }))
    }
    const removeFromCart = (item) => {
        dispatch(removeItemFromCart({ name: item.name }))
    }


    return (

        <div className='app__cart__item'>
            <div className="item-img">
                <img src={item?.img} alt="" />
            </div>

            <div className="item-details">
                <p>{item?.name}</p>
                <div className="item-quantity">
                    <p>quantity</p>

                    <div className="actions">
                        <button onClick={() => removeFromCart(item)}>
                            -
                        </button>
                        <span>{item?.quantity}</span>
                        <button onClick={() => addToCart(item)}>
                            +
                        </button>
                    </div>
                </div>
            </div>


            <div className="item-prices">

                {item?.priceAfterDiscount != item?.price &&

                    <h4 className='item-price'>
                        £{item?.price}
                    </h4>
                }

                <h4 className='item-priceAfterDiscount'>
                    £{item?.priceAfterDiscount}
                </h4>
            </div>
        </div>

    )
}

export default CartItem