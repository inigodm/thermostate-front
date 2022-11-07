import React, {useState} from "react";
import useToken from "../customHooks/useToken";
import TableComponent from "./table";
import './schedules.css'
import { newSchedule } from "./schedules-origin";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export function Schedules() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [minTemp, setMinTemp] = useState();
  const [activation, setActive] = useState();
  const { setToken, token } = useToken();
  

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(token);
        const active = activation === "on" ? "true" : "false";
        const schedule = await newSchedule({
          dateFrom,
          dateTo,
          timeFrom,
          timeTo,
          active,
          minTemp
        },
        token);
    }

    const setScheduleShow = (_id, _dateFrom, _dateTo, _timeFrom, _timeTo, _minTemp, _activation) => {
      setDateFrom(_dateFrom);
      setDateTo(_dateTo);
      setTimeFrom(_timeFrom);
      setTimeTo(_timeTo);
      setMinTemp(_minTemp);
      setActive(_activation);
    }
      
    return (<div className="login-wrapper">
    <h1>Existing Schedules</h1>
    <TableComponent handleClickInRow={setScheduleShow}></TableComponent>
    <h1>Schedules</h1>
      <form onSubmit={handleSubmit}>
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
                  <Input type="checkbox" onChange={e => setActive(e.target.value)} value={activation}/>
              </div>
            </div>
            <div>
                <Button variant="contained" type="submit">Submit</Button>
            </div>
      </form>
  </div>);
}