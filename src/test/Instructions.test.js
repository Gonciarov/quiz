import { fireEvent, render, screen } from '@testing-library/react';
import Instructions from '../components/Instructions';
import {BrowserRouter as Router} from 'react-router-dom';

test('renders instructions', () => {
  render(<Instructions/>, {wrapper: Router});
  const text = screen.getByText('Some instructions');
  expect(text).toBeInTheDocument();
});

test('renders back button', () => {
  render(<Instructions/>, {wrapper: Router});
  const text = screen.getByText('Back');
  expect(text).toBeInTheDocument();
});

test('Back button leads to main page', () => {
  render(<Instructions/>, {wrapper: Router});
  expect(screen.getByRole('link')).toHaveAttribute('href', '/');

});

