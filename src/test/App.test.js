import { fireEvent, render, screen } from '@testing-library/react';
import Instructions from '../components/Instructions';
import {BrowserRouter as Router} from 'react-router-dom';
import App from '../App'

test('renders instructions', () => {
    render(<App/>);
    const text = screen.getByText('Play');
    expect(text).toBeInTheDocument();
  });