//import dependencies
const express=require('express');
const router=express.Router();

const categoryController=require('../controllers/categorycontroller');
const adminController=require('../controllers/admincontroller');
const auth=require('./auth');

//content
//localhost:8080/category/
router.route('/')
    .get(categoryController.index)
    .post(auth.required, adminController.roleAuthorization(['creator','editor']), categoryController.add);
router.route('/:category_id')
    .get(categoryController.getcategory)
    .put(auth.required, adminController.roleAuthorization(['creator','editor']), categoryController.update)
    .delete(auth.required, adminController.roleAuthorization(['creator','editor']), categoryController.delete)
//export module
module.exports=router;