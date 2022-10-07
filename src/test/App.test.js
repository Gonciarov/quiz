import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import QuizInstructions from '../components/quiz/QuizInstructions';

test('renders play button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Play/i);
  expect(linkElement).toBeInTheDocument();
});

test('buttons have colors', () => {
  render(<App />);
  expect(screen.getByText(/Play/i)).toHaveCompiledCss({text-align: 'center'})
});

test('buttons have colors', () => {
  render(<App />);
  expect(screen.getByText(/Play/i)).toHaveStyle("background-color:", "#57ba46")
  expect(screen.getByText(/Login/i)).toHaveStyle("background-color:", "#1da1f2")
  expect(screen.getByText(/Register/i)).toHaveStyle("background-color:", "ea4355")
});





