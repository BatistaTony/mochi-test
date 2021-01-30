import { useGetPlacePredictions } from '../index';
import DEFAULT_CONFIG from './../../constants/config';
import { AutocompletePrediction } from '@typescript';
import { renderHook, act } from '@testing-library/react-hooks';

describe('Testing a getPlacePredictions  hook', () => {
  it('Should render correctly', () => {
    var PredictionsFounded: any = null;

    const setPredictions = (data: AutocompletePrediction[]) => {
      PredictionsFounded = data;
    };

    const data = {
      input: 'someString',
      componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
    };

    const { result } = renderHook(() => useGetPlacePredictions(data, setPredictions));

    expect(result.current.valueOf()).toBe(true);
    expect(PredictionsFounded).toBeTruthy();
  });

  it('should load auto complete service when user write start write', () => {
    var query = '';

    const setPredictions = (data: AutocompletePrediction[]) => {
      console.log(data);
    };

    const data = {
      input: query,
      componentRestrictions: DEFAULT_CONFIG.COMPONENT_RESTRICTIONS,
    };

    const { result } = renderHook(() => useGetPlacePredictions(data, setPredictions));

    act(() => {
      query = 'teste';
    });

    expect(result.current.valueOf()).toBe(true);
  });
});
