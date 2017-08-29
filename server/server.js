const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const UserController = require('../controllers/UserController');

mongoose.Promise = global.Promise;
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

app.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser(),
  (req, res, next) => { // allow CORs
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
  },
  express.static('./'),
);


// ROUTERS

/** Create User */
app.post('/create', UserController.createUser, (req, res) => {
  res.send(res.locals);
});

/** Log in */
app.post('/login', UserController.getUser, (req, res) => {
  res.send(res.locals);
});

/** Update User */
app.patch('/updateUser', UserController.updateUser, (req, res) => {
  res.send(res.locals);
});

/** Get highscores */
app.get('/highscores', UserController.getTopUsers, (req, res) => {
  // console.log('sending highscores');
  // console.log(res.locals);
  res.send(res.locals);
});

/** Serve Index */
app.get('/', (req, res) => {
  res.render('index.html');
  res.end();
});


// SERVER RUNNING
app.listen(3000, () => {
  console.log(`CodeBlock is listening at: ${PORT}`);
});
