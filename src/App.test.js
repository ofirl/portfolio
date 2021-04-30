import React from 'react';

import { render, fireEvent, waitForElement } from '@testing-library/react';

import App from './App';

test('renders', () => {
  render(<App />);
});

test('renders name', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Ofir Levi/);
  expect(linkElement).toBeInTheDocument();
});

test('technology page', async () => {
  const { getByText, getAllByText } = render(<App />);
  const technologies = getAllByText(/.*/, { selector: 'a[href*="technologies"]' });

  fireEvent(technologies[1], new Event('click'));

  const reactTitle = getAllByText(/.*/, { selector: '*' });
});