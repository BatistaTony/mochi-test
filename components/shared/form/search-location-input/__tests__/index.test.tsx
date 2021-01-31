import SearchLocationInput from '../index';
import { render, screen, fireEvent, act } from '@testing-library/react';
export type GeocoderResult = google.maps.GeocoderResult;

describe('Testing a ShareLocationInput Component', () => {
  it('Testing if it renders correctly, without crashing', () => {
    const handleChange = () => {};
    const errors = {};

    const { debug } = render(
      <SearchLocationInput
        noBorder
        placeholder="location"
        handleChange={handleChange}
        defaultValue=""
        errors={errors}
        labelLess
        predictionsContainerWidth="160%"
        predictionsContainerPositionX="-6rem"
      />
    );
  });

  it('Testing if input got value', () => {
    const handleChange = (payload: GeocoderResult) => {};

    const errors = {};

    render(
      <SearchLocationInput
        noBorder
        placeholder="location"
        handleChange={handleChange}
        defaultValue=""
        errors={errors}
        labelLess
        predictionsContainerWidth="160%"
        predictionsContainerPositionX="-6rem"
      />
    );

    const ipt = screen.getByPlaceholderText('location') as HTMLInputElement;

    act(() => {
      fireEvent.change(ipt, { value: 'Lisboa ' });
    });

    expect(ipt.value).toBe('Lisboa');
  });
});
