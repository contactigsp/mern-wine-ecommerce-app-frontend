import { useEffect, useState } from "react";

export default function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(
    localStorage[key] === undefined
      ? defaultValue
      : JSON.parse(localStorage.getItem(key))
  );

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state]);

  return [state, setState];
}
