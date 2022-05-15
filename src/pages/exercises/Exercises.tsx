import React, { VFC, useState } from 'react';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Row } from '../../components/Row';

import { Timer } from './Exercise2/Timer';
import { List } from './Exercise2/List';
import { TimerWithHook } from './Exercise3/TimerWithHook';
import { Users } from './Exercise4/Users';

export const Exercises: VFC = () => {

  const [timerStartSeconds, setTimerStartSeconds] = useState(0);

  return <Routes>
    <Route path={''}
           element={<>
             <Row><Link to={'exercise-2'}> Exercise 2</Link></Row>
             <Row><Link to={'exercise-3'}> Exercise 3</Link></Row>
             <Row><Link to={'exercise-4'}> Exercise 4</Link></Row>
           </>}/>
    <Route path={'exercise-2'} element={
      <>
        <Row>-----Exercise 2-----</Row>
        <Row>Fix components list and timer, based on the tests, without touching the tests.</Row>
        <Row><Link to={'list'}> List</Link></Row>
        <Row><Link to={'timer'}>Timer</Link></Row>
        <Outlet/>
      </>
    }>
      <Route path={`list`} element={<List/>}/>

      <Route path={`timer`} element={
        <>
          <Row>
            <button onClick={() => setTimerStartSeconds(currentValue => currentValue + 10)}> Increase starting seconds
              for
              timer
            </button>
          </Row>
          <Timer startSeconds={timerStartSeconds}/>
        </>
      }/>

      <Route path={`*`} element={<Navigate to={'list'}/>}/>
    </Route>
    <Route path={`exercise-3`} element={
      <>
        <Row>-----Exercise 3-----</Row>
        <Row>Extract a custom hook use-timer and adapt the tests from Timer for useTimer hook, based on Example3
          (useCounter). The test file for use-timer is already present.</Row>
        <Row>
          <button onClick={() => setTimerStartSeconds(currentValue => currentValue + 10)}> Increase starting seconds
            for
            timer
          </button>
        </Row>
        <TimerWithHook startSeconds={timerStartSeconds}/>
      </>
    }/>
    <Route path={`exercise-4`} element={
      <>
        <Row>-----Exercise 4-----</Row>
        <Row>This is an exercises that combines everything we mentioned until now - useState, useEffect, Context.</Row>
        <Row>Additionally one could take a look at <a href={'https://reactrouter.com/docs/en/v6/getting-started/concepts'}>React Router Concepts</a> which was used in this project</Row>
        <Row>This exercises can be implemented successfully by fixing the tests in 'Users.test.tsx' in the order they appear.</Row>
        <Row>In the end one should have a pretty rudimentar user management.</Row>
        <Link to={'../users'}></Link>
      </>
    }/>
    <Route path={`user`} element={<Users/>}/>

  </Routes>;
};