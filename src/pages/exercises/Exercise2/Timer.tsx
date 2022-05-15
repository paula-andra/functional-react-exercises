import { FC, useEffect, useState } from "react";

import { Row } from "../../../components/Row";

export const Timer: FC<{
  startSeconds?: number;
}> = ({
  startSeconds = 0,
}) => {
  const [seconds, setSeconds] = useState(startSeconds);


  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  }, []);

  return <>
    <Row>-----Timer-----</Row>
    <Row>Starting with {startSeconds} seconds</Row>
    <Row>Currently {seconds} seconds </Row>
  </>;
};