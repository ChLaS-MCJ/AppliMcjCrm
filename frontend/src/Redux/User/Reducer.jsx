// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
    name: 'UserStore',
    initialState: {},
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
    },
});
