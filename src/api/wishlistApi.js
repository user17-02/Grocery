import axiosClient from './axiosClient';

const wishlistApi = {
    getWishlist: () => {
        return axiosClient.get('/wishlist');
    },
    addToWishlist: (item) => {
        return axiosClient.post('/wishlist', item);
    },
    removeFromWishlist: (id) => {
        return axiosClient.delete(`/wishlist/${id}`);
    }
};

export default wishlistApi;
