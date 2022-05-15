import { FC, createContext, useContext, useState } from 'react';

export type ValueContextType = {
  value?: string;
  setValue: (value: string) => void
};

const ValueContext = createContext<ValueContextType>({
  setValue: () => {
    throw 'not implemented';
  },
});
export const useValue = () => useContext(ValueContext);

const { Provider } = ValueContext;

export const ValueProvider: FC = ({ children }) => {
  const [value, setValue] = useState<string | undefined>();
  return <Provider value={{ value, setValue }}>{children}</Provider>;
};