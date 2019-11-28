const User = require('../models/usermodel');

module.exports = {
    checklogin: function (username, password, done) {
        User.findOne({ username })
            .then((user) => {
                if (!user || !user.comparePassword(password)) {
                    return done(null, false, { errors: { 'username or password': 'is invalid' } });
                }
                return done(null, user);
            }).catch(done);
    },
    logout: function (req, res, next) {
        req.logout();
        res.redirect('/admin/login');
    },
    getcurrent: function (req, res, next) {
        const { payload: { id } } = req;

        return User.findById(id)
            .then((user) => {
                if (!user) {
                    return res.sendStatus(400);
                }

                return res.json({ user: user.toAuthJSON(), role: user.role });
            });
    },

    deserializeUser: function (id, done) {
        User.findById(id, function (err, username) {
            done(err, username);
        })
    },
    roleAuthorization: function (roles) {

        return function (req, res, next) {

            const { payload: { id } } = req;

            User.findById(id, function (err, foundUser) {

                if (err) {
                    res.status(422).json({ error: 'No user found.' });
                    return next(err);
                }

                if (roles.indexOf(foundUser.role) > -1) {
                    return next();
                }

                res.status(401).json({ error: 'You are not authorized to view this content' });
                return next('Unauthorized');

            })
            // return next();
        }
    }
}