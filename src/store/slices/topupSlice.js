import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { topUpApi } from '../../api/transactionApi';

export const doTopUp = createAsyncThunk('topup/doTopUp', async (amount, { rejectWithValue }) => {
  try {
    const res = await topUpApi({ top_up_amount: amount });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Top up failed');
  }
});

const topupSlice = createSlice({
  name: 'topup',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetTopup(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doTopUp.pending, (state) => { state.loading = true; state.error = null; state.success = false; })
      .addCase(doTopUp.fulfilled, (state) => { state.loading = false; state.success = true; })
      .addCase(doTopUp.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetTopup } = topupSlice.actions;
export default topupSlice.reducer;
