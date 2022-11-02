import React, {useState} from "react";
import useToken from "../customHooks/useToken";
import Table from "./table";
import './schedules.css'
import { newSchedule } from "./schedules-origin";

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
      
    return (<div className="login-wrapper">
    <h1>Existing Schedules</h1>
    <Table></Table>
    <h1>Schedules</h1>
      <form onSubmit={handleSubmit}>
            <div className="twoDivsInline">
              <div>
                  <p>From date</p>
                  <input type="date" onChange={e => setDateFrom(e.target.value)}/>
              </div>
              <div>
                  <p>To date</p>
                  <input type="date" onChange={e => setDateTo(e.target.value)}/>
              </div>
            </div>
            <div className="twoDivsInline">
              <div>
                  <p>From time</p>
                  <input type="time" onChange={e => setTimeFrom(e.target.value)}/>
              </div>
              <div>
                  <p>To time</p>
                  <input type="time" onChange={e => setTimeTo(e.target.value)}/>
              </div>
            </div>
            <div className="twoDivsInline">
              <div>
                  <p>Min temp</p>
                  <input type="number" onChange={e => setMinTemp(e.target.value)}/>
              </div>
              <div>
                  <p>Active</p>
                  <input type="checkbox" onChange={e => setActive(e.target.value)}/>
              </div>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
      </form>
  </div>);
}