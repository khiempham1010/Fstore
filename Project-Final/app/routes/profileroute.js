const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/login/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.json( "user: req.user" );
    // res.redirect('http://localhost:4200/');
});

module.exports = router;
