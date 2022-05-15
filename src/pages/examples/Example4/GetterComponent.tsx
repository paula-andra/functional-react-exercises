import { VFC} from 'react';

import { Row } from '../../../components/Row';

import { useValue } from './ValueContext';


export const GetterComponent: VFC = () => {
  const { value } = useValue();
  return <>
    <Row>-----GetterComponent for the context-----</Row>
    <Row>Current value {value}</Row>
  </>;
};