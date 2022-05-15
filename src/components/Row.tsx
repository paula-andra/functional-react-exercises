import './Row.css';
import { FC } from 'react';

export const Row: FC = ({children}) => {
  return <>{children && <div className={'row'}>{children}</div>}</>;
};