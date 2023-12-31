/**
 * A module that provides authentication-related functions such as login, logout, and token management.
 *
 * @module AuthService
 */

import Axios from './Caller.service';
import { jwtDecode } from "jwt-decode";

/**
 * Logs in the user with the provided credentials.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.username - The username.
 * @param {string} credentials.password - The password.
 * @param {boolean} credentials.remember - Flag indicating whether to remember the user's login.
 * @returns {Promise<Object>} - The response object from the login request.
 */
const login = async (credentials) => {
  const response = await Axios.post('/auth/login', credentials);

  saveTokenToLocalStorage(response.data.access_token);
  saveRefreshTokenToLocalStorage(response.data.refresh_token);
  return response;
};

/**
 * Checks if the user is logged in.
 *
 * @returns {boolean} - True if the user is logged in, false otherwise.
 */
const isLogged = () => {
  const TokenLocal = localStorage.getItem('auth');
  const TokenSession = sessionStorage.getItem('auth');

  return !!TokenLocal || !!TokenSession;
};

/**
 * Retrieves the authentication token.
 *
 * @returns {string|null} - The authentication token, or null if not found.
 */
const getToken = () => {
  return localStorage.getItem('auth') || sessionStorage.getItem('auth');
};

/**
 * Saves the provided token to the local storage.
 *
 * @param {string} token - The authentication token.
 */
const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('auth', token);
};

/**
 * Saves the provided refresh token to the local storage.
 *
 * @param {string} refreshToken - The refresh token.
 */
const saveRefreshTokenToLocalStorage = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};
/**
 * Retrieves the decoded information from the authentication token.
 *
 * @returns {Object|null} - The decoded information from the authentication token, or null if the token is not found or invalid.
 */
const getTokenInfo = () => {
  return jwtDecode(getToken());
};

/**
 * Logs out the user by removing the authentication token from the local storage.
 */
const logout = () => {
  localStorage.removeItem('auth');
};
/**
 * Requests a password reset for the user associated with the provided email.
 *
 * @param {Object} params - The parameters for the password reset request.
 * @param {string} params.email - The email address associated with the user.
 */
const requestPasswordReset = async ({ email }) => {
  await Axios.post('/auth/request-password-reset', { email });
};

/**
 * Resets the user's password using the provided password and reset token.
 *
 * @param {Object} params - The parameters for the password reset.
 * @param {string} params.password - The new password for the user.
 * @param {string} params.resettoken - The reset token for the user.
 */
const resetPassword = async ({ password, resettoken }) => {
  await Axios.post('/auth/reset-password', { password, resettoken });
};

/**
 * Retrieves the refresh token from the local storage.
 *
 * @returns {string|null} - The refresh token, or null if not found.
 */
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

/**
 * Requests a new access token using the provided refresh token.
 *
 * @param {string} refreshToken - The refresh token to use for obtaining a new access token.
 * @returns {Promise<string>} - The new access token.
 */
const refreshToken = async (refreshToken) => {
  const response = await Axios.post('/auth/refresh', { refresh_token: refreshToken });
  return response.data.access_token;
};

export const AuthService = {
  login,
  saveTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  logout,
  isLogged,
  getToken,
  getTokenInfo,
  requestPasswordReset,
  resetPassword,
  getRefreshToken,
  refreshToken,
};

export default AuthService;