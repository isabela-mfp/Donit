import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
const mockAuthHook = {
  login: jest.fn(),
  user: null,
};
jest.mock('../../hooks/useAuth.jsx', () => ({
  __esModule: true,
  default: () => mockAuthHook,
}));

describe('<LoginForm />', () => {
  test('it should mount', () => {
    render(<LoginForm />);

    const loginForm = screen.getByTestId('LoginForm');

    expect(loginForm).toBeInTheDocument();
  });
});
