/* eslint-disable no-console */
import { VFC, useEffect, useState } from "react";

import { Row } from "../../../components/Row";

export const Counter: VFC<{
  initialValue?: number;
  incrementStep?: number;
}> = ({
  initialValue = 0,
  incrementStep = 1,
}) => {
  const [value, setValue] = useState(initialValue);
  // called on every rendering
  useEffect(() => {
    console.log(`I am called on every rendering: initial value ${initialValue} and increment ${incrementStep}`);
  });

  // called only once, on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => console.log(`I am called only once, on mount: Started with initial value ${initialValue} and increment ${incrementStep}`), []);


  // called whenever either initialValue or increment changed
  useEffect(() => {
    console.log(`I am called whenever either initialValue or increment changed. Props changed: initial value ${initialValue} and increment ${incrementStep}`);
    return () => console.log(`Just doing some cleanup... Cancelling requests, clearing storages. Current values initial value ${initialValue} and increment step ${incrementStep}`);
  }, [initialValue, incrementStep]);

  // // called whenever value changed
  // useEffect(() => console.log(`Value changed! Current value ${value} `), [value]);

  return <>
    <Row>-----Counter-----</Row>
    <Row>A counter which counts how many time the button was clicked, starting with an initial value and having a specific increment step. Both values can be changed from outside.</Row>
    <Row>----------</Row>
    <Row>Initial value : {initialValue}</Row>
    <Row>Current increment: {incrementStep}</Row>
    <Row>Current value : {value}</Row>
    <Row>
      <button onClick={() => setValue((value) => value + incrementStep)}>Increase value</button>
    </Row>
  </>;
};