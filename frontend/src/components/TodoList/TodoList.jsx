import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Divider, Fade, TextField, List, ListSubheader, Modal, makeStyles, Typography,
} from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TodoListItem from '../TodoListItem/TodoListItem';
import {
  getTodoListItems, deleteTodoListItem, updateTodoListItem, createTodoItem,
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
  containerPadding: {
    paddingTop: '64px',
  },
}));

function TodoList({ todoListId }) {
  const [todoListState, setTodoListState] = useState(null);
  const [openState, setOpenState] = useState(false);
  const classes = useStyles();

  const loadItems = async () => {
    const todoList = await getTodoListItems(todoListId);
    setTodoListState(todoList);
  };
  useEffect(() => {
    loadItems();
  }, [todoListId]);

  const updateTodoItem = (todoItem) => {
    updateTodoListItem(todoListId, todoItem.id);
    loadItems();
  };

  const deleteTodoItem = (todoItem) => {
    deleteTodoListItem(todoListId, todoItem.id);
    loadItems();
  };

  const addTodoItem = (ev) => {
    ev.preventDefault();
    const name = ev.target.name.value;
    const desc = ev.target.desc.value;
    const dueDate = ev.target.dueDate.value;
    const todoItem = {
      name, desc, dueDate,
    };
    createTodoItem(todoListId, todoItem);
    setOpenState(false);
    loadItems();
  };

  return (
    <div data-testid="TodoList" className={classes.containerPadding}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            {todoListState?.name || 'Please select a list or create a new one'}
          </ListSubheader>
        )}
        className="todo-list"
      >
        {todoListState && todoListState.items && todoListState.items.map((todoListItem) => (
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
        {todoListState && todoListState.name && (
          <Button
            variant="contained"
            color="secondary"
            endIcon={<LibraryAddIcon />}
            onClick={() => setOpenState(true)}
          >
            Add task
          </Button>
        )}
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

TodoList.propTypes = {
  todoListId: PropTypes.number,
};

TodoList.defaultProps = {
  todoListId: null,
};

export default TodoList;
