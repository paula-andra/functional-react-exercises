import { useSearchParams } from 'react-router-dom';

export const useURLSearchParameters: () => Record<string, string | string[]> = () => {

  const searchParams = useSearchParams()[0];

  return Object.fromEntries([...searchParams.keys()].map(key => {
    const paramValue = searchParams.getAll(key);
    return [key, paramValue.length === 1 ? paramValue[0] : paramValue];
  }));
};