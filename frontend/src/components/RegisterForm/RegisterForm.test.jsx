import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RegisterForm from './RegisterForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<RegisterForm />', () => {
  test('it should mount', () => {
    render(<RegisterForm />);

    const registerForm = screen.getByTestId('RegisterForm');

    expect(registerForm).toBeInTheDocument();
  });
});
