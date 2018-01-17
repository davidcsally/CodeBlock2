const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

mongoose.Promise = global.Promise; // re-assign mongoose promises to ES6 to remove depricated message

const PORT = 3000;
const app = express();
let uri;

// Select between TEST and REAL databases
if (process.env.NODE_ENV === 'test') {
  uri = 'mongodb://localhost/user';
} else {
  uri = 'mongodb://user:password@ds163053.mlab.com:63053/codeblock';
}

// Connect to MongooseDB
const db = mongoose.connection.openUri(uri);
db.on('error', () => {
  console.log('ERROR connecting to database');
});
db.once('open', () => {
  console.log(`Sucessfully connected to database ${uri}`);
});

// Use middleware
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

// ROUTES

/** Create User
 *
 * This route will create a new user in the DB
 *
 * Expects: res.body to be {name: string, password: string}
 * Returns: New user data
 *
*/
app.post('/create', userController.createUser, (req, res) => {
  res.send(res.locals);
});

/** Log in
 *
 * Verify login credentials against database
 *
 * Expects: res.body to be { name: string, password: string }
 * Returns: User data
 *
*/
app.post('/login', userController.getUser, cookieController.setSSIDCookie, sessionController.startSession, sessionController.isLoggedIn, (req, res) => {
  res.send(res.locals);
});

/** Update User
 *
 * Update's a user's information
 *
 * Expects: res.body to be: { name: string, score: int, wpm: int, accuracy: int }
 * Returns: Updated user information
 *
*/
app.patch('/updateUser', userController.updateUser, sessionController.isLoggedIn, (req, res) => {
  res.send(res.locals);
});

/** Get highscores
 *
 * Gets a list of the 10 highest scores, sorted from high to low
 *
 * Expects: just a get request
 * Returns: Array of user data, sorted by score
 *
*/
app.get('/highscores', userController.getTopUsers, sessionController.isLoggedIn, (req, res) => {
  res.send(res.locals);
});

/** Serve Index
 *
 * Default route, will serve the App
 *
*/
app.get('/', (req, res) => {
  // res.render('index.html');
  // res.end();
});

/** Start the server */
app.listen(3000, () => {
  console.log(`CodeBlock is listening at: ${PORT}`);
});
