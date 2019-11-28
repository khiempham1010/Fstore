const Product=require('../models/productmodel');
module.exports={
    index:function(req,res,next){
        Product.find({})
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(err=>{
                next(err);
            })
    },
    add:(req,res,next)=>{
        
        const newProduct = new Product(req.body);
        newProduct.save()
            .then(product=>{
                res.json({ message: 'Product created!' });
            })
            .catch(err=>{
                next(err);
            })
    },
    update:(req,res,next)=>{
        Product.findById(req.params.product_id, function (err, product) {
            console.log(req.body);
            if (err) return res.send(err);
            // set the new product information if it exists in the request 
            if (req.body.name) product.name = req.body.name;
            if (req.body.image) product.image = req.body.image;
            if (req.body.categoryId) product.categoryId = req.body.categoryId;
            if (req.body.description) product.description = req.body.description;
            if (req.body.price) product.price = req.body.price;
            if (req.body.quantity) product.quantity = req.body.quantity;
            if (req.body.status) product.status = req.body.status;
            // save the product
            product.save(function (err) {
                if (err) return res.send(err);
                // return a message
                res.json({ message: 'Product updated!' });
            });
        })
    },
    getproduct:(req,res,next)=>{
        Product.findById(req.params.product_id)
            .then(product=>{
                res.json(product);
            })
            .catch(err=>{
                next(err);
            })
    },
    delete:(req,res,next)=>{
        Product.remove({
            _id: req.params.product_id
        })
            .then(res.json({ message: 'Successfully deleted' }))
            .catch(err=>{
                next(err);
            })
    }
};