import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Play/i);
  expect(linkElement).toBeInTheDocument();
});

test('Play button changes location', () => {
  render(<App />);
  const linkElement = screen.getByText(/Play/i);
  const previousLocation = window.location.href
  fireEvent.click(linkElement)
  expect(window.location.href).not.toEqual(previousLocation)

});