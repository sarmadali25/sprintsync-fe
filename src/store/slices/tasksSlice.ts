import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from "../../utils/api";

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  createTaskLoading: false,
  createTaskError: null,
  updateTaskLoading: false,
  updateTaskError: null,
  deleteTaskLoading: false,
  deleteTaskError: null,
  generateAIDescriptionLoading: false,
  generateAIDescriptionError: null,
};

// Async thunks for API calls
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await apiGet("/task");

  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch tasks");
  }

  return response?.data?.data;
});

export const createTask = createAsyncThunk(
  "tasks/createTask", 
  async (taskData: Omit<TaskAttributes, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiPost("/task", taskData);
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(response.data.message || "Failed to create task");
    }
    
    return response?.data?.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask", 
  async (taskData: Omit<TaskAttributes, 'createdAt' | 'updatedAt'>) => {
    const {id, ...rest} = taskData;
    const response = await apiPut(`/task/${taskData.id}`, rest);
    
    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to update task");
    }
    
    return response?.data?.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask", 
  async (taskId: string) => {
    const response = await apiDelete(`/task/${taskId}`);
    
    
    if (response.status !== 204) {
      throw new Error(response.data.message || "Failed to delete task");
    }
    
    return taskId;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus", 
  async ({ taskId, status }: { taskId: string; status: 'pending' | 'in_progress' | 'completed' }) => {
    const response = await apiPatch(`/task/${taskId}`, {status});
    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to update task");
    }
    
    return response?.data?.data;
  }
);

export const generateAIDescription = createAsyncThunk(
    "tasks/generateAIDescription", 
  async ({ title }: { title: string }) => {
    const response = await apiPost(`/task/description-suggesstion`, {title});
    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to generate AI description");
    }
    
    return response?.data?.data;
  }
);
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
    // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
        state.createTaskError = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.createTaskLoading = false;
        state.createTaskError = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createTaskLoading = false;
        state.createTaskError = action.error.message || "Failed to create task";
      })
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.updateTaskLoading = true;
        state.updateTaskError = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.updateTaskLoading = false;
        state.updateTaskError = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateTaskLoading = false;
        state.updateTaskError = action.error.message || "Failed to update task";
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoading = true;
        state.deleteTaskError = null;
      })
      .addCase(deleteTask.fulfilled, (state,action) => {
        state.deleteTaskLoading = false;
        state.deleteTaskError = null;
        // Remove the task from the state
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteTaskLoading = false;
        state.deleteTaskError = action.error.message || "Failed to delete task";
      })
      // Generate AI Description
      .addCase(generateAIDescription.pending, (state) => {
        state.generateAIDescriptionLoading = true;
        state.generateAIDescriptionError = null;
      })
      .addCase(generateAIDescription.fulfilled, (state, ) => {
        state.generateAIDescriptionLoading = false;
        state.generateAIDescriptionError = null;
      })
      .addCase(generateAIDescription.rejected, (state, action) => {
        state.generateAIDescriptionLoading = false;
        state.generateAIDescriptionError = action.error.message || "Failed to generate AI description";
      });
  },
});

export const { clearTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
