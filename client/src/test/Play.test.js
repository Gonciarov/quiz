import { render, screen } from '@testing-library/react';
import Play from '../components/quiz/Play';
import {BrowserRouter as Router} from 'react-router-dom';

test('renders Play component', () => {
    render(<Play />, {wrapper: Router});
    expect(screen.getAllByRole("heading")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("heading")[1]).toBeInTheDocument();
    expect(screen.getByTestId("quit-button")).toBeInTheDocument();
});

