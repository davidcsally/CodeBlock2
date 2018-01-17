const Session = require('../model/sessionModel');
const User = require('../model/UserModel');

const sessionController = {
  isLoggedIn(request, response, next) {
    Session.find({ cookieId: response.locals._id }, (err, data) => {
      if (err) throw err;
      next()
    })
  },

  startSession(request, response, next) {
    User.findOne({ name: response.locals.name }, (err, data) => {
      let newSession = new Session({ cookieId: data._id })
      newSession.save(function (err, data) {
        next();
      })
    })
  },
}

module.exports = sessionController;