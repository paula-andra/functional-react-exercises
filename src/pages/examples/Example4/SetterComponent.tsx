import { VFC, useState } from 'react';

import { Row } from '../../../components/Row';

import { useValue } from './ValueContext';


export const SetterComponent: VFC = () => {
  const [valueToSet, setValueToSet] = useState<string>('');
  const { setValue } = useValue();
  return <>
    <Row>-----SetterComponent for the context-----</Row>
    <Row>
      <input value={valueToSet} onChange={(event) => setValueToSet(event.target.value)}/>
      <button onClick={() => setValue(valueToSet)}>
        Add entry
      </button>
    </Row>
  </>;
};