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
    totalDiscount: {
        subTotal: 0,
        discount: 0,
        total: 0,
    }
};



const eachItemDiscount = (offers, cartItems) => {
    return cartItems.map(item => {

        let isDiscountAvailable = offers.filter(offer => {
            return offer.discountItem.toLowerCase() === item?.name.toLowerCase()
        })[0]


        let discountedPrice = 0;

        if (isDiscountAvailable) {
            const { purchasedItem, purchasedItemQuantity, discountQuantity, discount } = isDiscountAvailable

            let purchasedQuantity = cartItems.filter(item => item.name.toLowerCase() === purchasedItem.toLowerCase())[0]?.quantity;

            let discountQuantityCoeff = parseInt(purchasedQuantity / purchasedItemQuantity)

            let discountQuantityPerPurchase = item.quantity % discountQuantityCoeff == 0 ? discountQuantityCoeff : item.quantity > discountQuantityCoeff ? discountQuantityCoeff : item.quantity % discountQuantityCoeff


            if (discountQuantityCoeff) {
                discountedPrice = discountQuantityPerPurchase * discountQuantity * discount * item.cost;
            }
        }


        return { ...item, discount: discountedPrice, priceAfterDiscount: Number(item.price - discountedPrice).toFixed(2) }
    })
}

const totalDiscount = (cartItems) => {

    let discount, total, subTotal

    if (cartItems?.length > 0) {
        total = cartItems.reduce(
            (previousValue, currentValue) => {

                let previousPriceAfterDiscount = typeof (previousValue) === "number" ? previousValue : Number.parseFloat(previousValue?.priceAfterDiscount)
                let currentPriceAfterDiscount = Number.parseFloat(currentValue.priceAfterDiscount)

                return previousPriceAfterDiscount + currentPriceAfterDiscount

            }, 0
        );

        subTotal = cartItems.reduce(
            (previousValue, currentValue) => {

                let previousPrice = typeof (previousValue) === "number" ? previousValue : Number.parseFloat(previousValue?.price)
                let currentPrice = Number.parseFloat(currentValue.price)

                return previousPrice + currentPrice
            }, 0
        );
        discount = cartItems.reduce(
            (previousValue, currentValue) => {

                let previousDiscount = typeof (previousValue) === "number" ? previousValue : Number.parseFloat(previousValue?.discount)
                let currentDiscount = Number.parseFloat(currentValue.discount)
                return previousDiscount + currentDiscount
            }, 0
        );
    }

    return {
        subTotal: subTotal ? subTotal : 0,
        discount: discount ? discount : 0,
        total: total ? total : 0
    }
}



const itemTotalCost = (item, quantity) => {
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
                state.cartItems = [...state.cartItems, { ...payload, quantity: 1, price: itemTotalCost(payload, 1) }]
            } else {
                state.cartItems = state.cartItems.map(item => item.name !== payload.name ? item : { ...item, quantity: item.quantity + 1, price: itemTotalCost(item, item.quantity + 1) })
            }


            state.cartItems = eachItemDiscount(current(state.offers), state.cartItems)

            state.totalDiscount = totalDiscount((state.cartItems))

        },
        removeItemFromCart: (state, { payload }) => {
            let itemQuantityInCart = state.cartItems.filter(item => item.name === payload.name)[0]?.quantity

            if (itemQuantityInCart == 1) {
                state.cartItems = state.cartItems.filter(item => item.name !== payload.name)
            } else {
                state.cartItems = state.cartItems.map(item => item.name !== payload.name ? item : { ...item, quantity: item.quantity - 1, price: itemTotalCost(item, item.quantity - 1) })
            }

            state.cartItems = eachItemDiscount(current(state.offers), state.cartItems)

            state.totalDiscount = totalDiscount((state.cartItems))
        },
    },
});

export const { reset, addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
