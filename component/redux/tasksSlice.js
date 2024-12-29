import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  editingTaskId: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    updateTask: (state, action) => {
      const {id, text, priority} = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.text = text;
        task.priority = priority;
      }
    },
  },
});

export const {
  addTask,
  toggleCompletion,
  deleteTask,
  setEditingTaskId,
  updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
