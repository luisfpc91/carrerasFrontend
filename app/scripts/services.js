'use strict';

var api_token_inside = {key:'luis',token:'fernando'};

var	api_url = 'http://localhost:8000';
var client_url = 'http://localhost/carreras_frontend/app/';

angular.module('myApp.services', ['ngRoute','ngResource'])

.factory('ResourceEscuderias',function($resource){
	return $resource(api_url+"/api/escuderias",null,{
		get:{
			method:'GET',
			params: api_token_inside
		},
		add:{
			method:'POST',
			params: api_token_inside
		},
		update:{
			method:'PUT',
			params: api_token_inside
		},
		delete:{
			method: 'DELETE',
			params: api_token_inside
		}
	});
})

.factory('ResourcePilotos',function($resource){
	return $resource(api_url+'/api/pilotos',null,{
		add:{
			method: 'POST',
			params: api_token_inside
		},
		get:{
			method: 'GET',
			params: api_token_inside
		},
		update:{
			method: 'PUT',
			params: api_token_inside
		},
		delete:{
			method: 'DELETE',
			params: api_token_inside
		}
	});
})

.factory('ResourceCarreras',function($resource){
	return $resource(api_url+'/api/carreras',null,{
		add:{
			method: 'POST',
			params: api_token_inside
		},
		get:{
			method: 'GET',
			params: api_token_inside
		},
		update:{
			method: 'PUT',
			params: api_token_inside
		},
		delete:{
			method: 'DELETE',
			params: api_token_inside
		}
	});
})

.factory('ResourceDetallesCarreras',function($resource){
	return $resource(api_url+"/api/detalles_carreras",null,{		
		add:{
			method:'POST',
			params: api_token_inside
		},
		get:{
			method:'GET',
			params: api_token_inside
		},
		update:{
			method:'PUT',
			params: api_token_inside
		},
		delete:{
			method:'DELETE',
			params: api_token_inside
		}
	});
});