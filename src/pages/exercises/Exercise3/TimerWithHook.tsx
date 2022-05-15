import { FC, useEffect, useState } from "react";

import { Row } from "../../../components/Row";

export const TimerWithHook: FC<{
  startSeconds?: number;
}> = ({
  startSeconds = 0,
}) => {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    setSeconds(startSeconds);
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [startSeconds]);

  return <>
    <Row>-----Timer with hook-----</Row>
    <Row>Starting with {startSeconds} seconds</Row>
    <Row>Currently {seconds} seconds </Row>
  </>;
};