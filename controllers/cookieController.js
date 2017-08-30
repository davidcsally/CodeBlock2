const User = require('../model/UserModel');

const cookieController = {

    setSSIDCookie(request, response, next) {
        // console.log(response.locals)
        User.findOne({ name: response.locals.name }, (err, user) => {
            response.cookie('ssid', user._id, { maxAge: 20000, httpOnly: true })

            next();
        })
    }

}

module.exports = cookieController;