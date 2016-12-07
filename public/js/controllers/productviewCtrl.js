angular.module('myapp').controller('productviewCtrl', function($scope, productService, $stateParams) {

console.log('this is $stateParams: ',$stateParams);
console.log('this is $stateParams.id: ',$stateParams.id);
  $scope.getOneImage = function() {
    productService.getProductById($stateParams.id).then(function(response) {
      $scope.product = response[0];
      //response[0] gives us description,id,image,name and price
      $scope.price = $scope.product.price;

    })
  }
  
  $scope.addToProductsInOrder = function() {
    productService.addToProductsInOrder($scope.id,$stateParams.id,$scope.price).then(function(response) {
      console.log('addtoproducts response: ',response);
    })
  }
  $scope.addToBag = function() {
    if(!productService.orderid) {
      productService.createOrder().then(function(response) {
        console.log('this is the addToBag response: ',response);
        $scope.id = response;
        $scope.addToProductsInOrder();
      });
    } else {
      $scope.id = productService.orderid
      $scope.addToProductsInOrder();
    }
    console.log('this is scope id: ',$scope.id);

  }




    $scope.getOneImage();





  });
