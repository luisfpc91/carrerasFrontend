'use strict';

angular.module('myApp.panel', ['ngRoute'])

    .controller('panelCtrl', ['$scope', 'globalF', 'ResourceCarreras', 'ResourceDetallesCarreras', 'ResourceEscuderias', 'ResourcePilotos',  
        function($scope, globalF, ResourceCarreras, ResourceDetallesCarreras, ResourceEscuderias, ResourcePilotos) {  
        	
            $scope.consultCarrera = function(){
                ResourceCarreras.get({
                    act: 'panel',
                    month: $scope.month,
                    year: $scope.year
                }, function (res) {
                    globalF.toastr_msj(res);
                    $scope.carreras = res.data;
                    $scope.promedio();
                });
            }

            $scope.promedio = function(){
                $scope.promedio_final = Math.round($scope.promedio);
                console.log($scope.promedio);
                console.log($scope.promedio_final);
                $('#barra').css('width', $scope.promedio_final + '%'); 
            }
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/panel', {
            templateUrl: 'views/panel/panel.html',
            controller: 'panelCtrl'
        });
    }]);