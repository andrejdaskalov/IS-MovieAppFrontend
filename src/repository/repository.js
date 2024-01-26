import axios from './axios'

const Repository = {
    getTickets : async () => {
        try {
            let result = await axios.get('/api/tickets');
            return result.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    login : async (data) => {
        try {
            let result = await axios.post('/api/login', data);
            return result.data;
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default Repository;