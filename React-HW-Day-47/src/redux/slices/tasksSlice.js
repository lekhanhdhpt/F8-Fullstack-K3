import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utilities/client";

const initialState = {
  columns: [],
  tasks: [],
  status: "idle",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    deleteTask: (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload
      );

      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1);
      }
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.columns = action.payload.columns;
      state.tasks = action.payload.tasks;
      state.status = "fulfilled";
    });
    builder.addCase(getTasks.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.status = "rejected";
    });
  },
});


export const getTasks = createAsyncThunk("getTasks", async () => {
  const { response, data } = await client.get("/tasks");
  if (response.ok) return data.data;
});
