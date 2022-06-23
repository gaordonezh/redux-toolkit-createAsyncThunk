// @ts-check
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import server from '../../../services/api';
import { getNotesRoutes } from './endpoints';

export const initialState = {
  noteList: {
    loading: false,
    docs: [],
    error: false,
  },
};

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async (params, { getState }) => {
  const response = await server({
    method: 'get',
    url: getNotesRoutes(),
    params,
  });

  return response.data;
});

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearField: (state, b) => {},
  },
  extraReducers: {
    [String(getAllNotes.pending)]: (state, action) => {
      state.noteList.loading = true;
      state.noteList.docs = [];
      state.noteList.error = false;
    },
    [String(getAllNotes.fulfilled)]: (state, action) => {
      state.noteList.loading = false;
      state.noteList.docs = action.payload;
      state.noteList.error = false;
    },
    [String(getAllNotes.rejected)]: (state, action) => {
      state.noteList.loading = false;
      state.noteList.docs = [];
      state.noteList.error = true;
    },
  },
});

export const { clearField } = noteSlice.actions;

export default noteSlice.reducer;
