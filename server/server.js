const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const UserController = require('../controllers/UserController');

const PORT = 3000;
const app = express();

// Connect to MongooseDB
const db = mongoose.connection.openUri('mongodb://user:password@ds163053.mlab.com:63053/codeblock');

db.on('error', () => {
  console.log('ERROR connecting to database');
});
db.once('open', () => {
  console.log('Sucessfully connected to database');
});

// TODO
  // allow CORs?

app.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser(),
  express.static('./'),
);

// ROUTERS

/** Create User */
app.post('/create', UserController.createUser);

/** Log in */
app.post('/login', UserController.getUser);

/** Update User */
app.patch('/updateUser', UserController.updateUser);

/** Get highscores */
app.get('/highscores', UserController.getTopUsers);

/** Serve Index */
app.get('/', (req, res) => {
  res.render('index.html');
  res.end();
});


// SERVER RUNNING
app.listen(3000, () => {
  console.log(`CodeBlock is listening at: ${PORT}`);
});
