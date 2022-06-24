import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import server from '../../../services/api';
import { getNotesRoute, getNoteByIdRoute, updateNoteRoute, createNoteRoute, deleteNoteRoute } from './endpoints';

export const initialState = {
  noteList: {
    loading: false,
    docs: [],
    error: false,
  },
  noteItem: {
    loading: false,
    doc: {},
    error: false,
  },
  modalNotes: {
    open: false,
    noteId: '',
  },
  noteSaveUpdateDelete: {
    loading: false,
    error: false,
  },
};

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async (params, { getState }) => {
  const response = await server({
    method: 'get',
    url: getNotesRoute(),
    params,
  });
  return response.data;
});

export const getNoteById = createAsyncThunk('notes/getNoteById', async (noteId, { getState }) => {
  const response = await server({
    method: 'get',
    url: getNoteByIdRoute(noteId),
  });
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ noteId, body }, { getState }) => {
  const response = await server.put(updateNoteRoute(noteId), body);
  return response;
});

export const createNote = createAsyncThunk('notes/createNote', async (payload, { getState }) => {
  const response = await server.post(createNoteRoute(), payload);
  return response;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId, { getState }) => {
  const response = await server({
    method: 'delete',
    url: deleteNoteRoute(noteId),
  });
  return response;
});

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    toggleModal: (state, payload) => {
      state.modalNotes.open = !state.modalNotes.open;
      state.modalNotes.noteId = payload.payload ?? null;
    },
    clearNoteItem: (state, payload) => {
      state.noteItem.loading = false;
      state.noteItem.doc = {};
      state.noteItem.error = false;
    },
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

    // GET NOTE BY ID

    [String(getNoteById.pending)]: (state, action) => {
      state.noteItem.loading = true;
      state.noteItem.doc = {};
      state.noteItem.error = false;
    },
    [String(getNoteById.fulfilled)]: (state, action) => {
      state.noteItem.loading = false;
      state.noteItem.doc = { ...action.payload };
      state.noteItem.error = false;
    },
    [String(getNoteById.rejected)]: (state, action) => {
      state.noteItem.loading = false;
      state.noteItem.doc = {};
      state.noteItem.error = true;
    },

    // UPDATE NOTE

    [String(updateNote.pending)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = true;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(updateNote.fulfilled)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(updateNote.rejected)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = true;
    },

    // SAVE NOTE

    [String(createNote.pending)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = true;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(createNote.fulfilled)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(createNote.rejected)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = true;
    },

    // DELETE NOTE

    [String(deleteNote.pending)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = true;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(deleteNote.fulfilled)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = false;
    },
    [String(deleteNote.rejected)]: (state, action) => {
      state.noteSaveUpdateDelete.loading = false;
      state.noteSaveUpdateDelete.error = true;
    },
  },
});

export const { toggleModal, clearNoteItem } = noteSlice.actions;

export default noteSlice.reducer;
