import api from './axios';

export const registerApi = (data) => api.post('/registration', data);
export const loginApi = (data) => api.post('/login', data);
