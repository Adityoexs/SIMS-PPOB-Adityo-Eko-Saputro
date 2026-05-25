import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionApi, getTransactionHistoryApi } from '../../api/transactionApi';

export const doTransaction = createAsyncThunk('transaction/doTransaction', async (serviceCode, { rejectWithValue }) => {
  try {
    const res = await transactionApi({ service_code: serviceCode });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Transaction failed');
  }
});

export const fetchTransactionHistory = createAsyncThunk(
  'transaction/fetchHistory',
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const res = await getTransactionHistoryApi(offset, limit);
      return { records: res.data.data?.records || [], offset };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch history');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    history: [],
    offset: 0,
    limit: 5,
    hasMore: true,
    loading: false,
    error: null,
    payLoading: false,
    payError: null,
    paySuccess: false,
  },
  reducers: {
    resetPayment(state) {
      state.payLoading = false;
      state.payError = null;
      state.paySuccess = false;
    },
    resetHistory(state) {
      state.history = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doTransaction.pending, (state) => { state.payLoading = true; state.payError = null; state.paySuccess = false; })
      .addCase(doTransaction.fulfilled, (state) => { state.payLoading = false; state.paySuccess = true; })
      .addCase(doTransaction.rejected, (state, action) => { state.payLoading = false; state.payError = action.payload; })
      .addCase(fetchTransactionHistory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        const { records, offset } = action.payload;
        if (offset === 0) {
          state.history = records;
        } else {
          state.history = [...state.history, ...records];
        }
        state.offset = offset + state.limit;
        state.hasMore = records.length === state.limit;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetPayment, resetHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
