import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/lostFoundApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncGetLostFounds = createAsyncThunk('lostFounds/getAll', async (params, { rejectWithValue }) => {
  try {
    const res = await api.getLostFounds(params);
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncGetLostFoundById = createAsyncThunk('lostFounds/getDetail', async (id, { rejectWithValue }) => {
  try {
    const res = await api.getLostFoundById(id);
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncAddLostFound = createAsyncThunk('lostFounds/add', async (payload, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.postLostFound(payload);
    showSuccessDialog('Laporan berhasil ditambahkan!');
    dispatch(asyncGetLostFounds());
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateLostFound = createAsyncThunk('lostFounds/update', async ({ id, payload }, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.putLostFound(id, payload);
    showSuccessDialog('Laporan berhasil diperbarui!');
    dispatch(asyncGetLostFoundById(id));
    dispatch(asyncGetLostFounds());
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateLostFoundCover = createAsyncThunk('lostFounds/updateCover', async ({ id, file }, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.postLostFoundCover(id, file);
    showSuccessDialog('Cover berhasil diunggah!');
    dispatch(asyncGetLostFoundById(id));
    return res.data;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncDeleteLostFound = createAsyncThunk('lostFounds/delete', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.deleteLostFound(id);
    showSuccessDialog('Laporan berhasil dihapus!');
    dispatch(asyncGetLostFounds());
    return id;
  } catch (err) {
    showErrorDialog(err.message);
    return rejectWithValue(err.message);
  }
});

export const asyncGetStats = createAsyncThunk('lostFounds/getStats', async () => {
  try {
    const [daily, monthly] = await Promise.all([api.getDailyStats(), api.getMonthlyStats()]);
    return { daily: daily.data, monthly: monthly.data };
  } catch {
    return { daily: [], monthly: [] };
  }
});

const lostFoundSlice = createSlice({
  name: 'lostFounds',
  initialState: {
    lostFounds: [],
    lostFound: null,
    stats: { daily: [], monthly: [] },
    isLoading: false,
  },
  reducers: {
    clearDetail: (state) => {
      state.lostFound = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLostFounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncGetLostFounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lostFounds = action.payload || [];
      })
      .addCase(asyncGetLostFounds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncGetLostFoundById.fulfilled, (state, action) => {
        state.lostFound = action.payload;
      })
      .addCase(asyncGetStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { clearDetail } = lostFoundSlice.actions;
export default lostFoundSlice.reducer;