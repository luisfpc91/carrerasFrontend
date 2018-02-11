'use strict';

angular.module('myApp.sidebar', ['ngRoute'])

    .controller('sidebarCtrl', [, function(){
    }])
    .directive('sideBar', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: function(elem,attr){
                console.log(attr.showSession);
                if(attr.showSession)
                    return 'views/sidebar/sidebar.html';
            },
            controller: 'sidebarCtrl'
        };
    });