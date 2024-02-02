
import Axios from './Caller.service';

const AddCompany = async (credentials) => {
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

const UpdateCompany = async (id, formData) => {
    try {
        const response = await Axios.patch(`/company/${id}`, formData);

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const CompanyService = {
    AddCompany,
    UpdateCompany,

};

export default CompanyService;
