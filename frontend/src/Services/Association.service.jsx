import Axios from './Caller.service';

const GetAllAssociation = async () => {
    try {
        const response = await Axios.get('/association');
        return response.data;
    } catch (error) {
        console.error('Error getting associations:', error);
        throw error;
    }
};

const GetOneAssociation = async (id) => {
    try {
        const response = await Axios.get(`/association/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting association details:', error);
        throw error;
    }
};

const AddAssociation = async (associationData) => {
    try {
        const response = await Axios.post('/association', associationData);
        return response.data;
    } catch (error) {
        console.error('Error during association addition:', error);
        throw error;
    }
};

const UpdateAssociation = async (id, formData) => {
    try {
        const response = await Axios.patch(`/association/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error during association update:', error);
        throw error;
    }
};

const DeleteAssociation = async (id) => {
    try {
        await Axios.delete(`/association/${id}`);
    } catch (error) {
        console.error('Error during association deletion:', error);
        throw error;
    }
};

const LinkAssociation = async (value, clientID) => {
    try {
        const response = await Axios.patch(`/clients/linkassociation/${clientID}`, value);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la liaison de l\'entreprise au client :', error);
        throw error;
    }
};

export const AssociationService = {
    GetAllAssociation,
    GetOneAssociation,
    AddAssociation,
    UpdateAssociation,
    DeleteAssociation,
    LinkAssociation,
};

export default AssociationService;
