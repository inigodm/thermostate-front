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
import { DeleteForever, DeleteForeverRounded } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function TableComponent({handleClickInRow}) {
  const { token, setToken } = useToken();
  const queryClient = useQueryClient()


  const getSchedules = async () => {
    const data = await getAllSchedules(token);
    const json = await data.json();
    return json.value;
  };

  const { isLoading, isError, data, error } = useQuery({ queryKey: ['allSchedulles'], queryFn: getSchedules })

  const handleDelete = async (id) => {
      await mutation.mutateAsync(id, token);
  }

  const deleteFunction = (id) => {
    deleteSchedule(id, token);
  }

  const mutation = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
      // Invalidate, refetch
      queryClient.invalidateQueries({ queryKey: ['allSchedulles'] });
      queryClient.refetchQueries({ queryKey: ['allSchedulles'] });
    },
    onError: (e) => {
      console.log("error" + e)
    }
  })

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
          data?.map((item) => {
            return (
              <TableRow key={item.id} onClick={e => handleClickInRow(
                item.id, 
                item.dateFrom, 
                item.dateTo, 
                item.timeFrom, 
                item.timeTo, 
                item.minTemp, 
                item.active)}>
                <TableCell><Checkbox defaultChecked={item.active} onClick={(e) => { e.preventDefault()}}/></TableCell>
                <TableCell>{item.dateFrom}</TableCell>
                <TableCell>{item.dateTo}</TableCell>
                <TableCell>{item.timeFrom}</TableCell>
                <TableCell>{item.timeTo}</TableCell>
                <TableCell>{item.minTemp}</TableCell>
                <TableCell><DeleteForever color="primary" onClick={() => handleDelete(item.id)}/></TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    );
  }