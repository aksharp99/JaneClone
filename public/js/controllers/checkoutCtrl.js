angular.module('myapp').controller('checkoutCtrl', function($scope,productService) {
$scope.id = productService.orderid;
$scope.checkout = "This is the checkout page";
$scope.total = 0;
$scope.getMyProducts = function() {
  productService.getMyProducts(productService.orderid).then(function(response) {
    console.log('this is the get my products response: ',response);
  })
}

$scope.getCheckoutData = function() {
  productService.getCheckoutData(productService.orderid).then(function(response){
    console.log('this is my get checkout data response: ',response);
    $scope.allmyproducts = response;

    for(var i = 0; i<response.length; i++) {
      $scope.total = $scope.total + response[i].price;
      console.log('this is the scope total: ',$scope.total);
    }
  })
}

$scope.checkout = function() {
  productService.checkout($scope.id).then(function(response) {
    console.log('checkout response: ',response);
  })
}
$scope.getMyProducts();
$scope.getCheckoutData();
})
