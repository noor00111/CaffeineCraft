import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('renders the hero headline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/stay for the second cup/i);
});

test('switching coffee updates the recipe', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: /americano/i }));
  expect(screen.getByRole('tab', { name: /americano/i })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Hot water')).toBeInTheDocument();
});

test('kitchen tabs filter the menu', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: /desserts/i }));
  expect(screen.getByText('Pudding')).toBeInTheDocument();
  expect(screen.queryByText('Ramen')).not.toBeInTheDocument();
});
