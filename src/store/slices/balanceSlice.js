import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBalanceApi } from '../../api/profileApi';

export const fetchBalance = createAsyncThunk('balance/fetchBalance', async (_, { rejectWithValue }) => {
  try {
    const res = await getBalanceApi();
    return res.data.data.balance;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch balance');
  }
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    balance: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBalance.fulfilled, (state, action) => { state.loading = false; state.balance = action.payload; })
      .addCase(fetchBalance.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default balanceSlice.reducer;
