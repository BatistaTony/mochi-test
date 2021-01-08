import { useCallback, useEffect, useRef } from 'react';

type noop = () => void;
type OnClose = (event: MouseEvent) => void;

const useClickOutsideListenerRef = (onClose: OnClose | noop) => {
  const ref = useRef(null);

  const escapeListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        (onClose as noop)();
      }
    },
    [onClose]
  );

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !(ref.current! as any).contains(e.target)) {
        onClose(e);
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);
  return ref;
};

export default useClickOutsideListenerRef;
