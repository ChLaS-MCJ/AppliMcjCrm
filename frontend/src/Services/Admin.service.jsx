import Axios from './Caller.service';

const GetAllClientsDel = async () => {
    try {
        const response = await Axios.get('/admin/clients');
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const RestoreOneClientsDel = async (id, selectedRowData) => {
    try {
        const response = await Axios.post(`/admin/restoreclients/${id}`, selectedRowData);
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const GetAllCompanyDel = async () => {
    try {
        const response = await Axios.get('/admin/company');
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const RestoreOneCompanyDel = async (id, selectedRowData) => {
    try {
        const response = await Axios.post(`/admin/restorecompany/${id}`, selectedRowData);
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const GetAllAssociationsDel = async () => {
    try {
        const response = await Axios.get('/admin/associations');
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};

const GetAllEmployeDel = async () => {
    try {
        const response = await Axios.get('/admin/employe');
        return response.data;
    } catch (error) {
        console.error('Error getting clients:', error);
        throw error;
    }
};
export const AdminService = {
    GetAllClientsDel,
    GetAllCompanyDel,
    GetAllAssociationsDel,
    GetAllEmployeDel,
    RestoreOneClientsDel,
    RestoreOneCompanyDel,
};

export default AdminService;
