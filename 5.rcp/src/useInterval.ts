import { useRef, useEffect } from 'react';

function useInterval(callback : () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined)
        savedCallback.current();
    }

    if(delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return savedCallback.current;
  }, [delay]);
}

export default useInterval;