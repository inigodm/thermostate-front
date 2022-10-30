import React, {useState} from "react";
import useToken from "../customHooks/useToken";


async function newSchedule(schedule, token) {
    return fetch('http://localhost:8080/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(schedule)
    })
      .then(data => data.json())
   }
   
async function updateSchedule(schedule) {
    return fetch('http://localhost:8080/schedules', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schedule)
    })
      .then(data => data.json())
   }



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
    <h1>Schedules</h1>
      <form  onSubmit={handleSubmit}>
            <label>
                <p>From date</p>
                <input type="date" onChange={e => setDateFrom(e.target.value)}/>
            </label>
            <label>
                <p>To date</p>
                <input type="date" onChange={e => setDateTo(e.target.value)}/>
            </label>
            <label>
                <p>From time</p>
                <input type="time" onChange={e => setTimeFrom(e.target.value)}/>
            </label>
            <label>
                <p>To time</p>
                <input type="time" onChange={e => setTimeTo(e.target.value)}/>
            </label>
            <label>
                <p>Min temp</p>
                <input type="number" onChange={e => setMinTemp(e.target.value)}/>
            </label>
            <label>
                <p>Active</p>
                <input type="checkbox" onChange={e => setActive(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
      </form>
  </div>);
}