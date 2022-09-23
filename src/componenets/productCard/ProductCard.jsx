import React from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../features/cartSlice'
import "./ProductCard.scss"

const ProductCard = ({ item }) => {

  const dispatch = useDispatch()

  const addToCart = (item) => {
    dispatch(addItemToCart(item))
  }

  return (
    <div className='app__product-card'>

      <div className="app__product-card__img">
        <img src={item.img} alt={item.name} />
      </div>

      <div className="app__product-card__details">
        <div className="app__product-card__details__title-rating">
          <h4 className='title'>{item.name}</h4>
          <img className='rating' src="https://www.heaj.be/wp-content/uploads/2020/03/5-etoiles-png-5-1.png" alt="" />
        </div>

        <div className="app__product-card__details__description-price">
          <p>
            {item.desc}
          </p>
          <h4>
            £{item.cost.toFixed(2)}</h4>
        </div>

        <div className="app__product-cart__details__action">
          <button onClick={() => addToCart(item)}> ADD TO CART </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard