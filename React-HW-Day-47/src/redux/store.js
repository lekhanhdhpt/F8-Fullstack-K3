import { configureStore } from "@reduxjs/toolkit"
import { tasksSlice } from "./slices/tasksSlice.js"

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    }
});