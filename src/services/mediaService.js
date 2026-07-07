import api from './api';

export const getMedia = async (filters, page = 0, size = 20) => {
    const params = {
        page,
        size,
        query: filters.searchQuery || '',
    };

    if (filters.company) {
        params.company = filters.company;
    }

    if (filters.mediaType && filters.mediaType !== 'All') {
        params.mediaType = filters.mediaType;
    }

    const response = await api.get('/media', { params });
    return response.data;
};

export const generatePpt = async (payload) => {
    const response = await api.post('/media/generate-ppt', payload, {
        responseType: 'blob'
    });
    return response.data;
};

export const addMedia = async (formData) => {
    const response = await api.post('/media', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const generateBulkPpt = async (payload) => {
    const response = await api.post('/media/generate-ppt-bulk', payload, {
        responseType: 'blob'
    });
    return response.data;
};

export const updateMedia = async (id, formData) => {
    const response = await api.put(`/media/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteMedia = async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
};

export const bulkImageUpload = async (formData) => {
    const response = await api.post('/media/bulk-image-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const generatePdf = async (payload) => {
    const response = await api.post('/media/generate-pdf', payload, {
        responseType: 'blob'
    });
    return response.data;
};

export const generateBulkPdf = async (payload) => {
    const response = await api.post('/media/generate-pdf-bulk', payload, {
        responseType: 'blob'
    });
    return response.data;
};
