import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo list header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo List/i);
  expect(headerElement).toBeInTheDocument();
});