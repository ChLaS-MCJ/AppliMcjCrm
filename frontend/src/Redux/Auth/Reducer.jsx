/**
 * Redux reducer function for handling authentication state.
 *
 * @module authReducer
 * @param {Object} state - The current state of the authentication reducer.
 * @param {Object} action - The action object dispatched to the reducer.
 * @returns {Object} - The updated state based on the dispatched action.
 */
import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  current: {},
  isLoading: false,
  isSuccess: false,
};

export const authReducer = createSlice({
  name: "Auth",
  initialState: INITIAL_STATE,
  reducers: {
      /**
       * Reducer function for logging out the user.
       *
       * @function logout
       * @param {Object} state - The current state of the authentication reducer.
       */
      logout: (state) => {
          state.isSuccess = false
          state.isLoading = false
          state.current = null
      },

      /**
       * Reducer function for setting the authentication token.
       *
       * @function setToken
       * @param {Object} state - The current state of the authentication reducer.
       * @param {Object} action - The action object containing the token payload.
       */
      setToken: (state, action) => {
          state.current = action.payload
          state.isLoading = false
          state.isSuccess = true
      },
  },

})
