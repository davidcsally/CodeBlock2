const expect = require('expect');
const mongoose = require('mongoose');
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

        const obj = { name: 'William', score: 9, password: 1234 };
        const options = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(obj),
        };

        request('http://localhost:3000/create', options, (err, res, body) => {
          done();
        });
      }
    });
  });
});

describe('Database interactions', () => {
  it('saves a new user to the database  with a status code 200', (done) => {
    const obj = { name: 'Dave', score: 900, password: 1234 };
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

  it('does not save empty users to the database', (done) => {

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({}),
    };

    request('http://localhost:3000/create', options, (err, res, body) => {
      expect(res.statusCode).toEqual(400);
      done();
    });
  });

  it('does not allow empty strings in username or password', (done) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name: '', password: '' }),
    };

    request('http://localhost:3000/create', options, (err, res, body) => {
      expect(res.statusCode).toEqual(400);
      done();
    });
  });

  it('does add not duplicate users to the database', (done) => {
    const obj = { name: 'Dave', score: 900, password: 1234 };
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

  it('should return the top 10 high scores', (done) => {

    // write hella users to DB
    const arr = [];
    
    for (let i = 0; i < 15; i++) {
      const newObj = { name: `David${i}`, score: (i * 10), password: 1234 };
      arr.push(newObj);
    }

    Model.create(arr, (err, docs) => {
      if (err) throw(err);
      // then test DB
      request.get('http://localhost:3000/highscores', (err, res, body) => {
        const bod = JSON.parse(body);

        expect(bod.length).toEqual(10);
        expect(bod[0].score).toBeGreaterThan(bod[9].score);
        done();
      });
    });
  });
});
