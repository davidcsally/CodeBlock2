const User = require('../model/UserModel');

const UserController = {
    createUser (request, response) {
        var newUser = new User({
            name: request.body.name,
            password: request.body.password,
            score: request.body.score,
            WPM: request.body.WPM,
            accuracy: request.body.accuracy,
        })

        createUser.save(function (err, data) {
            if(err) throw err;
            response.send(data)
        })

    },

    getUser(request, response) {
        User.findOne({name: request.body.name}, function(err, data) {
            if(err) throw err;
            response.send(data)
        })
    },

    getTopUsers(request, response) {
        User.find({}.limit(10).sort({ score: -1 }), function(err, data) {
            if(err) throw err;
            response.send(data)
        })
    },

    updateUser(request, response) {
        User.findOne({name: request.body.name}, function(err, data) {
            if(err) throw err;
            response.send(data)
        })
    }
}

module.exports = UserController;
