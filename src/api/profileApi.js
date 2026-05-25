import api from './axios';

export const getProfileApi = () => api.get('/profile');
export const updateProfileApi = (data) => api.put('/profile/update', data);
export const updateProfileImageApi = (formData) =>
  api.put('/profile/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getBalanceApi = () => api.get('/balance');
export const getServicesApi = () => api.get('/services');
export const getBannerApi = () => api.get('/banner');
