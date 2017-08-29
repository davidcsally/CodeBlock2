const User = require('../model/UserModel');

const UserController = {
  createUser(request, response, next) {
    // console.log('creating user: ', request.body);
    const newUser = new User({
      name: request.body.name,
      password: request.body.password,
      score: request.body.score,
      WPM: request.body.WPM,
      accuracy: request.body.accuracy,
    });

    newUser.save((err, data) => {
      if (err) throw err;

      response.locals = data;
      next();
    });
  },

  /** This is solid */
  getUser(request, response, next) {
    // console.log('req.body', request.body);
    // console.log('name: ', request.body.name);
    User.findOne({ name: request.body.name }, (err, data) => {
      // console.log(data);
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

    User.findOneAndUpdate({ name: request.body.name }, newData, (err, data) => {
      if (err) throw err;

      // this will send back the old data, not the new data
      response.send(data);
      response.locals = data;
      next();
    });
  },
};

module.exports = UserController;
