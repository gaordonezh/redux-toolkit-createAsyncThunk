import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../../store/slices/notes';
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
  ListItemText,
  ListSubheader,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

const Home = () => {
  const { loading, docs, error } = useSelector((state) => state.notes.noteList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Card elevation={10}>
          <CardContent>
            <List
              subheader={
                <ListSubheader>
                  <Stack justifyContent="space-between" direction="row">
                    <Typography variant="h4">LISTADO DE TAREAS</Typography>
                    <Button size="large" variant="contained" disabled={loading}>
                      AGREGAR
                    </Button>
                  </Stack>
                </ListSubheader>
              }
            >
              {docs.length > 0 ? (
                docs.map((item, index) => (
                  <ListItem key={index} divider button dense>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{index + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  {loading ? (
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
  );
};

export default Home;
