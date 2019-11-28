//import dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const auth = require('../routes/auth');
const randtoken = require('rand-token');
const jwt = require('jsonwebtoken');

const adminController = require('../controllers/admincontroller');
const SECRET = 'VERY_SECRET_KEY!';
const refreshTokens = {};
const User=require('../models/usermodel');

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(adminController.deserializeUser);

//content
//localhost:8080/admin/
//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { username, password } = req.body;


  if (!req.body.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!req.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  if (!adminController.checklogin(username,password)) {
    const user = {
      'username': username,
      'role': 'admin'
    };

    const token = jwt.sign(user, SECRET, { expiresIn: 6000 })
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = username;
    res.json({ jwt: token, refreshToken: refreshToken });
  }
  else{
    Console.log('aaaa');
  }
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, adminController.getcurrent)

router.route('/logout')
  .post(function (req, res, next) {
    const refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
  });

router.post('/refresh', function (req, res) {
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const user = {
      'username': refreshTokens[refreshToken],
      'role': 'admin'
    }
    const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    res.json({ jwt: token })
  }
});

router.get('/random', passport.authenticate('jwt'), function (req, res) {
  res.json({ value: Math.floor(Math.random() * 100) });
})


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, adminController.checklogin));





//export module
module.exports = router;