import axios from "axios";

const API_URL = 'http://localhost:8080/cart';

class CartDataService {

    addToCart(data) {
        return axios.post(`${API_URL}/`, data)
    }

    getCartById(vendorId) {
        return axios.get(`${API_URL}/${vendorId}`)
    }
}

export default new CartDataService();
