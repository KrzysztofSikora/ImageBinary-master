/**
 * Created by krzysztof on 04.06.16.
 */
var app = angular.module('app', ['ngRoute', "ngResource"]);

app.config(["$routeProvider", function ($routeProvider) {
    "use strict";
    $routeProvider
        .when("/", {
            templateUrl: "/partials/image_form.html",
            controller: "TestController"
        })

        .when("/test/:zmienna", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })


        .when("/disp/", {
            templateUrl: "/partials/disp.html",
            controller: "TestController"
        })
        .when("/img", {
            templateUrl: "/partials/image_form.html",

        })
        .otherwise({
            redirectTo: "/"
        });
}]);


app.controller("TestController", ["$scope", "$resource", "$routeParams", "$http",
    function ($scope, $resource, $routeParams, $http) {

        // $scope.testFunction = function () {
            $http.get('/show/2.jpg').success(function (post) {


                console.log('data:'+ post.mime +';base64,' + post.fileData)
                $scope.image = 'data:'+ post.mime +';base64,' + post.fileData


            });
        // }


    }]);

