import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, IconButton, Divider, Modal, Fade, TextField, Button, Box,
  AppBar, Toolbar, Typography, List, ListItem, ListItemText, Grid, Select, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoList from '../TodoList/TodoList';
import useAuth from '../../hooks/useAuth';

import { createTodoList, getAllTodoLists, deleteTodoList } from '../../services/todoList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function TodoListPanel() {
  const [todoListState, setTodoListState] = useState(null);
  const [open, setOpen] = useState(true);
  const [openState, setOpenState] = useState(false);
  const [selectedTodoList, setSelectedTodoList] = useState(null);
  const { logout } = useAuth();
  const [type, setType] = useState(null);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);

  const loadItems = async () => {
    const todoList = await getAllTodoLists();
    setTodoListState(todoList);
  };

  const save = (ev) => {
    ev.preventDefault();
    const name = ev.target.name.value;
    const desc = ev.target.desc.value;

    if (createTodoList(name, desc, type)) {
      setTimeout(() => {
        setOpenState(false);
        loadItems();
      }, 100);
    }
  };

  const loadTodoList = (id) => {
    setSelectedTodoList(id);
  };

  const callDeleteTodoList = async (ev, id) => {
    ev.stopPropagation();
    const res = await deleteTodoList(id);
    if (res) {
      setTimeout(loadItems, 100);
      if (selectedTodoList === id) {
        setSelectedTodoList(null);
      }
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <DoneAllIcon />
            <span id="page__title">Donit</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <IconButton onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          {
            todoListState && todoListState.map((item) => (
              <ListItem button key={item.id} onClick={() => loadTodoList(item.id)}>
                <ListItemText primary={item.name} />
                <IconButton edge="end" aria-label="delete" onClick={(ev) => callDeleteTodoList(ev, item.id)} data-testid="DeleteButton">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <Box className="button-group">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<LibraryAddIcon />}
            onClick={() => setOpenState(true)}
          >
            Create new list
          </Button>
        </Box>
      </Drawer>
      <main style={{ paddingTop: 70 }}>
        <Card data-testid="TodoListPanel">
          <TodoList todoListId={selectedTodoList} />
        </Card>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openState}
          className="modal"
          onClose={() => setOpenState(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openState}>
            <Box sx={style}>
              <Typography variant="h4" gutterBottom className="modalTitle">
                Create new list
              </Typography>
              <form noValidate autoComplete="off" onSubmit={save}>
                <Grid container rowSpacing={2} fullWidth>
                  <Grid item xs={12} fullWidth>
                    <TextField id="standard-basic" label="List name" fullWidth name="name" inputProps={{ maxLength: 15 }} />
                  </Grid>
                  <Grid item xs={12} fullWidth>
                    <TextField
                      id="standard-multiline-static"
                      label="Description"
                      name="desc"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Tipo"
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value={null} disabled>Selecionar tipo</MenuItem>
                      <MenuItem value="N">Normal</MenuItem>
                      <MenuItem value="S">Supermercado</MenuItem>
                      <MenuItem value="A">Academia</MenuItem>
                      <MenuItem value="T">Trabalho</MenuItem>
                      <MenuItem value="F">Faculdade</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} fullWidth style={{ marginTop: 10 }}>
                    <Button variant="contained" color="secondary" type="submit">
                      Submit todo list
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Fade>
        </Modal>
      </main>
    </div>
  );
}

TodoListPanel.propTypes = {};

TodoListPanel.defaultProps = {};

export default TodoListPanel;
