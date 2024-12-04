// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Substitua pela porta correta do backend
});

export default api;
