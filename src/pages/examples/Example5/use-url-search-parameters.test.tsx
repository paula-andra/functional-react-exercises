import { renderHook } from '@testing-library/react-hooks';
import routeData, { MemoryRouter } from 'react-router-dom';


import { useURLSearchParameters } from './use-url-search-parameters';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));


it.skip('not working since useLocation can only be used in the Router context', () => {
  const { result } = renderHook(() => useURLSearchParameters());

  expect(result.current).toBeTruthy();
});

it.skip('convert search params', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(routeData, 'useSearchParams').mockReturnValue([new URLSearchParams('?entries=1&entries=2&user=john'), () => {
  }]);

  const { result } = renderHook(() => useURLSearchParameters());

  expect(result.current).toEqual({ entries: ['1', '2'], user: 'john' });
});


it('read query parameters from url', () => {
  const searchParameters = '?entries=1&entries=2&user=john';
  const { result } = renderHook(
    () => useURLSearchParameters(),
    {
      wrapper: ({ children }) =>
        <MemoryRouter initialEntries={[`/path${searchParameters ?? ''}`]}>
          {children}
        </MemoryRouter>,
    },
  );

  expect(result.current).toEqual({ entries: ['1', '2'], user: 'john' });
});
