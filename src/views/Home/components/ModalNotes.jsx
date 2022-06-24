import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteById, toggleModal, updateNote, createNote, getAllNotes, clearNoteItem } from '../../../store/slices/notes';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box, Skeleton } from '@mui/material';

const ModalNotes = () => {
  const input = useRef(null);
  const { modalNotes, noteItem, noteSaveUpdateDelete } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalNotes.noteId) dispatch(getNoteById(modalNotes.noteId));
  }, [modalNotes.noteId]);

  const handleSubmit = async () => {
    const name = input.current.value;
    if (name.length >= 5) {
      const body = { name };
      if (modalNotes.noteId) await dispatch(updateNote({ body, noteId: noteItem?.doc?._id ?? '' }));
      else await dispatch(createNote(body));
      await dispatch(getAllNotes());
      handleClose();
    }
  };

  const handleClose = () => {
    dispatch(clearNoteItem());
    dispatch(toggleModal());
  };

  const isLoading = noteItem.loading || noteSaveUpdateDelete.loading;

  return (
    <Dialog open={modalNotes.open} fullWidth maxWidth="sm" onClose={handleClose}>
      <DialogTitle>
        <Typography align="center" variant="h4" component="p">
          {modalNotes.noteId ? 'EDITAR' : 'AGREGAR'} TAREA
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box pt={1}>
          {isLoading ? (
            <Skeleton height={55} />
          ) : (
            <TextField
              fullWidth
              label="Nombre de la tarea"
              defaultValue={noteItem.doc.name ?? ''}
              inputRef={input}
              onKeyUp={(event) => event.key === 'Enter' && handleSubmit()}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={handleClose} disabled={isLoading}>
          CANCELAR
        </Button>
        <Button color="primary" variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {modalNotes.noteId ? 'ACTUALIZAR' : 'AGREGAR'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNotes;
