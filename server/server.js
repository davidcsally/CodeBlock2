const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

const app = express();

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
  // const host = server.address().address;
  // const port = server.address().port;
  console.log(`CodeBlock is listening at: 3000`);
});
