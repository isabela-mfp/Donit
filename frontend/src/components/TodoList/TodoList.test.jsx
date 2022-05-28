import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import TodoList from './TodoList';

const getTodoListMock = () => ({
  items: [],
});

jest.mock('../../services/todoList.js', () => ({
  __esModule: true,
  default: () => ({
    getTodoList: getTodoListMock,
  }),
  getTodoList: getTodoListMock,
}));

describe('<TodoList />', () => {
  test('it should mount', async () => {
    await act(async () => render(<TodoList />));
    const todoList = screen.getByTestId('TodoList');

    expect(todoList).toBeInTheDocument();
  });
});
