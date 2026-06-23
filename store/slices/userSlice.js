import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.getUserById(userId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllResidents = createAsyncThunk(
  'user/fetchAllResidents',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    residents: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    updateProfileLocally: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllResidents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllResidents.fulfilled, (state, action) => {
        state.loading = false;
        state.residents = action.payload;
      })
      .addCase(fetchAllResidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, updateProfileLocally } = userSlice.actions;
export default userSlice.reducer;
