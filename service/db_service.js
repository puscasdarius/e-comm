var User = require('../models/User.js');
var Product = require('../models/Product.js');

var bcrypt = require('bcryptjs');
let salt = 10;

let db_service = {
  register_user:function(req,res){
    User.findOne({email:req.body.email},function(err,result){
      console.log("here");
      if(err)throw err;
      if(result != null){
        //User is not registered
      }else{
        //Register user
        bcrypt.hash(req.body.password,salt,function(err,hash){
          if(err) throw err;
          req.body.password = hash;
          let new_user = new User(req.body);
          new_user.save(function(err){
            if(err)throw err;
          //  res.()
          })
        })
      }
    })

  },
  verify_user:function(req,res){
    if(req.body.email == "admin@admin" && req.body.password == "admin"){
      res.send({user_id:'admin'});
    }else{
      User.findOne({email:req.body.email},function(err,user){
        if(err) throw err;
        bcrypt.compare(req.body.password,user.password,function(err,result){
          if(err)throw err;
          if(result){
            res.send({user_id:user.id});
          }else{
            res.send({user_id:-1});
          }
        })
      })
    }
  },
  get_user_details:function(req,res){
    User.findOne({_id:req.body.user_id},function(err,user){
      if(err)throw err;
      if(user != null){
        res.send({user:user.email});
      }
    })
  },
  add_product:function(req,res){
    let new_product = new Product(req.body);
    new_product.save(function(err,product){
      if(err) throw err;
      res.send({product:product});
    })
  },
  update_product:function(req,res){
    let new_product = new Product(req.body[1].product_changes);
    Product.findOneAndUpdate({_id:req.body[0].product_id},new_product,function(err,product){
      console.log(product);
      res.send({new_product:product});
    })
  },
  get_products:function(req,res){
    Product.find(function(err,products){
      if(err) throw err;
      res.send({products:products});
    })
  },
  delete_product:function(req,res){
    console.log(req.params);
    console.log(req.body.product_id);
    Product.deleteOne({_id:req.body.product_id},function(err){
      if(err) throw err;

    })
  },
  get_product:function(req,res){
    Product.findOne({_id:req.body.product_id},function(err,product){
      if(err)throw err;
      console.log(product);
      res.send({product:product})
    })
  }
}


module.exports = db_service
