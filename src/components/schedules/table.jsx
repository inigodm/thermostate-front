import React, {useEffect, useState} from "react";
import useToken from "../customHooks/useToken";
import {getAllSchedules, deleteSchedule} from "./schedules-origin";
//import './table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { DeleteForever } from '@mui/icons-material';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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

  const handleDelete = (id) => {
     const response = deleteSchedule(id, token);
  }

  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['allSchedulles'], queryFn: getAllSchedules })

  const mutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

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
            <TableCell></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          { 
          allSchedules?.map((item) => {
            return (
              <TableRow key={item.id} onClick={e => handleClickInRow(item.id, item.dateFrom, item.dateTo, item.timeFrom, item.timeTo, item.minTemp, item.active)}>
                <TableCell><Checkbox defaultChecked={item.active} onClick={(e) => { e.preventDefault()}}/></TableCell>
                <TableCell>{item.dateFrom}</TableCell>
                <TableCell>{item.dateTo}</TableCell>
                <TableCell>{item.timeFrom}</TableCell>
                <TableCell>{item.timeTo}</TableCell>
                <TableCell>{item.minTemp}</TableCell>
                <TableCell><DeleteForever color="primary" onClick={() =>  { mutation.mutate({
                  id: item.id,
                  token: token
                })  
              }}/></TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    );
  }