angular.module('myapp').controller('mainCtrl', function($scope, productService) {
  $scope.getAllImages = function() {
    productService.getImages().then(function(response) {


      $scope.images = response.data;


  })
}


  $scope.getAllImages();
  });
