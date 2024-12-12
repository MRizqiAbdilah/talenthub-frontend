import { useEffect, useState } from "react";

export default function useFormStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  storeCalback: (state: T) => F
) {
  const stateOfStore = store(storeCalback) as F;
  const [state, setState] = useState<F>();

  useEffect(() => {
    setState(stateOfStore);
  }, [stateOfStore]);

  return state;
}
