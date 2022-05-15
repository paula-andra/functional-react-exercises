import { VFC, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { Row } from '../../components/Row';

import { Counter } from './Example2/Counter';
import { Components } from './Example1/Components';
import { ContextExample } from './Example4/ContextExample';
import { CounterWithHook } from './Example3/CounterWithHook';

const ParamsComponent: VFC = () => {
  const params = useParams();
  return <Row>Id: {params.id}</Row>;
};
const CounterExample: VFC<{ exampleNumber: number, withHook?: boolean }> = ({ exampleNumber, withHook }) => {

  const [initialValue, setInitialValue] = useState(1);
  const [incrementStep, setIncrementStep] = useState(3);

  const counterProps = { initialValue, incrementStep };

  return <>
    <Row>----Example {exampleNumber}----</Row>
    <Row>
      <button onClick={() => setInitialValue((currentValue) => currentValue + 1)}>Increase initial value</button>
      <button onClick={() => setIncrementStep((currentValue) => currentValue + 1)}>Increase increment step</button>
    </Row>
    {withHook ? <CounterWithHook {...counterProps}/> : <Counter {...counterProps}/>}
  </>;
};


export const Examples: VFC = () => {

  return <Routes>
    <Route path={''}
           element={<>
             <Row><Link to={'components'}>Example 1</Link></Row>
             <Row><Link to={'counter'}>Example 2</Link></Row>
             <Row><Link to={'counter-with-hook'}>Example 3</Link></Row>
             <Row><Link to={'context-example'}>Example 4</Link></Row>
             <Row><Link to={'custom-hook-with-context-test'}>Example 5</Link></Row>
           </>}/>

    <Route path={`components`} element={<><Row>----Example 1----</Row><Components/></>}/>
    <Route path={`counter`} element={<CounterExample exampleNumber={2}/>}/>
    <Route path={`counter-with-hook`} element={<CounterExample exampleNumber={3} withHook/>}/>

    <Route path={`context-example`} element={<><Row>----Example 4----</Row><ContextExample/></>}/>
    <Route path={`custom-hook-with-context-test`} element={<><Row>----Example 5---</Row><Row>Black box testing is preferred. Therefore, knowing/setting the context value in tests is recommended over mocking a certain function, which would imply intimate knowledge of the implementation.</Row></>}/>
    <Route path={`:id`} element={<ParamsComponent/>}/>

  </Routes>;
};