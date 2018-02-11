'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.navbar',    
    'myApp.sidebar',
    'myApp.panel',
    'myApp.escuderias',
    'myApp.pilotos',
    'myApp.carreras',
    'myApp.detalles_carreras',
    'myApp.services',   
    'ngResource',
    'ngAnimate',
    'toastr',
    'angularFileUpload',
    'angular-loading-bar'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/panel'});
}])

.factory('globalF', function (toastr) {
    return {
        toastr_msj: function (res) {
            if (res.status == 'success') {
                if (res.msj)
                    toastr.success(res.msj);
                return res;
            } else if (res.status == 'wait') {
                if (res.msj)
                    toastr.info(res.msj);
                return res;
            } else if (res.status == 'fail') {
                if (res.msj)
                    toastr.error(res.msj);
                return res;
            }
        }
    };
})

.directive('ngThumb', ['$window', function($window) {
    
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);