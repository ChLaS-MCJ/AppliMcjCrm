// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
    name: 'UserStore',
    initialState: { id: 1 },
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
    },
});
