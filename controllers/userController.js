const User = require('../model/UserModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserController = {
  /** this is good */
  createUser(req, res, next) {
    // ** Input Validation

    if (!req.body.hasOwnProperty('name')) return res.status(400).json('Must enter a username!');
    else if (!req.body.hasOwnProperty('password')) return res.status(400).json('Must enter a password!');
    else if (req.body.name === '') return res.status(400).json('Must enter a username!');
    else if (req.body.password === '') return res.status(400).json('Must enter a password!');

    // ** Input Validation was successful
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(String(req.body.password), salt, (err2, hash) => {
        if (err2) console.log(`ERROR: ${err2}`);

        const newUser = new User({
          name: req.body.name,
          password: hash,
          score: req.body.score,
          WPM: req.body.WPM,
          accuracy: req.body.accuracy,
        });

        // don't add duplicates
        User.findOne({ name: newUser.name }, (err, data) => {
          if (err) throw err;
          if (data === null) {
            // save if user is new
            newUser.save((error, newDoc) => {
              if (error) throw error;

              res.locals = newDoc;
              next();
            });
          } else res.status(400).json('ERROR: Duplicate User');
        });
      });
    });
  },

  /** This is solid */
  getUser(req, res, next) {
    const find = { name: req.body.name };
    User.findOne(find, (err, data) => {
      if (err) return console.log(err);
      if (data === null) return res.status(400).json('invalid');

      // check if password matches
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (result) {
          res.locals = data;
          res.status(200);
          next();
        } else res.status(400).json('INCORRECT PASSWORD!');
      });
    });
  },

  /** this is working */
  getTopUsers(req, res, next) {
    User.find({}, (err, data) => {
      if (err) throw err;
      res.locals = data;
      next();
    })
    .limit(10)
    .sort({ score: -1 }); // this sorts in ascending and sends back 10
  },

  /** 👌🏻 Good shit */
  updateUser(req, res, next) {
    const newData = {
      score: req.body.score,
      WPM: req.body.WPM,
      accuracy: req.body.accuracy,
    };

    User.findOneAndUpdate(
      { name: req.body.name },
      { $set: newData },
      { new: true },  // this is REQUIRED to send back updated data
      (err, data) => {
        if (err) throw err;
        res.locals = data;
        next();
      });
  },
};

module.exports = UserController;
