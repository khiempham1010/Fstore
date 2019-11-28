const User=require('../models/usermodel');
module.exports={
    index:function(req,res,next){
        User.find({})
            .then(users=>{
                console.log(users);
                res.status(200).json(users)
            })
            .catch(err=>{
                next(err);
            })
    },
    add:(req,res,next)=>{
        const newUser =new User(req.body);
        newUser.save()
            .then(user=>{
                console.log(user);
                res.json({ message: 'User created!' });
            })
            .catch(err=>{
                if (err) {
                    // duplicate entry 
                    if (err.code == 11000)
                        return res.json({
                            success: false, 
                            message: 'A user with that username already exists.'
                        }); else return res.send(err);
                }
                next(err);
            })
    },
    update:(req,res,next)=>{
        User.findById(req.params.user_id, function (err, user) {
            if (err) return res.send(err);
            // set the new user information if it exists in the request 
            if (req.body.name) user.name = req.body.name;
            if (req.body.image) user.img = req.body.img;
            if (req.body.phone) user.phone = req.body.phone;
            if (req.body.email) user.email = req.body.email;
            if (req.body.address) user.address = req.body.address;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;
            if (req.body.role) user.role = req.body.role;
            // save the user
            user.save(function (err) {
                if (err) return res.send(err);
                // return a message
                res.json({ message: 'User updated!' });
            });
        })
    },
    getuser:(req,res,next)=>{
        User.findById(req.params.user_id)
            .then(user=>{
                res.json(user);
            })
            .catch(err=>{
                next(err);
            })
    },
    delete:(req,res,next)=>{
        User.remove({
            _id: req.params.user_id
        })
            .then(res.json({ message: 'Successfully deleted' }))
            .catch(err=>{
                next(err);
            })
    }
};