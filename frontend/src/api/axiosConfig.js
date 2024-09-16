import axios from 'axios';

// Создаем экземпляр axios с базовым URL / Create axios instance with base URL
const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Добавляем интерцептор для добавления токена в заголовки запросов / Add interceptor to add token to request headers
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage / Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки авторизации / Add token to authorization headers
    }
    return config;
});

export default instance;
