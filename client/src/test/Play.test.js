import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {BrowserRouter as Router} from 'react-router-dom';
import Play from '../components/quiz/Play';

test('questions container is displayed', () => {
    render(<Play />, {wrapper: Router});
    const linkElement = screen.getByTestId('questions')
    expect(linkElement).toBeInTheDocument();
  });