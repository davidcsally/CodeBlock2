/* eslint no-underscore-dangle: 0 */
const Session = require('../model/sessionModel');
const User = require('../model/UserModel');

const sessionController = {
  isLoggedIn(request, response, next) {
    Session.find({ cookieId: response.locals._id }, (err) => {
      if (err) throw err;
      next();
    });
  },

  startSession(request, response, next) {
    User.findOne({ name: response.locals.name }, (err, data) => {
      const newSession = new Session({ cookieId: data._id });
      newSession.save((error) => {
        if (error) return error;
        return next();
      });
    });
  },
};

module.exports = sessionController;
