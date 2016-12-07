angular.module('myapp').service('productService', function($http,localStorageService) {

  this.getImages = function() {
    return $http({
      method:'GET',
      url:'/api/products'
    }).then(function(response) {
      return response;
      console.log('this is the service response: ',response);
      console.log('this is the service response data: ',response.data);
    })
  }

  this.getProductById = function(id){
    return $http({
      method:'GET',
      url:'/api/products/' + id
    }).then(function(response) {

      return response.data; // This is the single product for this page.

    })
  }

  this.getCheckoutData = function(id) {
    return $http({
      method:'GET',
      url:'/api/listmyproducts/' + id
    }).then(function(response) {
      return response.data;
    })
  }

  this.orderid = localStorageService.get("id");
  var self = this;

  this.createOrder = function() {
    return $http({
      method:'POST',
      url:'/api/orders'
    }).then(function(res) {
      self.orderid=res.data[0].id;
      localStorageService.store("id",self.orderid);
      return self.orderid;
    })
  }

  this.addToProductsInOrder = function(id, productid,price) {
    return $http({
      method:'POST',
      url:'/api/productsinorder',
      data: {
        id: id,
        productid: productid,
        price: price
      }
    })
  }

  this.getMyProducts = function(id) {
    return $http({
      method:'GET',
      url:'/api/listmyproducts',
      data: {
        id: id
      }
    })
  }

  this.checkout = function(id) {
    return $http({
      method:'POST',
      url:'/api/checkoutcomplete',
      data: {
        id: id
      }
    }).then(function(response) {
      self.orderid = null;
      localStorageService.store("id",null);
    })
  }

})
