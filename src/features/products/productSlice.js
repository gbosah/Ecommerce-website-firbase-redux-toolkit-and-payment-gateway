import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios  from "axios";

const url = 'https://shortcart-api.herokuapp.com/cartItems'


const initialState = {
    productItems: [],
    isLoading: true
};

export const getCartItems = createAsyncThunk('cart/getCartItems',
async(thunkAPI) => {
    try {

        const resp = await axios(url);

        return resp.data;

    } catch(error) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      
    },

    extraReducers: {
       [getCartItems.pending]: (state) => {
           state.isLoading = true
       },
       [getCartItems.fulfilled]: (state, action) => {
           state.isLoading = false
           state.productItems = action.payload
       },
       [getCartItems.rejected]: (state) => {
           state.isLoading = false
       },
    }
});

export const { addCart } = productSlice.actions

export default productSlice.reducer;