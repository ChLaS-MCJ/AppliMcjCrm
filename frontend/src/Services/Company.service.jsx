// services/CompanyService.js

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

const UpdateCompany = async (id, updatedData) => {
    try {
        const response = await Axios.patch(`/company/${id}`, updatedData);
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

export const CompanyService = {
    GetAllCompany,
    GetOneCompany,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
};

export default CompanyService;
