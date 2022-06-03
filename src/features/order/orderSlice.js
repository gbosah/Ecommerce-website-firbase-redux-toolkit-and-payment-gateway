import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: [],
    orderAmount: 0,
    orderTotal: 0
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, {payload}) => {

            const itemIndex = state.order.findIndex((item) => item.id === payload.id);

            if(itemIndex >= 0) {
                state.order[itemIndex] = {
                    ...state.order[itemIndex],
                    orderQuantity: state.order[itemIndex].orderQuantity + 1
                }
            } else {
                const addOrder = {...payload, cartQuantity: 1}
                state.order.push(addOrder)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.order))
        },
    }
});

export const { addOrder} = orderSlice.actions;

export default orderSlice.reducer;