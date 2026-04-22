import axiosClient from './axiosClient';

const paymentApi = {
    processPayment: (paymentData) => {
        return axiosClient.post('/payment', paymentData);
    }
};

export default paymentApi;
