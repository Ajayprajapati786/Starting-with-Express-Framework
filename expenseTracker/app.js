const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('expense', 'root', 'Sani@123', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  date: {
    type: Sequelize.DATE // change to date type
  },
  expense: {
    type: Sequelize.TEXT // change to text type
  }
  
});


sequelize.sync()
  .then(() => {
    console.log('D');
  })
  .catch((err) => {
    console.log('Error creating database and tables: ', err);
  });

  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
      .then(() => {
        res.send('User deletedd');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error deleting userrrrrrr');
      });
  });
  


  app.get('/users', (req, res) => {
    User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error getting users');
      });
  });
  
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { expense, date } = req.body;
    User.update(
      { expense: expense, date: date },
      { where: { id: id } }
    )
      .then(() => {
        res.send('User updated');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error updating user');
      });
  });
  
  

app.post('/users', (req, res) => {
const { date, expense } = req.body;
console.log("-----------------------");
console.log(date);
console.log(expense);
  User.create({
    date: date,
    expense: expense
  })
    .then(() => {
      res.send('User created');
    })
    .catch((err) => {
      res.send('Error creating user: ', err);
    });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});


