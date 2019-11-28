//defind dependences
const express = require('express');
const bodyparser = require('body-parser');
const logger=require('morgan');
const mongoose=require('mongoose');
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./app/config/passport-setup');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



//content
const app=express();

//configure our app to handle cors requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

//import fire routes config
const user=require('./app/routes/userroute');
const product=require('./app/routes/productroute');
const category=require('./app/routes/categoryroute');
const order=require('./app/routes/orderroute');
const admin=require('./app/routes/adminroute');
const login=require('./app/routes/loginroute');
const profile=require('./app/routes/profileroute');


//Connect to DB
mongoose.connect('mongodb://localhost:27017/meanFStore',{ useNewUrlParser: true });


//middlewares
//set up morgan
app.use(logger('dev'));

//setup body parser
app.use(bodyparser.urlencoded({exended:false}));
app.use(bodyparser.json());

const SECRET = 'VERY_SECRET_KEY!';
const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
  };

  passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
    const expirationDate = new Date(jwtPayload.exp * 1000);
    if(expirationDate < new Date()) {
      return done(null, false);
    }
    done(null, jwtPayload);
  }))

app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.username)
  });
// app.use(session({ secret: 'passport-fstore', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//routes
app.use('/user',user);
app.use('/product',product);
app.use('/category',category);
app.use('/order',order);
app.use('/admin',admin);
app.use('',login);
app.use('/profile',profile);

//catch 404 error
app.use((req,res,next)=>{
    const err = new Error('not found!');
    err.status=404;
    next(err)
})

//catch 500 error
app.use((req,res,next)=>{
    const err = app.get('env')==='development'?err:{};
    const status=err.status||500;
    //respond to client
    res.status(status).json({
        error:{
            mesage:err.mesage
        }
    });
})



//module exports
module.exports=app;