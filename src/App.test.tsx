import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import App from './App';

import '@testing-library/jest-dom/extend-expect'; // add this line

test('renders learn react link', () => {
  rtlRender(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

