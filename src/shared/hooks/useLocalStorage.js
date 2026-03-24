import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      return initialValue;
    } catch (e) {
      console.error(`[useLocalStorage:init] key="${key}"`, e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(`[useLocalStorage:effect] key="${key}"`, e);
    }
  }, [key, state]);

  return [state, setState];
}
