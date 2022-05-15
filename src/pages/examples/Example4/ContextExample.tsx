import { VFC } from 'react';

import { Row } from '../../../components/Row';

import { ValueProvider } from './ValueContext';
import { SetterComponent } from './SetterComponent';
import { GetterComponent } from './GetterComponent';

export const ContextExample: VFC = () => {

  return <ValueProvider>
    <Row>-----Context Example-----</Row>
    <SetterComponent/>
    <GetterComponent/>
  </ValueProvider>;
};
