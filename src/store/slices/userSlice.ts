import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../utils/api';

const initialState: UserState = {
  user: {
    loading: false,
    error: null,
    data : null
  },
  registerUser: {
    loading: false,
    error: null,
    data: null
  },
  userList:{
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
      throw new Error(response?.data?.message || 'Login failed');
    }
    
    localStorage.setItem('token', response?.data?.data?.token);

    return response?.data?.data?.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiPost('/auth/signup', userData);

    if (response.status === 400) {
      throw new Error(response?.data?.message);
    }
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(response?.data?.message || 'Registration failed');
    }
    return response?.data?.data?.user;
  }
);

export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async () => {
    const response = await apiGet('/auth/all');

    if (response.status !== 200) {
      throw new Error(response?.data?.message || 'Failed to fetch user list');
    }
    return response?.data?.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    const response = await apiGet('/auth/me');

    if (response.status !== 200) {
      throw new Error(response?.data?.message || 'Failed to fetch current user');
    }
    return response?.data?.data;
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
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
    },
    clearLoginError: (state) => {
      state.user.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
        state.user.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.registerUser.loading = true;
        state.registerUser.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.data = action.payload;
        state.registerUser.error = null;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.error = action.error.message || 'Registration failed';
      })
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
        state.user.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message || 'Failed to fetch current user';
      })
      // Fetch user list
      .addCase(fetchUserList.pending, (state) => {
        state.userList.loading = true;
        state.userList.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {  
        state.userList.loading = false;
        state.userList.data = action.payload;
        state.userList.error = null;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.userList.loading = false; 
        state.userList.error = action.error.message || 'Failed to fetch user list';
      })
  },
});

export const {
  logout,
  clearRegisterUser,
  clearLoginError,
} = userSlice.actions;

export default userSlice.reducer; 