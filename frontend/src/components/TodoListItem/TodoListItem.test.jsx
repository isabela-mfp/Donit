import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import TodoListItem from './TodoListItem';

describe('<TodoListItem />', () => {
  test('it should be ticked off', () => {
    const todoItem = {
      name: 'todo text',
      conclusionDate: null,
    };

    const update = jest.fn();
    render(<TodoListItem
      todoItem={todoItem}
      updateHandler={update}
      deleteHandler={jest.fn()}
    />);

    const checkbox = screen.getByTestId('Checkbox');

    expect(checkbox.classList).not.toContain('checked');
  });

  test('it should call update function on click', () => {
    const todoItem = {
      name: 'todo text',
      conclusionDate: null,
    };

    const update = jest.fn();

    render(<TodoListItem
      todoItem={todoItem}
      updateHandler={update}
      deleteHandler={jest.fn()}
    />);

    const checkbox = screen.getByTestId('Checkbox');
    checkbox.click();

    expect(update).toHaveBeenCalledWith(todoItem);
  });

  test('it should call update function on click', () => {
    const todoItem = {
      name: 'todo text',
      conclusionDate: null,
    };

    const deleteHandler = jest.fn();

    render(<TodoListItem
      todoItem={todoItem}
      updateHandler={jest.fn()}
      deleteHandler={deleteHandler}
    />);

    const deleteBtn = screen.getByTestId('DeleteButton');
    deleteBtn.click();

    expect(deleteHandler).toHaveBeenCalledWith(todoItem);
  });

  test('it should be ticked on when conclusionDate is set', () => {
    const todoItem = {
      name: 'todo text',
      conclusionDate: new Date(),
    };

    const update = jest.fn();

    render(<TodoListItem
      todoItem={todoItem}
      updateHandler={update}
      deleteHandler={jest.fn()}
    />);

    const checkbox = screen.getByTestId('Checkbox');
    expect(checkbox.classList).toContain('checked');
  });

  test('it should render late badge when dueDate is in past and item is not done', () => {
    const todoItem = {
      name: 'todo text',
      dueDate: moment().subtract(20, 'days').toDate(),
      conclusionDate: null,
    };

    const update = jest.fn();

    render(<TodoListItem
      todoItem={todoItem}
      updateHandler={update}
      deleteHandler={jest.fn()}
    />);

    const lateBadge = screen.getByTestId('LateBadge');
    expect(lateBadge.childNodes[0].textContent).toEqual('20');
  });
});
