import { useGetPlacePredictions } from '../index';
import { act, render } from '@testing-library/react';
import DEFAULT_CONFIG from './../../constants/config';
import { head } from 'ramda';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { AutocompletePrediction } from '@typescript';
import { renderHook } from '@testing-library/react-hooks';

const defaultValue = '';

describe('Testing a getPlacePredictions  hook', () => {
  it('it render correctly', () => {
    const query = '';

    const setPredictions = (data: AutocompletePrediction[]) => {
      console.log(data);
    };

    const data = {
      input: query === defaultValue ? '' : 'no',
      componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
    };

    const { result } = renderHook(() => useGetPlacePredictions(data, setPredictions));

    expect(result.current.valueOf()).toBe(false);
  });

  it('should load auto complete service true when user write start write', () => {
    render(<Input />);

    var query = '';

    const setPredictions = (data: AutocompletePrediction[]) => {
      console.log(data);
    };

    const data = {
      input: query === defaultValue ? '' : 'no',
      componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
    };

    const { result } = renderHook(() => useGetPlacePredictions(data, setPredictions));

    act(() => {
      query = 'teste';
    });

    expect(result.current.valueOf()).toBe(true);
  });

  it('is returning the first of list', () => {});

  it('Should return array with predictions', () => {});
});

const Input = () => {
  const [query, setQuery] = useState(defaultValue);
  const [predictions, setPredictions] = useState<Array<AutocompletePrediction>>([]);
  const [debouncedQuery] = useDebounce(query, 1000);

  const h = useGetPlacePredictions(
    {
      input: query === defaultValue ? '' : debouncedQuery,
      componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
    },
    setPredictions
  );

  return <input type="text" data-testid={'input'} />;
};
