import axiosClient from './axiosClient';

const productApi = {
    getAll: (params) => {
        return axiosClient.get('/products', { params });
    },
    getById: (id) => {
        return axiosClient.get(`/products/${id}`);
    },
    getCategories: () => {
        return axiosClient.get('/categories');
    },
    getTopRated: () => {
        return axiosClient.get('/products/top');
    },
    createReview: (id, review) => {
        return axiosClient.post(`/products/${id}/reviews`, review);
    }
};

export default productApi;
