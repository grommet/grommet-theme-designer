import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  afterEach(cleanup);

  test('empty', () => {
    const { getByLabelText, container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByLabelText('show my themes'));
    expect(container.firstChild).toMatchSnapshot();
  });
});
