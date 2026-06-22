import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../services/dashboardService';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getDashboardStats();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getRecentActivity();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    recentActivity: [],
    amenities: [],
    loading: false,
    refreshing: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.stats = action.payload.stats;
        state.amenities = action.payload.amenities;
        state.recentActivity = action.payload.recentActivity;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.recentActivity = action.payload;
      });
  },
});

export const { setRefreshing, clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
