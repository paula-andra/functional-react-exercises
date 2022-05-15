import { VFC } from 'react';
import { Link } from 'react-router-dom';

import { Row } from '../../components/Row';

export const Home: VFC = () => {
  return <>
    <Row><Link to={'/examples'}>Examples</Link></Row>
    <Row><Link to={'/exercises'}>Exercises</Link></Row>
  </>;
};