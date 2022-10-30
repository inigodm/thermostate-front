import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import NewSchedule, { ManageSchedule} from './components/schedules/schedules';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './components/customHooks/useToken';

function App() {
  const { setToken, token } = useToken();
  console.log("token is: " + token);
  console.log(setToken);
  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
     <h1>Application</h1>
      <BrowserRouter>
        <Routes>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path='/schedules' element={<ManageSchedule/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
