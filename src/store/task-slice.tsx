import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  remove,
  get,
  child,
} from "firebase/database";
import db from "../firebase/firebase-config";

interface Task {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  date: string;
  category: string;
  status: string;
}

interface FirebaseState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: string;
  searchQuery: string;
  sortOrder: "asc" | "desc";
}

const initialFirebaseState: FirebaseState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "All",
  searchQuery: "",
  sortOrder: "asc",
};

// Fetch tasks
export const fetchTasks = createAsyncThunk(
  "firebase/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(getDatabase(db));
      const snapshot = await get(child(dbRef, "taskManagement/tasks"));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const tasks = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        return tasks;
      } else {
        return [];
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add task
export const addTask = createAsyncThunk(
  "firebase/addTask",
  async (task: Omit<Task, "id">, { rejectWithValue }) => {
    try {
      const dbRef = ref(getDatabase(db), "taskManagement/tasks");
      const newTaskRef = push(dbRef);
      await set(newTaskRef, task);
      return { id: newTaskRef.key, ...task };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "firebase/updateTask",
  async ({ id, ...task }: Task, { rejectWithValue }) => {
    try {
      const dbRef = ref(getDatabase(db), `taskManagement/tasks/${id}`);
      await update(dbRef, task);
      return { id, ...task };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "firebase/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const dbRef = ref(getDatabase(db), `taskManagement/tasks/${id}`);
      await remove(dbRef);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: initialFirebaseState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.trim(); // Update search query
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload; // Update the sort order
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, setSearchQuery, setSortOrder } = taskSlice.actions;

export const selectFilteredTasks = (state: FirebaseState) => {
  const { tasks, filter, searchQuery, sortOrder } = state;

  return tasks
    .filter((task) => (filter === "All" ? true : task.category === filter)) // Category filter
    .filter(
      (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Search filter
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA; // Ascending order by date
    });
};

export default taskSlice.reducer;
