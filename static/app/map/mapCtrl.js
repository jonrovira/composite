'use strict';


angular
    .module('compositeApp.map')
    .controller('MapCtrl',
    	        ['$scope', 'LocationModel',
    	        function ($scope, LocationModel) {



    	$scope.location = LocationModel.getLocation();
      


}]);