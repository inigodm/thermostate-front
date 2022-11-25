export async function increment(token) {
    return fetch('http://localhost:8080/temperature/increment', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({temperature:100})
      })
      .then(data => data.json())
    }
  
    export async function decrement(token) {
        return fetch('http://localhost:8080/temperature/decrement', {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(100)
          })
          .then(data => data.json())
        }