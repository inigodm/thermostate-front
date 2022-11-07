
import React, {useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

export default function Navigation() {
  const [value, setValue]  = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return  <Tabs value={value} onChange={handleChange}  aria-label="wrapped label tabs example">
    <Tab href="/main" label="Main"></Tab>
    <Tab href="/schedules" label="Schedules"/>
    <Tab href="/user" label="User management"></Tab>
  </Tabs> 
}