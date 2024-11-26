import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Substitua pela porta correta do backend
});

export default api;

export const getNL50 = async () => {
    return await api.get('/amostras/nl50');
};

export const getN50 = async () => {
    return await api.get('/amostras/n50');
};