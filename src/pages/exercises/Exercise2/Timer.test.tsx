import { act, render, screen } from '@testing-library/react';


import { Timer } from './Timer';


// TODO: fix the tests by fixing the production code; the tests shouldn't be touched
// hint: useEffect - cleanup documentation https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
// hint: https://www.w3schools.com/jsref/met_win_clearinterval.asp

beforeAll(() => {
    jest.useFakeTimers('modern');
  },
);

const testCountsStartingWithCurrentSeconds = (startSeconds: number, times: number) => {
  let currentSeconds = startSeconds;

  while (currentSeconds < startSeconds + times) {
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(screen.getByText(`Starting with ${startSeconds} seconds`)).toBeInTheDocument();
    expect(screen.getByText(`Currently ${++currentSeconds} seconds`)).toBeInTheDocument();
  }
};

test('starts with 0 seconds and counts every second', () => {
  render(<Timer/>);

  expect(screen.getByText('Starting with 0 seconds')).toBeInTheDocument();
  expect(screen.getByText('Currently 0 seconds')).toBeInTheDocument();

  testCountsStartingWithCurrentSeconds(0, 10);
});


test('starts with the initialized number of seconds and counts every second', () => {
  render(<Timer startSeconds={5}/>);

  expect(screen.getByText('Starting with 5 seconds')).toBeInTheDocument();
  expect(screen.getByText('Currently 5 seconds')).toBeInTheDocument();

  testCountsStartingWithCurrentSeconds(5, 10);
});


test('resets the counter when changing the start seconds property', () => {
  const { rerender } = render(<Timer startSeconds={5}/>);

  expect(screen.getByText('Starting with 5 seconds')).toBeInTheDocument();
  expect(screen.getByText('Currently 5 seconds')).toBeInTheDocument();

  testCountsStartingWithCurrentSeconds(5, 5);

  rerender(<Timer startSeconds={0}/>);

  expect(screen.getByText('Starting with 0 seconds')).toBeInTheDocument();
  expect(screen.getByText('Currently 0 seconds')).toBeInTheDocument();

  testCountsStartingWithCurrentSeconds(0, 5);
});