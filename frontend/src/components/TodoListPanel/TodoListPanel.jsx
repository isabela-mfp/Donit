import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, IconButton, Divider, Modal, Fade, TextField, Button, Box,
  AppBar, Toolbar, Typography, makeStyles, List, ListItem, ListItemText, Grid, Select, MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';
import TodoList from '../TodoList/TodoList';
import useAuth from '../../hooks/useAuth';

import { createTodoList, getAllTodoLists, deleteTodoList } from '../../services/todoList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TodoListPanel() {
  const classes = useStyles();
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
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
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
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
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
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Card data-testid="TodoListPanel">
          <TodoList todoListId={selectedTodoList} />
        </Card>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openState}
          className={classes.modal}
          onClose={() => setOpenState(false)}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openState}>
            <div className={classes.paper}>
              <Typography variant="h4" gutterBottom className={classes.modalTitle}>
                Create new list
              </Typography>
              <form noValidate autoComplete="off" className={classes.root} onSubmit={save}>
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
            </div>
          </Fade>
        </Modal>
      </main>
    </div>
  );
}

TodoListPanel.propTypes = {};

TodoListPanel.defaultProps = {};

export default TodoListPanel;
