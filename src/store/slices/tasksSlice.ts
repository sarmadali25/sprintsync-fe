import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils/api";

export interface TaskAttributes {
  id?: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  assignedToId: number;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TasksState {
  tasks: TaskAttributes[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await apiGet("/task");

  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch tasks");
  }

  return response?.data?.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const { clearTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
