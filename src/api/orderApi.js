import axiosClient from './axiosClient';

const orderApi = {
    createOrder: (order) => {
        return axiosClient.post('/orders', order);
    },
    getOrderById: (id) => {
        return axiosClient.get(`/orders/${id}`);
    },
    getMyOrders: () => {
        return axiosClient.get('/orders/myorders');
    },
    payOrder: (id, paymentResult) => {
        return axiosClient.put(`/orders/${id}/pay`, paymentResult);
    }
};

export default orderApi;
