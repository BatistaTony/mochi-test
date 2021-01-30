import { useGeoCode } from './../index';
import { renderHook } from '@testing-library/react-hooks';
import { GeocoderResult } from '@typescript';
import { head } from 'ramda';

describe('Testing a useGeoCode hook', () => {
  it('Test if a useGeoCode is loaded sucessfully simulating data', () => {
    var isChanged: any = null;

    const handleChange = result => {
      isChanged = TextTrackCueList;
    };

    const handleSelectPrediction = (results: GeocoderResult[]) => {
      const result = head(results);
      handleChange(result);
    };

    const placeId = 'jhj45747';

    const { result } = renderHook(() => useGeoCode({ placeId: placeId }, handleSelectPrediction));

    expect(result.current.valueOf()).toBe(true);
    expect(isChanged).toBeTruthy();
  });

  it('Should return false when given some wrong parameter ', () => {
    const placeId = 'jhj45747';

    const { result } = renderHook(() => useGeoCode({ placeId: placeId }, () => {}));

    expect(result.current.valueOf()).toBe(false);
  });
});
