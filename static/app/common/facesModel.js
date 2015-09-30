'use strict';


angular
    .module('compositeApp.common')
    .service('FacesModel',
    	     ['$http', '$rootScope',
    	     function ($http, $rootScope) {

    
    /**
     * Private variables, setters
     *
     */
    var faces = {
    	urls: []
    };



    /**
     * Sets this.faces array with results of hitting backend's
     * /instagram endpoint using location and date models
     *
     */
    this.setFaces = function (lat, lng, radius, minTimestamp) {
    	return new Promise(function(resolve, reject) {
    		$http.post('/instagram', {"lat": lat,
    		                          "lng": lng,
    		                          "dist": radius,
    		                          "min_timestamp": minTimestamp})
    		    .success(function (results) {
    		    	faces.urls = results;
    		    	resolve("Success!");
    		    })
    		    .error(function (error) {
    		        console.log('Error setting faces');
    		        resolve("Failure!");
    		    });
    	});
    };


    /**
     * Primary faces model accessor
     *
     */
    this.getFaces = function () {
    	return faces;
    };



}]);