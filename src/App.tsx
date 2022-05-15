import { FC } from 'react';
import './App.css';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Examples } from './pages/examples/Examples';
import { Home } from './pages/home/Home';
import { UsersProvider } from './pages/exercises/Exercise4/components/UsersContext';
import { Exercises } from './pages/exercises/Exercises';

const App: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UsersProvider>
          <Routes>
            <Route path={`/examples/*`} element={<Examples/>}/>
            <Route path={`/exercises/*`} element={<Exercises/>}/>
            <Route path={`/home`} element={<Home/>}/>
            <Route path={`/*`} element={<Navigate to={'/home'}/>}/>
          </Routes>
        </UsersProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
