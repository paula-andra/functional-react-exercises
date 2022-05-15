import { useEffect, useState } from 'react';

export const useCounter = (initialValue: number, incrementStep: number) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {setCount(initialValue) }, [initialValue])

  const increment = () => setCount((c) => c + incrementStep);

  return { count, increment };
};