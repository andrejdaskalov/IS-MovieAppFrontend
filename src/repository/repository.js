import axios from './axios'
import downloader from './downloader'

const Repository = {
    getTickets : async () => {
        try {
            let result = await axios.get('/api/tickets');
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    login : async (data) => {
        try {
            let result = await axios.post('/api/login', data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    register : async (data) => {
        try {
            let result = await axios.post('/api/register', data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    getMovies : async () => {
        try {
            let result = await axios.get('/api/tickets/getAllMovies');
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    addTicket : async (data) => {
        try {
            let result = await axios.post('/api/tickets', data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    getSpecificTicket : async (id) => {
        try {
            let result = await axios.get(`/api/tickets/${id}`);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    editTicket : async (data, id) => {
        try {
            let result = await axios.put('/api/tickets/' + id, data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    deleteTicket : async (id) => {
        try {
            let result = await axios.delete('/api/tickets/' + id);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    exportTickets : async (genre) => {
        try {
            let result = await downloader.post('/api/tickets/export', genre);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    getCart : async () => {
        try {
            let result = await axios.get('/api/cart');
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    addToCart : async (id, amount) => {
        try {
            let result = await axios.post('/api/cart/' + id.toString(), amount);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    removeFromCart : async (id) => {
        try {
            let result = await axios.delete('/api/cart/' + id);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    removeAllFromCart : async () => {
        try {
            let result = await axios.delete('/api/cart/removeAll');
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    updateAmount : async (id, amount) => {
        try {
            let result = await axios.put('/api/cart/' + id, amount);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    payment : async (data) => {
        try {
            let result = await axios.post('/api/payment/create-checkout-session', data);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },

    finishOrder : async () => {
        try {
            let result = await axios.get('/api/payment/finish-order');
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }



}

export default Repository;