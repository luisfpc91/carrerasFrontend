'use strict';

angular.module('myApp.navbar', ['ngRoute'])

    .controller('navbarCtrl', [,function(){
            //
    }])
    .directive('navBar', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: function(elem,attr){
                console.log(attr.showSession);
                if(attr.showSession)
                    return 'views/navbar/navbar.html';
            },
            controller: 'navbarCtrl'
        };
    });