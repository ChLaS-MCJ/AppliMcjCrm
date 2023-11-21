export const selectAuth = state => {
  /**
   * Retrieves the `Auth` state from the Redux store.
   *
   * @param {object} state - The Redux store state.
   * @returns {any} The `Auth` state from the Redux store.
   *
   * @example
   * import { selectAuth } from './selectors';
   *
   * const mapStateToProps = state => {
   *   const auth = selectAuth(state);
   *   // Use the auth state here
   * };
   */
  return state.Auth;
}