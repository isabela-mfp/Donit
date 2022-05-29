import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders learn react link', async () => {
  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
  }));
  const mockAuthHook = {
    login: jest.fn(),
    user: null,
  };
  jest.mock('./components/RequireAuth/RequireAuth', () => (mockAuthHook));
  await act(async () => render(<App />));
  const linkElement = screen.getByText(/Donit/i);
  expect(linkElement).toBeInTheDocument();
});
