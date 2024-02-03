
import Axios from './Caller.service';

const GetAllCountries = async () => {
    try {
        const response = await Axios.get('/country');
        return response.data;
    } catch (error) {
        console.error('Error getting countries:', error);
        throw error;
    }
};

const GetOneCountry = async (id) => {
    try {
        const response = await Axios.get(`/country/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting country details:', error);
        throw error;
    }
};

export const Countryservice = {
    GetAllCountries,
    GetOneCountry,
};

export default Countryservice;
