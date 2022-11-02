import React, {useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import getAllSchedules from "./schedules-origin";
import './table.css'

export default function Table() {
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
  
 console.log(allSchedules.value);
  return (
      <div className="App">
        <table>
          <tr>
            <th>Active</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Time From</th>
            <th>Time To</th>
            <th>Min. Temp</th>
          </tr>
          { 
          allSchedules.map((item) => {
            return (
              <tr key={item.id}>
                <td><input type="checkbox" checked={item.active}/></td>
                <td>{item.dateFrom}</td>
                <td>{item.dateTo}</td>
                <td>{item.timeFrom}</td>
                <td>{item.timeTo}</td>
                <td>{item.minTemp}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }