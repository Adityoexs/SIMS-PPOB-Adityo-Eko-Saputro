import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import balanceReducer from './slices/balanceSlice';
import servicesReducer from './slices/servicesSlice';
import bannerReducer from './slices/bannerSlice';
import transactionReducer from './slices/transactionSlice';
import topupReducer from './slices/topupSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    balance: balanceReducer,
    services: servicesReducer,
    banners: bannerReducer,
    transaction: transactionReducer,
    topup: topupReducer,
  },
});

export default store;
