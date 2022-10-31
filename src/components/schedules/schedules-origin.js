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
