const form = document.querySelector('#user-form');
const dataa = document.querySelector('#dataa');

axios.get('http://localhost:5000/users')
  .then(response => {
    dataa.innerHTML = `
      <table style="border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid black;">ID</th>
          <th style="border: 1px solid black;">type of expense</th>
          <th style="border: 1px solid black;">date</th>
          <th style="border: 1px solid black;">Actions</th>
        </tr>
        ${response.data.map(user => `
          <tr>
            <td style="border: 1px solid black;">${user.id}</td>
            <td style="border: 1px solid black;">${user.expense}</td>
            <td style="border: 1px solid black;">${new Date(user.date).toLocaleDateString()}</td>
            <td style="border: 1px solid black;">
              <button onclick="deleteUser(event,${user.id})">Delete</button>
              <button onclick="editUser(event,${user.id})">Edit</button>
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  })
  .catch(err => {
    alert('Error fetching data: ' + err.message);
  });



form.addEventListener('submit', event => {
  event.preventDefault();
  console.log("function clicked")
  const date = document.querySelector('#date').value;
  const expense = document.querySelector('#expense').value;
  axios.post('http://localhost:5000/users', { date, expense }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      alert('Expense added');
      form.reset();
    })
    .catch(err => {
      alert('Error creating user: ' + err.message);
    });
});

function deleteUser(event, id) {
  event.stopPropagation();
  
  axios.delete(`http://localhost:5000/users/${id}`)
    .then(() => {
      console.log(id);
      console.log("tttttttttttttttttttttttttttttttttttttt");
      window.location.reload();

      // const row = document.querySelector(`#user-${id}`);
      // if (row) {
      //   row.remove();
      // }
    })
    .catch(err => {
      alert('Error deleting user: ' + err.message);
    });
}


function editUser(event, id) {
  event.stopPropagation();

  const newType = prompt('Enter new type of expense:');
  const newDate = prompt('Enter new date:');

  axios.put(`http://localhost:5000/users/${id}`, { expense: newType, date: newDate }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      console.log("User updated");
      window.location.reload();
      // const row = document.querySelector(`#user-${id}`);
      // if (row) {
      //   row.querySelector('td:nth-child(2)').textContent = newName;
      //   row.querySelector('td:nth-child(3)').textContent = newEmail;
      // }
    })
    .catch(err => {
      alert('Error updating user: ' + err.message);
    });
}
