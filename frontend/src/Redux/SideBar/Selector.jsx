export const selectSideBar = state => {
    /**
     * Retrieves the `SideBar` state from the Redux store.
     *
     * @param {object} state - The Redux store state.
     * @returns {any} The `SideBar` state from the Redux store.
     *
     * @example
     * import { selectAuth } from './selectors';
     *
     * const mapStateToProps = state => {
     *   const SideBar = selectSideBar(state);
     *   // Use the auth state here
     * };
     */
    return state.SideBar;
}