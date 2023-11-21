/**
 * Creates and exports a configured Axios instance with base URL and interceptors.
 *
 * @module Code-Under-Test
 * @returns {Object} The configured Axios instance.
 *
 * @example
 * import Axios from './Code-Under-Test';
 *
 * Axios.get('/users')
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error(error);
 *   });
 */
import axios from 'axios'
import { API_BASE_URL } from '@/Config/ServerApiConfig';
import { AuthService } from './Auth.service'

// Configure Axios with base URL
const Axios = axios.create({
    baseURL: API_BASE_URL
})

// Add interceptor to include token in request headers
Axios.interceptors.request.use(async (request) => {
    if (AuthService.isLogged()) {
        const token = await AuthService.getToken();
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {

            const refreshToken = await AuthService.getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await AuthService.refreshToken(refreshToken);
                    const newAccessToken = response.data.access_token;

                    await AuthService.saveToken(newAccessToken);

                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    console.error('Erreur lors du rafraîchissement du jeton:', refreshError);
                    AuthService.logout();
                    window.location = '/login';
                    return Promise.reject(refreshError);
                }
            } else {
                // Si aucun refresh token n'est disponible, déconnectez l'utilisateur
                AuthService.logout();
                window.location = '/login';
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export default Axios