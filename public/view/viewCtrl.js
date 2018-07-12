app.controller('viewCtrl',function($scope,$http){
  $scope.title = "View Page";
  let products = [];
  let current_page = 0;

  init_list();

  $scope.add_product = function(id){

  }

  function init_list(){
    get_products().then(function(response){
      products = response;
      $scope.products = response[current_page];
    })
  }

  function get_products(){
    let i = 0;
    let j = 0;
    return $http.get('/get_products').then(function(response){
      let products_len = response.data.products.length;
      max_page = products_len/9;
      while(i < (products_len/9)){
        let product_array = [];
        for(let k = 0;k<9;k++){
          //this verification is used ti avoid duplicates in ng-repeat
          //directive
          if(response.data.products[j] != null){
            product_array[k] = response.data.products[j];
            j++;
          }else{
            break;
          }
        }
        products[i] = product_array;
        i++;
      }
      return products;
    })
  }

  $scope.prev_page = function(){
    if(current_page <= 0){
      $scope.products = products[0];
    }else{
      current_page--;
      $scope.products = products[current_page];
    }
  }

  $scope.next_page = function(){
    let max_page = products.length-1;
    if(current_page >= max_page){
      $scope.products = products[max_page];
    }else{
      current_page++;
      $scope.products = products[current_page];
    }
  }
});
