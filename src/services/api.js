import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.206:8085/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;
        const isLoginRequest = error.config && error.config.url.includes('/auth/login');

        if ((status === 401 || status === 403) && !isLoginRequest) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
