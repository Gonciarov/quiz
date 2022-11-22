import { render, screen, fireEvent, getAllByTestId, getByTestId } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import Play from '../components/quiz/Play';

test('questions container is displayed', () => {
    render(<Play />, {wrapper: Router});
    const linkElement = screen.getByTestId('questions')
    expect(linkElement).toBeInTheDocument();
  });

  test('question element is displayed', () => {
    render(<Play />, {wrapper: Router});
    const questionElement = screen.getByTestId('question-element')
    expect(questionElement).toBeInTheDocument();
  });

  test('question element has text', () => {
    render(<Play />, {wrapper: Router});
    const questionElement = screen.getByTestId('question-element')
    expect(questionElement.innerText).not.toEqual('')
  });


