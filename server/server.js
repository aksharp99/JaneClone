//include http, fs and url module
var http = require('http'),
    express = require('express'),
    cors = require('cors'),
    massive = require('massive'),
    bodyParser = require('body-parser'),
    pictureCtrl = require('./controller/pictureCtrl'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    imageDir = './public/images/deals/';

var app = module.exports = express();



app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../public'));

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
        // db.product_create([productsinorder[0].productid,req.body.description],function(err,products) {
        //   console.log('products',products);
        //   if(err) {
        //     return res.status(500).send(err);
        //   }
        // })
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
//Ignore BELOW




//Ignore BELOW

app.get("/photos", function(req, res) {
  //use the url to parse the requested url and get the image name

  var query = url.parse(req.url,true).query;
  pic = query.image;

  if(typeof pic === 'undefined') {
    getImages(imageDir, function(err, files) {
      var imageList = JSON.stringify(files);
      res.writeHead(200, {'Content-type':'application/json'});
      res.end(imageList);
    });
  } else {
    //read the image using fs and send the image content back in the response
    fs.readFile(imageDir + pic, function(err, content) {
      if(err) {
        res.writeHead(400, {'Content-type':'text/html'})
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/jpg'});
        res.end(content,"binary");
      }
    });
  }
});

app.get('/api/pictures',pictureCtrl.get);
// console.log("Server running at http://localhost:3333/");

//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
  var fileType = '.jpg',
  files = [], i;
  fs.readdir(imageDir, function(err, list) {
    for(i=0; i<list.length; i++) {
      if(path.extname(list[i]) === fileType) {
        files.push(list[i]); //store the file name into the array files
      }
    }
    callback(err,files);
  });
}

app.listen(3333, function() {
    console.log("Listening on port 3333");
});
