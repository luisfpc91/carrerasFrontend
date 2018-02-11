'use strict';

angular.module('myApp.detalles_carreras', ['ngRoute'])

    .controller('detalles_carrerasCtrl', ['$scope', 'globalF', 'ResourceDetallesCarreras', 'FileUploader', 'ResourceCarreras', 'ResourcePilotos',
    	function($scope, globalF, ResourceDetallesCarreras, FileUploader, ResourceCarreras, ResourcePilotos) {
        	$scope.newDetalles = {};
            $scope.editDetalles = {};
            $scope.response = {};
            $scope.carreras = {};
            $scope.pilotos = {};

            $scope.reset = function(){
                for(var item in uploader.queue){
                    var a = uploader.queue[item];
                    a.remove();
                }
            }

            $scope.get = function(){
                ResourceDetallesCarreras.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    $scope.response = res.data; 
                });
            }
            $scope.get();

            $scope.getCarrera = function(){
                ResourceCarreras.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    for(var i in res.data){
                    	var date = res.data[i];
                    	date.fec_carrera = new Date(date.fec_carrera);
                    }
                    $scope.carreras = res.data; 
                });
            }
            $scope.getCarrera();

            $scope.getPiloto = function(){
                ResourcePilotos.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    for(var i in res.data){
                    	var date = res.data[i];
                    	date.fec_nacimiento = new Date(date.fec_nacimiento);
                    }
                    $scope.pilotos = res.data; 
                });
            }
            $scope.getPiloto();

            $scope.post = function(){
            	$('#btn-create').prop('disabled',true);
                ResourceDetallesCarreras.add($scope.newDetalles,function(res){
                    if(res.status =='success'){
                        globalF.toastr_msj(res);                       
                        $scope.newDetalles = {};
                        $scope.get();
                        $scope.img = null;    

                        $('#btn-cancel-post').click(); 
                        $('#btn-create').prop('disabled',false);
                        $scope.reset();
                    }else{
                        globalF.toastr_msj(res);
                        $('#btn-create').prop('disabled',false);
                    }  
                });
            }

            $scope.edit = function(item){
                $scope.editDetalles = item; 
            }

            $scope.put = function(){
                $('#btn-edit').prop('disabled',true);

                ResourceDetallesCarreras.update($scope.editDetalles,function(res){
                    if(res.status=='success'){
                        globalF.toastr_msj(res);
                        $scope.get();
                        $scope.img = null;  

                        $('#btn-cancel-edit').click();
                        $('#btn-edit').prop('disabled',false);
                        $scope.reset();
                    }else{
                        globalF.toastr_msj(res);
                        $('#btn-edit').prop('disabled',false);
                    }                    
                });
            }

            $scope.trash = function(item){
                $scope.confirm = confirm("¿Desea Borrar a estos detalles '"+item.seq_carrera+" ?");                
                if($scope.confirm){
                    $('#btn-remove').prop('disabled',true);
                    $scope.delete(item);
                }else{
                    $('#btn-remove').prop('disabled',false);
                    return false;
                }
            }

            $scope.delete = function(item){        
                $scope.seq_carrera =  item.seq_carrera;  
                ResourceDetallesCarreras.delete({
                    seq_carrera: $scope.seq_carrera
                },function(res){
                    if(res.status=='success'){
                        globalF.toastr_msj(res);                      
                        $scope.get();    
                        $('#btn-cancel-edit').click();   
                    }else{
                        globalF.toastr_msj(res); 
                    } 
                });
            }
                  
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detalles_carreras', {
            templateUrl: 'views/detalles_carreras/detalles_carreras.html',
            controller: 'detalles_carrerasCtrl'
        });
    }]);