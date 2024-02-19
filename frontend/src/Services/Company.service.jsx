import Axios from './Caller.service';

const GetAllCompany = async () => {
    try {
        const response = await Axios.get('/company');
        return response.data;
    } catch (error) {
        console.error('Error getting companies:', error);
        throw error;
    }
};

const GetOneCompany = async (id) => {
    try {
        const response = await Axios.get(`/company/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting company details:', error);
        throw error;
    }
};

const AddCompany = async (companyData) => {
    try {
        const response = await Axios.post('/company', companyData);
        return response.data;
    } catch (error) {
        console.error('Error during company addition:', error);
        throw error;
    }
};

const UpdateCompany = async (id, formData) => {
    try {
        const response = await Axios.patch(`/company/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error during company update:', error);
        throw error;
    }
};

const DeleteCompany = async (id) => {
    try {
        await Axios.delete(`/company/${id}`);
    } catch (error) {
        console.error('Error during company deletion:', error);
        throw error;
    }
};

const LinkCompany = async (value, clientID) => {
    try {
        const response = await Axios.patch(`/clients/linkcompany/${clientID}`, value);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la liaison de l\'entreprise au client :', error);
        throw error;
    }
};

export const CompanyService = {
    GetAllCompany,
    GetOneCompany,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    LinkCompany,
};

export default CompanyService;
