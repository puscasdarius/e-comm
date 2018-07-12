let app = angular.module('App',['ngRoute']);


app.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/log_in',{
      templateUrl:'log_in/log_in.html',
      controller:'logInCtrl'
    })
    .when('/register',{
      templateUrl:'register/register.html',
      controller:'registerCtrl'
    })
    .when('/view',{
      templateUrl:'view/view.html',
      controller:'viewCtrl'
    })
    .when('/user/:id',{
      templateUrl:'user/user.html',
      controller:'userCtrl'
    })
    .when('/admin',{
      templateUrl:'admin/admin.html',
      controller:'adminCtrl'
    })
    .when('/admin/product/:id',{
      templateUrl:'product/product.html',
      controller:'productCtrl'
    })
    .otherwise({redirectTo:'/log_in'})

})

app.controller('indexCtrl',function($scope,$http){

})
