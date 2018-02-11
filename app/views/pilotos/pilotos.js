'use strict';

angular.module('myApp.pilotos', ['ngRoute'])

    .controller('pilotosCtrl', ['$scope', 'globalF', 'ResourcePilotos', 'FileUploader', 'ResourceEscuderias', 
    	function($scope, globalF, ResourcePilotos, FileUploader, ResourceEscuderias) { 
        	$scope.newPiloto = {};
            $scope.editPiloto = {};
            $scope.response = {};
            $scope.escuderias = {};
            $scope.img = null;

            $scope.reset = function(){
                for(var item in uploader.queue){
                    var a = uploader.queue[item];
                    a.remove();
                }
            }

            $scope.post_img = function(){
            	for(var item in uploader.queue){
                    var a = uploader.queue[item];
                    a.upload();
                }
            }         

            $scope.get = function(){
                ResourcePilotos.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    for(var i in res.data){
                    	var date = res.data[i];
                    	date.fec_nacimiento = new Date(date.fec_nacimiento);
                    }
                    $scope.response = res.data; 
                });
            }
            $scope.get();

            $scope.getEscuderia = function(){
                ResourceEscuderias.get({
                    act: 'list'
                }, function (res) {
                    globalF.toastr_msj(res);
                    $scope.escuderias = res.data; 
                });
            }
            $scope.getEscuderia();

            $scope.post = function(){
            	$scope.newPiloto.img_piloto = $scope.img;  
            	$('#btn-create').prop('disabled',true);
            	ResourcePilotos.add($scope.newPiloto,function(res){
                    if(res.status =='success'){
                        globalF.toastr_msj(res);                       
                        $scope.newPiloto = {};
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
                $scope.editPiloto = item; 
            }

            $scope.put = function(){
                $scope.editPiloto.img_piloto = $scope.img;  
            	$('#btn-edit').prop('disabled',true);

                ResourcePilotos.update($scope.editPiloto,function(res){
                    console.log($scope.editPiloto);
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
                $scope.confirm = confirm("¿Desea Borrar a esta Piloto '"+item.nom_Piloto+" ?");                
                if($scope.confirm){
                    $('#btn-remove').prop('disabled',true);
                    $scope.delete(item);
                }else{
                    $('#btn-remove').prop('disabled',false);
                    return false;
                }
            }

            $scope.delete = function(item){
                console.log(item);         
                $scope.doc_piloto =  item.doc_piloto;  
                ResourcePilotos.delete({
                    doc_piloto: $scope.doc_piloto
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

            //img
            	var uploader = $scope.uploader = new FileUploader({
	                url: api_url+'/api/images'
	            });

	            // FILTERS
	            uploader.filters.push({
	                name: 'customFilter',
	                fn: function(item /*{File|FileLikeObject}*/, options) {
	                    return this.queue.length < 1;
	                }
	            });

	            // CALLBACKS

	            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
	                console.info('onWhenAddingFileFailed', item, filter, options);
	            };
	            uploader.onAfterAddingFile = function(fileItem) {
	                //console.info('onAfterAddingFile', fileItem);
	            };
	            uploader.onAfterAddingAll = function(addedFileItems) {
	                //console.info('onAfterAddingAll', addedFileItems);
	            };
	            uploader.onBeforeUploadItem = function(item) {
	                //onsole.info('onBeforeUploadItem', item);
	            };
	            uploader.onProgressItem = function(fileItem, progress) {
	                //console.info('onProgressItem', fileItem, progress);                
	            };
	            uploader.onProgressAll = function(progress) {
	                //console.info('onProgressAll', progress);
	            };
	            uploader.onSuccessItem = function(fileItem, response, status, headers) {
	                //console.info('onSuccessItem', fileItem, response, status, headers);
	            };
	            uploader.onErrorItem = function(fileItem, response, status, headers) {
	                console.info('onErrorItem', fileItem, response, status, headers);
	            };
	            uploader.onCancelItem = function(fileItem, response, status, headers) {
	                console.info('onCancelItem', fileItem, response, status, headers);
	            };
	            uploader.onCompleteItem = function(fileItem, response, status, headers) {
	                console.info('onCompleteItem', fileItem, response.id, status, headers);
	                $scope.img = response.id;
	                if($scope.p == 1){
	                	$scope.post();
	                }else if($scope.e == 1){
	                	$scope.put();
	                }
	            };
	            uploader.onCompleteAll = function() {
	                console.info('onCompleteAll');
	            };

	            //console.info('uploader', uploader);

	            // -------------------------------

	            var controller = $scope.controller = {
	                isImage: function(item) {
	                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	                }
	            };    
            //img 
               
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pilotos', {
            templateUrl: 'views/pilotos/pilotos.html',
            controller: 'pilotosCtrl'
        });
    }]);