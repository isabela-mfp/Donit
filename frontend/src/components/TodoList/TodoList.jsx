import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  Box, Button, Divider, Fade, TextField, List, ListSubheader, Modal, makeStyles, Typography,
} from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import TodoListItem from '../TodoListItem/TodoListItem';
import {
  getTodoList, deleteTodoListItem, updateTodoListItem, createTodoItem,
} from '../../services/todoList';
import './TodoList.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
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

function TodoList() {
  const [todoListState, setTodoListState] = useState(null);
  const [openState, setOpenState] = useState(false);
  const classes = useStyles();

  const initialLoadFn = async () => {
    const todoList = await getTodoList(1);
    setTodoListState(todoList);
  };
  useEffect(() => {
    initialLoadFn();
  }, []);

  const updateTodoItem = (todoItem) => {
    updateTodoListItem(1, todoItem.id);
    initialLoadFn();
  };

  const deleteTodoItem = (todoItem) => {
    deleteTodoListItem(1, todoItem.id);
    initialLoadFn();
  };

  const addTodoItem = (ev) => {
    ev.preventDefault();
    const name = ev.target.name.value;
    const desc = ev.target.desc.value;
    const dueDate = ev.target.dueDate.value;
    const todoItem = {
      name, desc, dueDate,
    };
    createTodoItem(1, todoItem);
    setOpenState(false);
    initialLoadFn();
  };

  return (
    <div data-testid="TodoList">
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            {todoListState?.name}
          </ListSubheader>
        )}
        className="todo-list"
      >
        {todoListState && todoListState.items.map((todoListItem) => (
          <TodoListItem
            key={todoListItem.id}
            todoItem={todoListItem}
            updateHandler={updateTodoItem}
            deleteHandler={deleteTodoItem}
          />
        ))}
        <Divider />
      </List>
      <Box className="button-group">
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardReturnIcon />}
          onClick={() => setOpenState(true)}
        >
          Return
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<LibraryAddIcon />}
          onClick={() => setOpenState(true)}
        >
          Add task
        </Button>
      </Box>
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
        <Fade in={openState} onSubmit={addTodoItem}>
          <div className={classes.paper}>
            <Typography variant="h4" gutterBottom className={classes.modalTitle}>
              Create new task
            </Typography>
            <form noValidate autoComplete="off" className={classes.root}>
              <div>
                <TextField id="standard-basic" label="Task name" name="name" inputProps={{ maxLength: 15 }} />
                <TextField
                  id="date"
                  label="Due date"
                  type="date"
                  name="dueDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
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
    </div>
  );
}

TodoList.propTypes = {};

TodoList.defaultProps = {};

export default TodoList;
