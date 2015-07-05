'use strict';


/**
 * Module declaration
 *
 */
var app = angular.module('compositeApp', [
    'ui.router',
    'compositeApp.common',
    'compositeApp.header',
    'compositeApp.map',
    // 'compositeApp.peek',
    // 'compositeApp.faces',
]);



/**
 * UI Router functionality
 *
 */
app.config(['$interpolateProvider', '$stateProvider', '$urlRouterProvider',
    function($interpolateProvider, $stateProvider, $urlRouterProvider) {

        // To make Angular + Jinja work
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');


        // Router
        $urlRouterProvider.otherwise('/map');
        $stateProvider
        	.state('root', {
        		url: '',
        		abstract: true,
        		views: {
        			'header': {
        				templateUrl: '../static/app/header/header.html',
        				controller: 'HeaderCtrl'
        			}
        		}
        	})
        	.state('root.map', {
        		url: '/map',
        		views: {
					'container@': {
						templateUrl: '../static/app/map/map.html',
						controller: 'MapCtrl'
					}
				}
        	});
    }]);
