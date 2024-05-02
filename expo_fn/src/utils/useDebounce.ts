import { useCallback, useRef } from "react";

export const useDebounce = (callback: () => void, delay: number) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
    const debouncedCallback = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay]);
  
    return debouncedCallback;
  };

// export const useDebounce = <T extends any[]>(callback: (...args: T) => void, delay: number) => {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const debouncedFunction = useCallback((...args: T) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       callback(...args);
//     }, delay);
//   }, [callback, delay]);

//   return debouncedFunction;
// };
