import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import quoteReducer from './quoteSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    quote: quoteReducer, 
  },
});

export default store;
