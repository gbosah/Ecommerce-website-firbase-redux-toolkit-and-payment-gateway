import {configureStore} from '@reduxjs/toolkit'
import modalReducer from './features/modal/modalSlice'
import productReducer from './features/products/productSlice'
import cartReducer from './features/cart/cartSlice'
import accountReducer from './features/account/accountSlice'
import orderReducer from './features/order/orderSlice'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        product: productReducer,
        cart: cartReducer,
        account: accountReducer,
        order: orderReducer
    },
});