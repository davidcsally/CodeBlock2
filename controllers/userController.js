const User = require('../model/UserModel');

const UserController = {
    createUser (request, response) {
        const newUser = new User({
            name: request.body.name,
            password: request.body.password,
            score: request.body.score,
            WPM: request.body.WPM,
            accuracy: request.body.accuracy,
        });

        newUser.save(function (err, data) {
            if(err) throw err;
            response.send(data);
        });
    },

    getUser(request, response) {
        console.log('req.body', request.body);
        console.log('name: ', request.body.name);
        User.findOne({ name: request.body.name }, (err, data) => {
            // if(err) throw err;
            // response.send(data)
            if (err) console.log(err);
            else {
                console.log('found!', data);
                response.json(data);
            }
        })
    },

    getTopUsers(request, response) {
        User.find({}, function(err, data) {
            if(err) throw err;
            response.send(data)
        }).limit(10).sort({ score: -1 })
    },

    updateUser(request, response) {

        const newData = {
            score: request.body.score,
            WPM: request.body.WPM,
            accuracy: request.body.accuracy,
        };

        User.findOneAndUpdate({name: request.body.name}, newData, function(err, data) {
            if(err) throw err;

            // this will send back the old data, not the new data
            response.send(data);
        });
    }
}

module.exports = UserController;
