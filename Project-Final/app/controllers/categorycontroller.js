const Category=require('../models/categorymodel');
module.exports={
    index:function(req,res,next){
        Category.find({})
            .then(categorys=>{
                res.status(200).json(categorys)
            })
            .catch(err=>{
                next(err);
            })
    },
    add:(req,res,next)=>{
        const newCategory =new Category(req.body);
        newCategory.save()
            .then(category=>{
                res.json({ message: 'Category created!' });
            })
            .catch(err=>{
                next(err);
            })
    },
    update:(req,res,next)=>{
        Category.findById(req.params.category_id, function (err, category) {
            if (err) return res.send(err);
            // set the new category information if it exists in the request 
            if (req.body.name) category.name = req.body.name;
            // save the category
            category.save(function (err) {
                if (err) return res.send(err);
                // return a message
                res.json({ message: 'Category updated!' });
            });
        })
    },
    getcategory:(req,res,next)=>{
        Category.findById(req.params.category_id)
            .then(category=>{
                res.json(category);
            })
            .catch(err=>{
                next(err);
            })
    },
    delete:(req,res,next)=>{
        Category.remove({
            _id: req.params.category_id
        })
            .then(res.json({ message: 'Successfully deleted' }))
            .catch(err=>{
                next(err);
            })
    }
};