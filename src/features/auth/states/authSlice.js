import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postLogin, postRegister } from '../api/authApi';
import { putAccessToken, removeAccessToken, getAccessToken } from '../../../helpers/apiHelper';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncSetAuthLogin = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await postLogin({ email, password });
    const token = response.data?.token || response.data?.access_token;
    putAccessToken(token);
    showSuccessDialog('Login berhasil!');
    return token;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncSetAuthRegister = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await postRegister(payload);
    showSuccessDialog('Registrasi berhasil! Silakan masuk.');
    return response.data;
  } catch (error) {
    showErrorDialog(error.message);
    return rejectWithValue(error.message);
  }
});

export const asyncSetAuthLogout = createAsyncThunk('auth/logout', async () => {
  removeAccessToken();
  showSuccessDialog('Anda telah keluar.');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getAccessToken() || null,
    isAuthenticated: Boolean(getAccessToken()),
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncSetAuthLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(asyncSetAuthLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncSetAuthLogout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;