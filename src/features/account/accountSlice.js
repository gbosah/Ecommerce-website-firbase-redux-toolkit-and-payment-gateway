import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.user =  action.payload
        },
        signUp: (state, action) => {
            state.user =  action.payload
        },
        logOut: (state) => {
            state.user = null;
        },
        reset: (state, action) => {
            state.user =  action.payload
        }
    }
});

export const { signIn, logOut, signUp, reset } = accountSlice.actions;

export default accountSlice.reducer;