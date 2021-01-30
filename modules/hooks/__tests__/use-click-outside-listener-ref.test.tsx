import { useClickOutsideListenerRef } from '../index';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';

describe('Testing a useClickOutsideListenerRef hook', () => {
  it('Testing hook return null as expected', () => {
    const { result } = renderHook(() => useClickOutsideListenerRef(() => {}));

    expect(result.current.current).toBeFalsy();
  });

  it('Testing when user press Escape', () => {
    const { debug } = render(<SimpleView />);

    const escapeEvent = screen.getByTestId('test');

    fireEvent.keyUp(escapeEvent, { key: 'Escape', code: 'Escape' });

    debug();

    const isFired = screen.getByTestId('number');

    expect(Number(isFired.textContent)).toBe(1);
  });
});

const SimpleView = () => {
  const [n, setN] = useState(0);

  useClickOutsideListenerRef(() => {
    setN(1);
  });

  return (
    <div data-testid={'test'}>
      <h1 data-testid={'number'}>{n}</h1>
    </div>
  );
};
