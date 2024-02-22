
import Axios from './Caller.service';

const registerUsers = async (credentials) => {
    /**
     * Sends a PUT request to the '/auth/register' endpoint using Axios.
     * 
     * @param {Object} credentials - An object containing the user's registration information.
     * @param {string} credentials.username - The username of the user.
     * @param {string} credentials.password - The password of the user.
     * @param {string} credentials.email - The email of the user.
     * 
     * @throws {Error} If an error occurs during the request.
     */
    try {
        await Axios.put('/auth/register', credentials);
    } catch (error) {
        console.error('Error during user registration:', error);
        throw error;
    }
};

const updateUserProfile = async (id, formData) => {
    try {
        const response = await Axios.patch(`/users/${id}`, formData);

        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserProfile = async (id) => {
    try {
        const response = await Axios.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getAllUser = async () => {
    try {
        const response = await Axios.get(`/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const GetAllRoles = async () => {
    try {
        const response = await Axios.get(`/roles`);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const UsersService = {
    registerUsers,
    updateUserProfile,
    getUserProfile,
    getAllUser,
    GetAllRoles
};

export default UsersService;
