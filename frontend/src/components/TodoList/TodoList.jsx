import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Divider, Fade, TextField, List, ListSubheader, Modal, Typography,
  Grid,
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import TodoListItem from '../TodoListItem/TodoListItem';
import {
  getTodoListItems, deleteTodoListItem, updateTodoListItem, createTodoItem,
} from '../../services/todoList';
import './TodoList.css';

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

function TodoList({ todoListId }) {
  const [todoListState, setTodoListState] = useState(null);
  const [openState, setOpenState] = useState(false);

  const loadItems = async () => {
    if (todoListId != null) {
      const todoList = await getTodoListItems(todoListId);
      setTodoListState(todoList);
    } else {
      setTodoListState(null);
    }
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

  const addTodoItem = async (ev) => {
    ev.preventDefault();
    const name = ev.target.name.value;
    const desc = ev.target.desc.value;
    const dueDate = ev.target.dueDate.value;
    const todoItem = {
      name, desc, dueDate,
    };
    const result = await createTodoItem(todoListId, todoItem);
    if (result) {
      setOpenState(false);
      loadItems();
    }
  };

  return (
    <div data-testid="TodoList">
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
        className="modal"
        onClose={() => setOpenState(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openState} onSubmit={addTodoItem}>
          <Box sx={style}>
            <Typography variant="h4" gutterBottom className="modalTitle">
              Create new task
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container rowSpacing={2} fullWidth>
                <Grid item xs={12} fullWidth>
                  <TextField id="standard-basic" label="Task name" name="name" inputProps={{ maxLength: 15 }} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date"
                    label="Due date"
                    type="date"
                    name="dueDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    label="Description"
                    name="desc"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                  <Button variant="contained" color="secondary" type="submit">
                    Submit task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
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
