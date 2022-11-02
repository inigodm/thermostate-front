export default async function getAllSchedules(token) {
  return fetch('http://localhost:8080/schedules', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
   }

export async function newSchedule(schedule, token) {
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
