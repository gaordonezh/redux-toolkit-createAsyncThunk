import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote, getAllNotes, toggleModal } from '../../store/slices/notes';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ModalNotes from './components/ModalNotes';

const Home = () => {
  const {
    noteList: { loading, docs, error },
    noteSaveUpdateDelete,
  } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleOpenModal = (noteId) => () => dispatch(toggleModal(noteId));

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  const handleDelete = (noteId) => async () => {
    await dispatch(deleteNote(noteId));
    await dispatch(getAllNotes());
  };

  console.log(noteSaveUpdateDelete);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box py={5}>
          <Card elevation={10}>
            <CardContent>
              <List
                subheader={
                  <ListSubheader>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography variant="h4">LISTADO DE TAREAS</Typography>
                      <Button size="large" variant="contained" disabled={loading} onClick={handleOpenModal(null)}>
                        AGREGAR
                      </Button>
                    </Stack>
                  </ListSubheader>
                }
              >
                {docs.length > 0 ? (
                  docs.map((item, index) => (
                    <ListItem key={index} divider button dense onClick={handleOpenModal(item._id)}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{index + 1}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <Button variant="contained" color="error" size="small" onClick={handleDelete(item._id)}>
                          DEL
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    {loading || noteSaveUpdateDelete.loading ? (
                      <Stack direction="column" sx={{ width: '100%' }}>
                        {[1, 2, 3, 4, 5].map((wave) => (
                          <Skeleton animation="wave" variant="text" height={100} key={wave} />
                        ))}
                      </Stack>
                    ) : error ? (
                      <ListItemText primary="..:: OCURRIÓ UN ERROR AL OBTENER LAS TAREAS ::.." />
                    ) : (
                      <ListItemText primary="..:: AQUÍ SE MOSTRARÁN LAS TAREAS ::.." />
                    )}
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <ModalNotes />
    </React.Fragment>
  );
};

export default Home;
