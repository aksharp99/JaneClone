var app = require('../server');
var db = app.get('db');


module.exports = {
  getAllProducts:function(req, res, next){

    db.get_all_products(function(err, products){
      if(err){
        console.log(err)
        return res.send(err);
      }
      res.send(products);
    })
  },
  getProductById:function(req, res, next){
    db.get_product_by_id([req.params.id],function(err, products){
      if(err){
        console.log(err)
        return res.send(err);
      }
      res.send(products);
    })
  },
  addOrder:function(req, res, next){
    db.post_orders(function(err,order) {
      // console.log('this is the error: ',err);
      res.send(order);
    })
  },
  addToProductsInOrder:function(req, res, next) {
    db.add_to_products_in_order([req.body.id,req.body.productid,req.body.price],function(err, productsinorder) {
      console.log('this is the error: ',err);
      res.send(productsinorder);
    })
  },
  checkoutComplete:function(req, res, next) {
    db.checkout_complete([req.body.id],function(err, checkout){
      console.log('this is the checkout error: ',err);
      res.send(checkout);
    })
  },
  getMyProducts:function(req, res, next) {
    console.log('this is req body id from get my products: ',req.params.id);
    db.get_my_products([req.params.id],function(err, myproducts){
      console.log('this is the my products error: ',err);
      res.send(myproducts);
    })
  }



}
