import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        form: (state, {payload}) => {
            const addForm = {...payload}
            state.order.push(addForm)
        }
    }
});

export const { form} = orderSlice.actions;

export default orderSlice.reducer;