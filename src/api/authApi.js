import axiosClient from './axiosClient';

const authApi = {
    login: (credentials) => {
        return axiosClient.post('/users/login', credentials);
    },
    register: (userData) => {
        return axiosClient.post('/users', userData);
    },
    getProfile: () => {
        return axiosClient.get('/users/profile');
    },
    updateProfile: (userData) => {
        return axiosClient.put('/users/profile', userData);
    }
};

export default authApi;
