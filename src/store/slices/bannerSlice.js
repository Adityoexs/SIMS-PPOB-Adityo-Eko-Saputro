import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBannerApi } from '../../api/profileApi';

export const fetchBanners = createAsyncThunk('banners/fetchBanners', async (_, { rejectWithValue }) => {
  try {
    const res = await getBannerApi();
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch banners');
  }
});

const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBanners.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchBanners.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default bannerSlice.reducer;
