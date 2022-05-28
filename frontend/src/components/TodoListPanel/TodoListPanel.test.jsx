import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoListPanel from './TodoListPanel';

describe('<TodoListPanel />', () => {
  test('it should mount', () => {
    render(<TodoListPanel />);
    
    const todoListPanel = screen.getByTestId('TodoListPanel');

    expect(todoListPanel).toBeInTheDocument();
  });
});