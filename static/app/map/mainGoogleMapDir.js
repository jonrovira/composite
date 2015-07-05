'use strict';

angular
	.module('compositeApp.map')
	.directive('mainGoogleMap',
		       ['LocationModel',
		       function (LocationModel) {



    return {
    	restrict: 'A',
    	link: function($scope, element, attrs) {
    		var el = element[0];



    		/**
    		 * Set map options and create the map
    		 *
    		 */
    		var mapOptions = {
    			center: new google.maps.LatLng($scope.location.lat, $scope.location.lng),
    			zoom: $scope.location.zoom,
    			disableDefaultUI: true,
    			disableDoubleClickZoom: true,
    			styles: [
                    {
                        "stylers": [ 
                            {
                                "visibility": "on"
                            },
                            {
                                "saturation": -100
                            },
                            {
                                "gamma": 0.54
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "stylers": [
                            {
                                "color": "#373737"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill", 
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "gamma": 0.48
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "gamma": 7.18
                            }
                        ]
                    }
                ]
    		};
    		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);



    		/**
    		 * Wait for tiles to load, then add idle map listener to update
    		 * the location model
    		 *
    		 */
    		google.maps.event.addListener(map, 'tilesloaded', function () {
    			
    			// User stops dragging map
    			google.maps.event.addListener(map, 'idle', function () {
    				updateLocationModel();
    			});

    		});



    		/**
    		 * Update location model with map's state. Uses a block to avoid too many API calls
    		 *
    		 */
    		var blocking = false;
    		var updateLocationModel = function() {
    			if (blocking) { return; }
    			else {
    				blocking = true;
    				var center = map.getCenter();
    				var zoom = map.getZoom();
    				LocationModel.setLocation(center.lat(), center.lng(), zoom, null, $(window).width(), $(window).height()).then(function(response) {
    					blocking = false;
    				});
    			}
    		};



    		/**
    		 * Watch for external location model changes, update map appropriately
    		 *
    		 */
    		$scope.$on('external-location-change', function(event, args) {
    			console.log("External location change");
    			var location = LocationModel.getLocation();
    			if (location.viewport != null) {
    				map.fitBounds(location.viewport);
    			}
    			else {
    				map.setCenter(new google.maps.LatLng(location.lat, location.lng));
					map.setZoom(location.zoom);
    			}
    		}, true);
    	}
    };



}]);