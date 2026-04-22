import axiosClient from './axiosClient';

const adminApi = {
    getStats: () => {
        return axiosClient.get('/admin/stats');
    },
    getUsers: () => {
        return axiosClient.get('/users');
    },
    deleteUser: (id) => {
        return axiosClient.delete(`/users/${id}`);
    },
    getProducts: () => {
        return axiosClient.get('/products');
    },
    deleteProduct: (id) => {
        return axiosClient.delete(`/products/${id}`);
    },
    createProduct: () => {
        return axiosClient.post('/products');
    },
    updateProduct: (product) => {
        return axiosClient.put(`/products/${product._id}`, product);
    },
    getOrders: () => {
        return axiosClient.get('/orders');
    },
    deleteOrder: (id) => {
        return axiosClient.delete(`/orders/${id}`);
    },
    deliverOrder: (id) => {
        return axiosClient.put(`/orders/${id}/deliver`);
    },
    updateUser: (user) => {
        return axiosClient.put(`/users/${user._id}`, user);
    },
    uploadImage: (formData) => {
        return axiosClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getContacts: () => {
        return axiosClient.get('/contact');
    },
    deleteContact: (id) => {
        return axiosClient.delete(`/contact/${id}`);
    }
};

export default adminApi;
