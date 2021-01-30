import { useGoogleSignIn } from '../index';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as R from 'ramda';

describe('Testing useGoogleSignIn hook ', () => {
  it('Test if google sign in is loaded', () => {
    const onFailure = () => {};

    const onSuccess = () => {};

    render(<SimpleComponent onFailure={onFailure} onSuccess={onSuccess} />);

    const { result } = renderHook(() => useGoogleSignIn({ buttonId: 'btn', onFailure, onSuccess }));

    expect(result.current.loaded).toBe(true);
  });

  it('Test when is  passed a buttonId that does not exist', () => {
    const onFailure = () => {};
    const onSuccess = () => {};

    const { result } = renderHook(() =>
      useGoogleSignIn({ buttonId: 'ddgfd', onFailure, onSuccess })
    );

    expect(result.current.loaded).toBe(false);
  });

  it('test if that hook add a google map script to component', async () => {
    const onFailure = error => {};

    const onSuccess = data => {};

    const { debug, container } = render(
      <SimpleComponent onFailure={onFailure} onSuccess={onSuccess} />
    );

    debug();
  });

  it('check if user sign with sucess', () => {
    var isSucess = false;

    const onFailure = error => {};

    const onSuccess = data => {
      const exampleData = {
        client_id: 'CLIENT_ID.apps.googleusercontent.com',
      };

      isSucess = R.equals(data, exampleData);
    };

    render(<SimpleComponent onFailure={onFailure} onSuccess={onSuccess} />);

    fireEvent.click(screen.getByTestId('btn'));

    expect(isSucess).toBe(true);
  });

  it('check if user sign with failure', () => {
    var isSucess = false;

    const onFailure = error => {};

    const onSuccess = data => {
      const exampleData = {
        client_id: 'CLIENT_ID.apps.googleusercontent.com',
      };

      isSucess = R.equals(data, exampleData);
    };

    render(<SimpleComponent onFailure={onFailure} onSuccess={onSuccess} />);

    fireEvent.click(screen.getByTestId('btn'));

    expect(isSucess).toBe(false);
  });
});

interface SimpleComponentProps {
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
}

const SimpleComponent = ({ onFailure, onSuccess }: SimpleComponentProps) => {
  const h = useGoogleSignIn({ buttonId: 'btn', onFailure, onSuccess });

  return (
    <button id="btn" data-testid="btn">
      click here
    </button>
  );
};
