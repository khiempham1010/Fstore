//import dependencies
const express=require('express');
const router=express.Router();

const productController=require('../controllers/productcontroller');
const adminController=require('../controllers/admincontroller');
const auth=require('./auth');

//content
//localhost:8080/product/
router.route('/')
    .get(productController.index)
    .post(productController.add);
router.route('/:product_id')
    .get(productController.getproduct)
    .put(productController.update)
    .delete(productController.delete)
//export module
module.exports=router;