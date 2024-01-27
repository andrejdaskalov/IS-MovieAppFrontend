import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:5001',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('jwt')? localStorage.getItem('jwt').toString() : ''}`,
        'Content-Type': 'application/json'
    },
    responseType: 'blob'
});

export default instance;