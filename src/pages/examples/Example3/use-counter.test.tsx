import { act, renderHook } from '@testing-library/react-hooks';

import { useCounter } from './use-counter';

test('should start with initial property and increment counter', () => {
  const { result } = renderHook(() => useCounter(0, 1));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('should use the increment step when this changes', () => {
  const { result, rerender } = renderHook((initialIncrementStep) => useCounter(0, initialIncrementStep), { initialProps: 10 });

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(10);

  rerender(5);

  expect(result.current.count).toBe(10);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(15);

  expect(result.all.map(e => (e as {count:number}).count)).toEqual([0,10,10,15]);
});

test('should reset count step when the initial value changes', () => {
  const { result, rerender } = renderHook((initialValue) => useCounter(initialValue, 10), { initialProps: 0 });

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(10);

  rerender(5);

  expect(result.current.count).toBe(5);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(15);

  expect(result.all.map(e => (e as {count:number}).count)).toEqual([0,10,10,5,15]);
});