import { useScript } from '../index';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import React from 'react';

const GoogleMapTest = () => {
  return (
    <div>
      <div id="mapG">google map here</div>
    </div>
  );
};

describe('Testing a useScript hook', () => {
  it('Testing if a script is loaded correctly', () => {
    render(<GoogleMapTest />);

    var isCorrectlyLoaded = false;

    const setIsCorrectlyLoaded = value => {
      isCorrectlyLoaded = value;
    };

    const data = {
      src: `someValidScriptOfGoogleMap`,
      id: 'mapG',
      callback: () => setIsCorrectlyLoaded(true),
      async: false,
    };

    const { result } = renderHook(() => useScript(data));

    expect(isCorrectlyLoaded).toBe(true);
    expect(result.current).toBeUndefined();
  });

  it('Testing when the script is not loaded correctly', () => {
    render(<GoogleMapTest />);

    var isCorrectlyLoaded = false;

    const setIsCorrectlyLoaded = value => {
      isCorrectlyLoaded = value;
    };

    const data = {
      src: `someValidScriptOfGoogleMap`,
      id: '',
      callback: () => setIsCorrectlyLoaded(true),
      async: false,
    };

    const { result } = renderHook(() => useScript(data));

    expect(isCorrectlyLoaded).toBe(false);
    expect(result.current).toBeUndefined();
  });
});
