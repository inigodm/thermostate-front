import React, {useMemo} from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import {Schedules} from './components/schedules/schedules';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './components/customHooks/useToken';
import Navigation from './components/navigation/navigation.jsx';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Main } from './components/main/Main';


function App() {
  const { setToken, token } = useToken();
  if (!token) {
    return <Login setToken={setToken}/>
  }

  const queryClient = new QueryClient();

  return (
    <div className="wrapper">
    <Navigation/>
     <h1>Thermostate</h1>
     <QueryClientProvider client={queryClient}>
     <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <Routes>
         <Route path='/main' element={<Main/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path='/schedules' element={<Schedules/>}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
