import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const navElement = screen.getByText(/Chain Agent/i);
  expect(navElement).toBeInTheDocument();
});
