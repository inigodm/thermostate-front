export async function getAllSchedules(token) {
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
   }


export async function updateSchedule(schedule, token) {
  return fetch('http://localhost:8080/schedule', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(schedule)
  })
 }

 export async function deleteSchedule(id, token) {
  return fetch('http://localhost:8080/schedule/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  })
 }
 