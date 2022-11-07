import React, {useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import getAllSchedules from "./schedules-origin";
//import './table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

export default function TableComponent({handleClickInRow}) {
  const { token, setToken } = useToken();

  const [allSchedules, setAllSchedules]  = useState([]);


  useEffect(() => {
    const getSchedules = async () => {
      const data = await getAllSchedules(token);
      const json = await data.json();
      setAllSchedules(json.value);
    };
    getSchedules();
  }, []);

  //Pq esto NO funciona?
  // Pq tengo 2 veces: 2 OPTION y 2 GET??
   /*useEffect(() => {
    getAllSchedules(token)
    .then( data => { data.json()})
    .then( json => { setAllSchedules(json.value)
    });},
   []);*/
  
 console.log(allSchedules?.value);
  return (
      <div className="App">
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Active</TableCell>
            <TableCell>Date From</TableCell>
            <TableCell>Date To</TableCell>
            <TableCell>Time From</TableCell>
            <TableCell>Time To</TableCell>
            <TableCell>Min. Temp</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          { 
          allSchedules?.map((item) => {
            return (
              <TableRow key={item.id} onClick={e => handleClickInRow(item.id, item.dateFrom, item.dateTo, item.timeFrom, item.timeTo, item.minTemp, item.active)}>
                <TableCell><Checkbox checked={item.active}/></TableCell>
                <TableCell>{item.dateFrom}</TableCell>
                <TableCell>{item.dateTo}</TableCell>
                <TableCell>{item.timeFrom}</TableCell>
                <TableCell>{item.timeTo}</TableCell>
                <TableCell>{item.minTemp}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    );
  }