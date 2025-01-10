import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchRandomQuote = createAsyncThunk('quote/fectRandomQuote', async()=>{
    const response = await fetch ('https://dummyjson.com/quotes');
    const data = await response.json();
    return data.content;
});
const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        quote: '',
        loading: false,
        error : null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRandomQuote.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        .addCase(fetchRandomQuote.fulfilled, (state, action)=>{
            state.loading= false;
            state.quote=action.payload; 
        })
        .addCase(fetchRandomQuote.rejected, (state , action)=>{
            state.loading= false;
            state.error = action.error.message;
        });
    },
});
export default quoteSlice.reducer;
