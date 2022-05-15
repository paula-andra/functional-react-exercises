/* eslint-disable no-console */
import { VFC} from "react";

import { Row } from "../../../components/Row";

import { useCounter } from './use-counter';

export const CounterWithHook: VFC<{
  initialValue?: number;
  incrementStep?: number;
}> = ({
  initialValue = 0,
  incrementStep = 1,
}) => {
  const {count, increment} = useCounter(initialValue, incrementStep);

  return <>
    <Row>-----Counter with custom hook-----</Row>
    <Row>A counter which counts how many time the button was clicked, starting with an initial value and having a specific increment step. Both values can be changed from outside.</Row>
    <Row>This counter uses a custom hook</Row>
    <Row>----------</Row>
    <Row>Initial value : {initialValue}</Row>
    <Row>Current increment: {incrementStep}</Row>
    <Row>Current value : {count}</Row>
    <Row>
      <button onClick={increment}>Increase value</button>
    </Row>
  </>;
};