import api from './axios';

export const topUpApi = (data) => api.post('/topup', data);
export const transactionApi = (data) => api.post('/transaction', data);
export const getTransactionHistoryApi = (offset = 0, limit = 5) =>
  api.get('/transaction/history', { params: { offset, limit } });
