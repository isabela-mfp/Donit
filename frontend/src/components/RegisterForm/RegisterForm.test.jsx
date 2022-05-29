import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';

import RegisterForm from './RegisterForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockIsPasswordValid = jest.fn();
const mockIsValidEmail = jest.fn();

jest.mock('../../utils/validators', () => ({
  isPasswordValid: () => mockIsPasswordValid(),
  isValidEmail: () => mockIsValidEmail(),
}));

describe('<RegisterForm />', () => {
  test('it should start with the register button disabled', async () => {
    await act(async () => render(<RegisterForm />));

    const registerButton = screen.getByTestId('RegisterButton');
    expect(registerButton.disabled).toBeTruthy();
  });

  test('it should keep the register button disabled with no valid inputs', async () => {
    mockIsPasswordValid.mockReturnValueOnce(false);
    mockIsValidEmail.mockReturnValueOnce(false);
    await act(async () => render(<RegisterForm />));

    const registerButton = screen.getByTestId('RegisterButton');
    expect(registerButton.disabled).toBeTruthy();
  });

  test('it should enable the register button with valid inputs', async () => {
    mockIsPasswordValid.mockReturnValueOnce(true);
    mockIsValidEmail.mockReturnValueOnce(true);

    await act(async () => render(<RegisterForm />));
    const registerButton = screen.getByTestId('RegisterButton');
    expect(registerButton.disabled).toBeFalsy();
  });
});
