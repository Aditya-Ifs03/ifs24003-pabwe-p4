import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getMyProfile, updateMyProfile, updateMyPhoto, updateMyPassword } from '../api/userApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncGetUsers = createAsyncThunk('users/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getUsers();
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncGetMyProfile = createAsyncThunk('users/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await getMyProfile();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateMyProfile = createAsyncThunk('users/updateProfile', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const res = await updateMyProfile(payload);
    showSuccessDialog('Profil berhasil diperbarui!');
    dispatch(asyncGetMyProfile());
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateMyPhoto = createAsyncThunk('users/updatePhoto', async (file, { dispatch, rejectWithValue }) => {
  try {
    const res = await updateMyPhoto(file);
    showSuccessDialog('Foto profil berhasil diunggah!');
    dispatch(asyncGetMyProfile());
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateMyPassword = createAsyncThunk('users/updatePassword', async (payload, { rejectWithValue }) => {
  try {
    const res = await updateMyPassword(payload);
    showSuccessDialog('Kata sandi berhasil diubah!');
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    profile: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.users = action.payload || [];
      })
      .addCase(asyncGetMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;