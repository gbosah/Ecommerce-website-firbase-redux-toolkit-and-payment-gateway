import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [],
    amount: 0,
    total: 0,
    isLoading: false
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, {payload}) => {

            const itemIndex = state.cartItems.findIndex((item) => item.id === payload.id);

            if(itemIndex >= 0) {
                state.cartItems[itemIndex] = {
                    ...state.cartItems[itemIndex],
                    cartQuantity: state.cartItems[itemIndex].cartQuantity + 1
                }
            } else {
                const addproduct = {...payload, cartQuantity: 1}
                state.cartItems.push(addproduct)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },

        increment: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.cartQuantity = cartItem.cartQuantity + 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decrement: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            cartItem.cartQuantity = cartItem.cartQuantity - 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        remove: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => 
            item.id !== itemId )
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            return state
        },
        calculateTotal: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.price * item.cartQuantity;
            });
            state.amount = amount
            state.total = total
        },
        addCheckout: (state, {payload}) => {
            const itemList = {payload};
            state.cartItems = state.cartItems.forEach((items) => items.id === itemList)
            return state
        }
    }
});

export const { addCart, increment, decrement, remove, calculateTotal, addCheckout } = cartSlice.actions;

export default cartSlice.reducer;