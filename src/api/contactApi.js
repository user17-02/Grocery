import axiosClient from './axiosClient';

const contactApi = {
    createContact: (contactData) => {
        return axiosClient.post('/contact', contactData);
    },
};

export default contactApi;
