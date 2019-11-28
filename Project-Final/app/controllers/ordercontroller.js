const Order=require('../models/ordermodel');
module.exports={
    index:function(req,res,next){
        Order.find({})
            .then(orders=>{
                res.status(200).json(orders)
            })
            .catch(err=>{
                next(err);
            })
    },
    add:(req,res,next)=>{
        const newOrder =new Order(req.body);
        newOrder.save()
            .then(order=>{
                res.json({ message: 'Order created!' });
            })
            .catch(err=>{
                next(err);
            })
    },
    update:(req,res,next)=>{
        Order.findById(req.params.order_id, function (err, order) {
            if (err) return res.send(err);
            // set the new order information if it exists in the request 
            if (req.body.name) order.name = req.body.name;
            if (req.body.phone) order.phone = req.body.phone;
            if (req.body.message) order.message = req.body.message;
            if (req.body.cart) order.cart = req.body.cart;
            if (req.body.status) order.status = req.body.status;
            if (req.body.price) order.price = req.body.price;
            // save the order
            order.save(function (err) {
                if (err) return res.send(err);
                // return a message
                res.json({ message: 'Order updated!' });
            });
        })
    },
    getorder:(req,res,next)=>{
        Order.findById(req.params.order_id)
            .then(order=>{
                res.json(order);
            })
            .catch(err=>{
                next(err);
            })
    },
    delete:(req,res,next)=>{
        Order.remove({
            _id: req.params.order_id
        })
            .then(res.json({ message: 'Successfully deleted' }))
            .catch(err=>{
                next(err);
            })
    }
};