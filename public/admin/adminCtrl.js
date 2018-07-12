app.controller('adminCtrl',function($scope,$http,$location){
  $scope.title = "Admin";

  get_products();

  $scope.add_product = function(){
    let product_data = {
      name:$scope.name,
      price:$scope.price
    }

    $http.post('/add_product',product_data).then(function(response){
      console.log(response.data);
      get_products();
    })
  }
  $scope.product_details = function(id){
    $location.path('admin/product/'+id);
  }
  $scope.delete_product = function(id){
    console.log(id);

    $http.delete('/get_products').then(function(response){
      get_products();
    })
  }

  function get_products(){
    $http.get('/get_products').then(function(response){
      $scope.products = response.data.products;
      console.log($scope.products);
    })
  }
})
