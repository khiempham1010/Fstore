const router = require('express').Router();
const passport = require('passport');


// auth with google+
router.get('/login/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/login/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('http://localhost:4200/');
});

// auth with facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user);
    res.redirect('http://localhost:4200/');
});


module.exports = router;