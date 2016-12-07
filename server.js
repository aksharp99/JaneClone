//include http, fs and url module
var express = require('express'),
    cors = require('cors'),
    massive = require('massive'),
    bodyParser = require('body-parser');

var app = module.exports = express();



app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));

//MASSIVE//
var massiveUrl = 'postgres://localhost/cart';
var massiveServer = massive.connectSync({
  connectionString: massiveUrl
});

app.set('db', massiveServer);
var db = app.get('db');

//ENDPOINTS//

var productCtrl = require('./controller/productCtrl');

app.get('/api/products', productCtrl.getAllProducts);
app.get('/api/products/:id', productCtrl.getProductById);
app.get('/api/listmyproducts/:id', productCtrl.getMyProducts);
app.post('/api/orders', productCtrl.addOrder);
app.post('/api/productsinorder', productCtrl.addToProductsInOrder);
app.post('/api/checkoutcomplete', productCtrl.checkoutComplete);
//POST AND GET USER
app.post('/api/user', function(req, res, next) {
  db.user_create([req.body.name, req.body.email],function(err, user) {
    if(err) {
      return res.status(500).send(err);
    }
    db.order_create([user[0].id,false],function(err,order) {
      if(err) {
        return res.status(500).send(err);
      }
      db.products_in_order_create([order[0].id,req.body.productid,req.body.quantity],function(err,productsinorder) {
        if(err) {
          return res.status(500).send(err);
        }

      })
        res.status(200).send('user and order created successfully');
    })
  })
})



app.get('/api/users', function (req, res, next) {
  db.users(function(err, users) {
    if(err) {
      res.status(500).send(err);
    }
    res.status(200).send(users);

  })
});
//POST AND GET ORDER
app.get('/api/orders', function(req, res, next) {
  db.orders(function(err, orders) {
    if(err) {
      res.status(500).send(err);
    }
    res.status(200).send(orders);
  })
})

app.post('/api/test', function(req, res, next) {
  db.test([], function(err,test) {

  })
})

app.listen(process.env.PORT || 3333, function () {
   console.log(`listening on port ${this.address().port}`);
 })
