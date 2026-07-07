import api from './api';

export const listUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const createUser = async (payload) => {
    const response = await api.post('/admin/users', payload);
    return response.data;
};

export const enableUser = async (id) => {
    const response = await api.patch(`/admin/users/${id}/enable`);
    return response.data;
};

export const disableUser = async (id) => {
    const response = await api.patch(`/admin/users/${id}/disable`);
    return response.data;
};
