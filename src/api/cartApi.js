import axiosClient from './axiosClient';

const cartApi = {
    getCart: () => {
        return axiosClient.get('/cart');
    },
    addToCart: (item) => {
        return axiosClient.post('/cart', item);
    },
    removeFromCart: (id) => {
        return axiosClient.delete(`/cart/${id}`);
    },
    clearCart: () => {
        return axiosClient.delete('/cart');
    }
};

export default cartApi;
