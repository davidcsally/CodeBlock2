const expect = require('expect');
const mongoose = require('mongoose');
// const sinon = require('sinon');
const request = require('request');

mongoose.Promise = global.Promise;

const Model = require('../model/UserModel.js');
const UserController = require('../controllers/UserController.js');

let db;

const server = require('./../server/server.js');

// Initially connect to DB
before((done) => {
  db = mongoose.connection.openUri('mongodb://localhost/user');
  db.on('error', () => {
    console.log('ERROR connecting');
  });

  db.once('open', () => {
    console.log('Connected to test DB\n\n');

    // THIS drops the database
    Model.remove({}, (err) => {
      if (err) console.log(`Error: ${err}`);
      else {
        UserController.createUser({ body: { name: 'William', password: 1234 } }, { locals: {} }, () => {
          console.log('created william\n\n');
          done();
        });
      }
    });
  });
});

describe('Creating new user', () => {
  it('saves a new user to the database  with a status code 200', (done) => {
    const obj = { name: 'Dave', score: 900 };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(obj),
    };

    request('http://localhost:3000/create', options, (err, res, body) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it('does add not duplicate users to the database', (done) => {
    const obj = { name: 'Dave', score: 900 };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(obj),
    };

    request('http://localhost:3000/create', options, (err, res, body) => {
      expect(res.statusCode).toEqual(400);
      done();
    });
  });

  it('sends back a 200 response code with successful login', (done) => {
    const obj = { name: 'William', password: '1234' };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(obj),
    };

    request('http://localhost:3000/login', options, (err, res, body) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it('sends back a 400 on invalid password', (done) => {
    const obj = { name: 'William', password: 'wrong' };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(obj),
    };

    request('http://localhost:3000/login', options, (err, res, body) => {
      expect(res.statusCode).toEqual(400);
      done();
    });
  });

  it('updates a user\'s highscore', (done) => {
    const obj = { name: 'Dave', score: 0, WPM: 50, accuracy: 100 };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(obj),
    };

    request('http://localhost:3000/updateUser', options, (err, res, body) => {
      const updated = JSON.parse(res.body);
      expect(obj.score).toEqual(updated.score);
      done();
    });
  });

  xit('should return the top 10 high scores', (done) => {
    // make 13 more entries
    const res = {};
    let flag = false;

    // let makePromise = () => {
    //   return new Promise(function (resolve, reject) {
    //     console.log('new promise');
    //     UserController.createUser(req)
    //   });
    // };

    for (let i = 0; i < 13; i += 1) {
      const req = { body: { name: `Dave${i}`, score: (i * 10), WPM: 50, accuracy: 100 } };

      makePromise()

      // UserController.createUser(req, res, () => {
      //   console.log('looping! i: ', i);
      // });
    }

    UserController.getTopUsers({}, res, () => {
      console.log('i run after we loop');
      // expect lenght === 10
      console.log(res.locals.length);
      // expect(res.locals.length === 10);
      // done();
    });
  });
});
