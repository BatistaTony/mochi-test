import SearchLocationInput from './index';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useCallback } from 'react';
import { getStreetFromPlaceObject } from '@utils/helper-functions';
import { useForm } from 'react-hook-form';

describe('Testing a ShareLocationInput Component', () => {
  it('Testing if it renders correctly, without crashing', () => {
    const { debug } = render(<SimpleComponent />);
  });

  it('Testing if input got value', () => {
    render(<SimpleComponent />);

    const ipt = screen.getByLabelText('Input Street') as HTMLInputElement;

    act(() => {
      fireEvent.change(ipt, { value: 'Lisboa ' });
    });

    expect(ipt.value).toBe('Lisboa');
  });

  it('Testing what fire if got no value', () => {});
});

export type GeocoderResult = google.maps.GeocoderResult;

const SimpleComponent = () => {
  const { handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      street: '',
    },
  });

  const handleChange = useCallback((payload: GeocoderResult) => {
    setValue('street', getStreetFromPlaceObject(payload));
  }, []);

  return (
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
};
