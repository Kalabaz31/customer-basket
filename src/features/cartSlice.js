import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";


const initialState = {

    cartItems: [],
    offers: [{
        purchasedItem: "butter",
        purchasedItemQuantity: 2,
        discountItem: "bread",
        discountQuantity: 1,
        discount: 0.5
    },
    {
        purchasedItem: "milk",
        purchasedItemQuantity: 4,
        discountItem: "milk",
        discountQuantity: 1,
        discount: 1
    }
    ],
};



const discountResult = (offers, cartItems) => {


    return cartItems.map(item => {

        let isDiscountAvailable = offers.filter(offer => {
            return offer.discountItem.toLowerCase() === item?.name.toLowerCase()
        })[0]


        let discountedPrice = 0;

        if (isDiscountAvailable) {
            const { purchasedItem, purchasedItemQuantity, discountQuantity, discount } = isDiscountAvailable

            let purchasedQuantity = cartItems.filter(item => item.name.toLowerCase() === purchasedItem.toLowerCase())[0]?.quantity;

            let isDiscoundApplied = purchasedQuantity % purchasedItemQuantity == 0

            let discountQuantityCoeff = parseInt(purchasedQuantity / purchasedItemQuantity)

            let discountQuantityPerPurchase = item.quantity % discountQuantityCoeff == 0 ? discountQuantityCoeff : item.quantity > discountQuantityCoeff ?  discountQuantityCoeff : item.quantity % discountQuantityCoeff


            if (discountQuantityCoeff) {
                discountedPrice = discountQuantityPerPurchase * discountQuantity * discount * item.cost;
            }




        }


        return { ...item, discount: discountedPrice, priceAfterDiscount: Number(item.price - discountedPrice).toFixed(2) }
    })

}

const itemTotalCost = (cartItems, item, quantity) => {
    let price = item.cost * (quantity)
    return price.toFixed(2)
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, { payload }) => {
            let itemQuantityInCart = state.cartItems.filter(item => item.name === payload.name)[0]?.quantity
            if (!!!itemQuantityInCart) {
                state.cartItems = [...state.cartItems, { ...payload, quantity: 1, price: itemTotalCost(state.cartItems, payload, 1) }]
            } else {
                state.cartItems = state.cartItems.map(item => item.name !== payload.name ? item : { ...item, quantity: item.quantity + 1, price: itemTotalCost(state.cartItems, item, item.quantity + 1) })
            }


            state.cartItems = discountResult(current(state.offers), state.cartItems)
        },
        removeItemFromCart: (state, { payload }) => {
            let itemQuantityInCart = state.cartItems.filter(item => item.name === payload.name)[0]?.quantity

            if (itemQuantityInCart == 1) {
                state.cartItems = state.cartItems.filter(item => item.name !== payload.name)
            } else {
                state.cartItems = state.cartItems.map(item => item.name !== payload.name ? item : { ...item, quantity: item.quantity - 1, price: itemTotalCost(state.cartItems, item, item.quantity - 1) })
            }

            state.cartItems = discountResult(current(state.offers), state.cartItems)
        },
    },
});

export const { reset, addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
