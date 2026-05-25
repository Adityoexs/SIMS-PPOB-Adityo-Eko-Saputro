import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileApi, updateProfileApi, updateProfileImageApi } from '../../api/profileApi';

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await getProfileApi();
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (data, { rejectWithValue }) => {
  try {
    const res = await updateProfileApi(data);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update profile');
  }
});

export const updateProfileImage = createAsyncThunk('user/updateProfileImage', async (formData, { rejectWithValue }) => {
  try {
    const res = await updateProfileImageApi(formData);
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update profile image');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProfile.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
      .addCase(updateProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateProfileImage.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateProfileImage.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload; })
      .addCase(updateProfileImage.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
