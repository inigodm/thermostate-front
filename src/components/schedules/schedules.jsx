import React, {useState, useEffect} from "react";
import useToken from "../customHooks/useToken";
import TableComponent from "./table";
import './schedules.css'
import { newSchedule, updateSchedule } from "./schedules-origin";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function Schedules() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [id, setId] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [minTemp, setMinTemp] = useState();
  const [activation, setActive] = useState();
  const { setToken, token } = useToken();

  const activeOnInit = true;


  const queryClient = useQueryClient()

    const handleCreateSubmit = async e => {
        e.preventDefault();
        mutationCreate.mutate();
    }

    const handleUpdateSubmit = async e => {
      if(id === undefined) {
        return handleCreateSubmit(e);
      }
      e.preventDefault();
      mutationUpdate.mutate();
  }

  const mutateSchedule = () => {
    const active = activation;
      const schedule = updateSchedule({
        id,
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
        active,
        minTemp
      },
      token);
  }

  const insertSchedule = () => {
    const active = activation;
    const schedule = newSchedule({
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      active, 
      minTemp
    },
    token);
  }

  const mutationCreate = useMutation(insertSchedule, {
    onSuccess: () => {
    queryClient.refetchQueries({ queryKey: ['allSchedulles'] })
    }
  })

  const mutationUpdate = useMutation(mutateSchedule, {
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['allSchedulles'] })
    }
  })

    const handleCheckChange = (e) => {
      console.log(e.target.checked + " => " + activation)
      setActive(e.target.checked);
    }

    const setScheduleShow = (_id, _dateFrom, _dateTo, _timeFrom, _timeTo, _minTemp, _activation) => {
      setDateFrom(_dateFrom);
      setDateTo(_dateTo);
      setTimeFrom(_timeFrom);
      setTimeTo(_timeTo);
      setMinTemp(_minTemp);
      setActive(_activation);
      setId(_id);
    }

    useEffect(() => {
      setActive(activeOnInit);
    }, []); 
      
    return (<div className="login-wrapper">
    <h1>Existing Schedules</h1>
    <TableComponent handleClickInRow={setScheduleShow}></TableComponent>
    <h1>Schedules</h1>
      <form>
            <input type="hidden" name="id" value={id}/>
            <div className="twoDivsInline">
              <div>
                  <InputLabel>From date</InputLabel>
                  <Input type="date" onChange={e => setDateFrom(e.target.value)} value={dateFrom}/>
              </div>
              <div>
                  <InputLabel>To date</InputLabel>
                  <Input type="date" onChange={e => setDateTo(e.target.value)} value={dateTo}/>
              </div>
            </div>
            <div className="twoDivsInline">
              <div>
                  <InputLabel>From time</InputLabel>
                  <Input type="time" onChange={e => setTimeFrom(e.target.value)} value={timeFrom}/>
              </div>
              <div>
                  <InputLabel>To time</InputLabel>
                  <Input type="time" onChange={e => setTimeTo(e.target.value)} value={timeTo}/>
              </div>
            </div>
            <div className="twoDivsInline">
              <div>
                  <InputLabel>Min temp</InputLabel>
                  <Input type="number" onChange={e => setMinTemp(e.target.value)} value={minTemp}/>
              </div>
              <div>
                  <InputLabel>Active</InputLabel>
                  <input type="checkbox" onChange={handleCheckChange}  defaultChecked={activeOnInit} defaultValue={activeOnInit} value={activation} checked={activation}/>
              </div>
            </div>
            <div>
                <Button variant="contained" type="button" onClick={handleCreateSubmit}>Create new</Button>
            </div>
            <div>
                <Button variant="contained" type="button" onClick={handleUpdateSubmit}>Update</Button>
            </div>
      </form>
  </div>);
}