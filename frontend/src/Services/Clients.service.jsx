import Axios from './Caller.service';

const GetAllClients = async () => {
    try {
        const response = await Axios.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const GetOneClient = async (id) => {
    try {
        const response = await Axios.get(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting client details:', error);
        throw error;
    }
};

const AddClient = async (clientData) => {
    try {
        const response = await Axios.post('/clients', clientData);
        return response.data;
    } catch (error) {
        console.error('Error during client addition:', error);
        throw error;
    }
};

const UpdateClient = async (id, formData) => {
    try {
        const response = await Axios.patch(`/clients/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error during client update:', error);
        throw error;
    }
};

const DeleteClient = async (id) => {
    try {
        await Axios.delete(`/clients/${id}`);
    } catch (error) {
        console.error('Error during client deletion:', error);
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

export const ClientService = {
    GetAllClients,
    GetOneClient,
    AddClient,
    UpdateClient,
    DeleteClient,
    LinkCompany,
};

export default ClientService;
