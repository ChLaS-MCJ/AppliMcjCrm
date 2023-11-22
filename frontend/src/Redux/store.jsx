/**
 * Configures the Redux store using the `configureStore` function from the `@reduxjs/toolkit` library.
 * Sets up the store with a reducer for the `Auth` slice of the state.
 *
 * @example
 * import { configureStore } from "@reduxjs/toolkit";
 * import { authReducer } from "@/Redux/Auth/Reducer";
 *
 * export const store = configureStore({
 *     reducer: {
 *         Auth: authReducer.reducer,
 *     }
 * })
 *
 * @returns {Object} The Redux store configured with the `Auth` reducer.
 */
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/Redux/Auth/Reducer";
import { sideBarReducer } from "@/Redux/SideBar/Reducer";

export const store = configureStore({
    reducer: {
        Auth: authReducer.reducer,
        SideBar: sideBarReducer.reducer,
    }
});