import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, Badge, ListItemIcon, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

function TodoListItem({ todoItem, updateHandler, deleteHandler }) {
  const done = todoItem.conclusionDate == null;
  const description = todoItem.description ? todoItem.description.substring(0, 40) : '';
  const daysDifference = todoItem.dueDate ? moment().diff(moment(todoItem.dueDate), 'days') : 0;
  const daysLeft = !done && daysDifference > 0 ? 0 : daysDifference;
  const checkboxClick = () => updateHandler(todoItem);
  const deleteButtonClick = () => deleteHandler(todoItem);

  return (
    <ListItem data-testid="TodoListItem">
      <ListItemIcon>
        <Checkbox edge="start" onClick={checkboxClick} checked={!done} data-testid="Checkbox" classes={{ checked: 'checked' }} />
        {
          daysLeft > 0 && (
          <Badge
            data-testid="LateBadge"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            badgeContent={daysLeft}
            color="error"
            overlap="circular"
          />
          )
        }
      </ListItemIcon>
      <ListItemText
        primary={todoItem.name}
        secondary={(
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {todoItem.dueDate.split('T')[0]}
            </Typography>
            {` — ${description}...`}
          </>
        )}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteButtonClick} data-testid="DeleteButton">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TodoListItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    conclusionDate: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  updateHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

TodoListItem.defaultProps = {};

export default TodoListItem;
