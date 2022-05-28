import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, IconButton, Divider, Modal, Fade, TextField, Button, Box,
  AppBar, Toolbar, Typography, makeStyles, List, ListItem, ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TodoList from '../TodoList/TodoList';
import useAuth from '../../hooks/useAuth';

import { createTodoList, getAllTodoLists } from '../../services/todoList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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

    createTodoList(name, desc);
    setOpenState(false);
    loadItems();
  };

  const loadTodoList = (id) => {
    setSelectedTodoList(id);
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
            Donit
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
                <div>
                  <TextField id="standard-basic" label="List name" fullWidth name="name" inputProps={{ maxLength: 15 }} />
                </div>
                <div className="form-last-row">
                  <TextField
                    id="standard-multiline-static"
                    label="Description"
                    name="desc"
                    multiline
                    rows={4}
                  />
                  <Button variant="contained" color="secondary" type="submit">
                    Submit task
                  </Button>
                </div>
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
