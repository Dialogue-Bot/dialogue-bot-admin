import { useEffect, useRef } from 'react';

export const useDidUpdate = (fn: () => void, deps: any[]) => {
   const didMountRef = useRef(false);
   useEffect(() => {
      if (didMountRef.current) {
         return fn();
      } else {
         didMountRef.current = true;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, deps);
};
