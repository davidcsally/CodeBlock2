const User = require('../model/UserModel');

const UserController = {
  /** this is good */
  createUser(request, res, next) {
    const newUser = new User({
      name: request.body.name,
      password: request.body.password,
      score: request.body.score,
      WPM: request.body.WPM,
      accuracy: request.body.accuracy,
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
  getUser(request, response, next) {
    User.findOne({ name: request.body.name }, (err, data) => {
      if (err) return console.log(err);

      // check if password matches
        // TODO BCrypt
      if (request.body.password === data.password) {
        response.locals = data;
        response.status(200);
        next();
      } else response.status(400).json('INCORRECT PASSWORD!');
    });
  },

  getTopUsers(request, response, next) {
    User.find({}, (err, data) => {
      if (err) throw err;
      response.locals = data;
      next();
         response.send(data);
    }).limit(10).sort({ score: -1 });
  },

  updateUser(request, response, next) {
    const newData = {
      score: request.body.score,
      WPM: request.body.WPM,
      accuracy: request.body.accuracy,
    };

    User.findOneAndUpdate(
      { name: request.body.name },
      { $set: newData },
      { new: true },
      (err, data) => {
        if (err) throw err;
        // this will send back the old data, not the new data
        response.locals = data;
        next();
    });
  },
};

module.exports = UserController;
