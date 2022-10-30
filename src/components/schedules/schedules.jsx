import React, {useState} from "react";

async function newSchedule(schedule) {
    return fetch('http://localhost:8080/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

export function ManageSchedule() {
    const handleSubmit = async e => {
        e.preventDefauxlt();
    }
      
    return (<div className="login-wrapper">
    <h1>Please Log In</h1>
      <form  onSubmit={handleSubmit}>
      </form>
  </div>);
}

