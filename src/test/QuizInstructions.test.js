import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import QuizInstructions from '../components/quiz/Instructions';

test('Back link is on the page', () => {
  render(<QuizInstructions />, {wrapper: Router});
  const linkElement = screen.getByText(/Back/i);
  expect(linkElement).toBeInTheDocument();
});

test('Back link changes location', () => {
  render(<QuizInstructions />, {wrapper: Router}, {url: 'http//localhost:3000/instructions'});
  const linkElement = screen.getByText(/Back/i);
  fireEvent.click(linkElement)
  expect(window.location.href).not.toBe('http//localhost:3000/instructions')
});


test('Quiz instructions displayed', () => {
  render(<QuizInstructions />, {wrapper: Router});
  const linkElement = screen.getByText(/How to play the game/i);
  expect(linkElement).toBeInTheDocument();
});

