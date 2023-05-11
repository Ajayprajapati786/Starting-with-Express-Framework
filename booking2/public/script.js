const form = document.querySelector('#user-form');
const dataa = document.querySelector('#dataa');

axios.get('http://localhost:5000/users')
  .then(response => {
    dataa.innerHTML = `
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        ${response.data.map(user => `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
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
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  axios.post('http://localhost:5000/users', { name, email }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      alert('User created');
      form.reset();
    })
    .catch(err => {
      alert('Error creating user: ' + err.message);
    });
});

// function


function deleteUser(event, id) {
  event.stopPropagation();
  
  axios.delete(`http://localhost:5000/users/${id}`)
    .then(() => {
      console.log(id);
      console.log("tttttttttttttttttttttttttttttttttttttt");
      const row = document.querySelector(`#user-${id}`);
      if (row) {
        row.remove();
      }
    })
    .catch(err => {
      alert('Error deleting user: ' + err.message);
    });
}


function editUser(event, id) {
  event.stopPropagation();

  const newName = prompt('Enter new name:');
  const newEmail = prompt('Enter new email:');

  axios.put(`http://localhost:5000/users/${id}`, { name: newName, email: newEmail }, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      console.log("User updated");
      const row = document.querySelector(`#user-${id}`);
      if (row) {
        row.querySelector('td:nth-child(2)').textContent = newName;
        row.querySelector('td:nth-child(3)').textContent = newEmail;
      }
    })
    .catch(err => {
      alert('Error updating user: ' + err.message);
    });
}
