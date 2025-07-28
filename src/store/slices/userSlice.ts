import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../utils/api';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserState {
  currentUser: {
    loading: boolean;
    error: string | null;
    data : UserAttributes | null;
  }
  registerUser: {
    loading: boolean;
    error: string | null;
    data: UserAttributes | null;
  }
}

const initialState: UserState = {
  currentUser: {
    loading: false,
    error: null,
    data : null
  },
  registerUser: {
    loading: false,
    error: null,
    data: null
  }
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await apiPost('/auth/login', credentials);
    
    if (response.status !== 200) {
      throw new Error('Login failed');
    }
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiPost('/auth/signup', userData);

    if (response.status === 400) {
      throw new Error(response.data.message);
    }
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error('Registration failed');
    }
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    const response = await apiGet('/auth/me');

    if (response.status !== 200) {
      throw new Error(response.data.message || 'Failed to fetch current user');
    }
    return response.data;
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {
        loading: false,
        error: null,
        data : null
      };
      localStorage.removeItem('token');
    },
    clearRegisterUser: (state) => {
      state.registerUser = {
        loading: false,
        error: null,
        data: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.currentUser.loading = true;
        state.currentUser.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser.loading = false;
        state.currentUser.data = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.currentUser.loading = false;
        state.currentUser.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.registerUser.loading = true;
        state.registerUser.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.data = action.payload.data;
        state.registerUser.error = null;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.error = action.error.message || 'Registration failed';
      })
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.currentUser.loading = true;
        state.currentUser.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser.loading = false;
        state.currentUser.data = action.payload.data;
        state.currentUser.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.currentUser.loading = false;
        state.currentUser.error = action.error.message || 'Failed to fetch current user';
      })
  },
});

export const {
  logout,
  clearRegisterUser,
} = userSlice.actions;

export default userSlice.reducer; 