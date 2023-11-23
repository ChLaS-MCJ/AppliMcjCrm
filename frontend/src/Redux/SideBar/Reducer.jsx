/**
 * Redux reducer function for handling authentication state.
 *
 * @module SideBarReducer
 * @param {Object} state - The current state of the authentication reducer.
 * @returns {Object} - The updated state based on the dispatched action.
 */
import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    collapsed: false,
};

export const sideBarReducer = createSlice({
    name: "SideBar",
    initialState: INITIAL_STATE,
    reducers: {
        /**
         * Reducer function for setCollapsed.
         *
         * @function setCollapsed
         * @param {Object} state - The current state of the authentication reducer.
         */
        setCollapsed: (state, action) => {
            state.collapsed = action.payload;
        },

    },

})
