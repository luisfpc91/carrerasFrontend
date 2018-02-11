 'use strict';

angular.module('myApp.carreras', ['ngRoute'])

    .controller('carrerasCtrl', ['$scope', 'globalF', 'ResourceCarreras', 'FileUploader', 
    	function($scope, globalF, ResourceCarreras, FileUploader) { 
        	$scope.newCarrera = {};
            $scope.editCarrera = {};
            $scope.response = {};

            $scope.reset = function(){
                for(var item in uploader.queue){
                    var a = uploader.queue[item];
                    a.remove();
                }
            }

            $scope.get = function(){
                ResourceCarreras.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    for(var i in res.data){
                    	var date = res.data[i];
                    	date.fec_carrera = new Date(date.fec_carrera);
                    }
                    $scope.response = res.data; 
                });
            }
            $scope.get();

            $scope.post = function(){
            	$('#btn-create').prop('disabled',true);
                ResourceCarreras.add($scope.newCarrera,function(res){
                    if(res.status =='success'){
                        globalF.toastr_msj(res);                       
                        $scope.newCarrera = {};
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
                $scope.editCarrera = item; 
            }

            $scope.put = function(){
                if($scope.img){   
                    $scope.editCarrera.img_Carrera = $scope.img;
                }  

                ResourceCarreras.update($scope.editCarrera,function(res){
                    if(res.status=='success'){
                        globalF.toastr_msj(res);
                        $scope.get();
                        $scope.img = null;  

                        $('#btn-cancel-edit').click();
                        $scope.reset();
                    }else{
                        globalF.toastr_msj(res);
                    }                    
                });
            }

            $scope.trash = function(item){
                $scope.confirm = confirm("¿Desea Borrar a esta Carrera '"+item.nom_Carrera+" ?");                
                if($scope.confirm){
                    $('#btn-remove').prop('disabled',true);
                    $scope.delete(item);
                }else{
                    $('#btn-remove').prop('disabled',false);
                    return false;
                }
            }

            $scope.delete = function(item){        
                $scope.nro_carrera =  item.nro_carrera;  
                ResourceCarreras.delete({
                    nro_carrera: $scope.nro_carrera
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
        $routeProvider.when('/carreras', {
            templateUrl: 'views/carreras/carreras.html',
            controller: 'carrerasCtrl'
        });
    }]);