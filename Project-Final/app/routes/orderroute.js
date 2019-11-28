//import dependencies
const express=require('express');
const router=express.Router();

const orderController=require('../controllers/ordercontroller');

//content
//localhost:8080/product/
router.route('/')
    .get(orderController.index)
    .post(orderController.add);
router.route('/:order_id')
    .get(orderController.getorder)
    .put(orderController.update)
    .delete(orderController.delete)
//export module
module.exports=router;