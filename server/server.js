const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();


const db = mongoose.connection.openUri('mongodb://user:password@ds163053.mlab.com:63053/codeblock');
db.on('error', console.error.bind(console, 'ERROR connecting to database'));
db.once('open', () => {
  console.log('Sucessfully connected to database');
});

// TODO
  // connect to DB
  // allow CORs?

app.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieParser(),
  express.static('./'),
);


// ROUTERS
app.get('/', (req, res, next) => {
  res.render('index.html');
  res.end();
});

// SERVER RUNNING
app.listen(3000, () => {
  console.log(`CodeBlock is listening at: ${PORT}`);
});
