import { configureStore } from '@reduxjs/toolkit';
import notes from './slices/notes';

export default configureStore({
  reducer: { notes },
});
