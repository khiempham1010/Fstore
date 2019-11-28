//import dependencies
const express=require('express');
const router=express.Router();

const userController=require('../controllers/usercontroller');
const adminController=require('../controllers/admincontroller');
const auth=require('./auth');

//content
//localhost:8080/user/
router.route('/')
    
    //.get(auth.required, adminController.roleAuthorization(['reader','creator','editor']), userController.index)
    .get(userController.index)
    //.post(auth.optional, userController.add)
    .post( userController.add);
router.route('/:user_id')
    .get(auth.required, userController.getuser)
    .put(auth.required, userController.update)
    .delete(auth.required, userController.delete)
//export module
module.exports=router;