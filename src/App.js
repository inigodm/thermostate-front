import React, {useMemo} from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import {Schedules} from './components/schedules/schedules';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './components/customHooks/useToken';
import Table from './components/schedules/table';
import Navigation from './components/navigation/navigation.jsx';

function App() {
  const { setToken, token } = useToken();
  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
    <Navigation/>
     <h1>Thermostate</h1>
      <BrowserRouter>
        <Routes>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path='/schedules' element={<Schedules/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
