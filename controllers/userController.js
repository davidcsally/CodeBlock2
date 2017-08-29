const User = require('../model/UserModel');

const UserController = {
  /** this is good */
  createUser(req, res, next) {
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
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
  },

  /** This is solid */
  getUser(req, res, next) {
    User.findOne({ name: req.body.name }, (err, data) => {
      if (err) return console.log(err);

      // check if password matches
        // TODO BCrypt
      if (req.body.password === data.password) {
        res.locals = data;
        res.status(200);
        next();
      } else res.status(400).json('INCORRECT PASSWORD!');
    });
  },

  getTopUsers(req, res, next) {
    User.find({}, (err, data) => {
      if (err) throw err;
      res.locals = data;
      next();
      // res.send(data);
    }).limit(10).sort({ score: -1 });
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
