'use strict';


angular
    .module('compositeApp.faces')
    .controller('FacesCtrl',
    	        ['$scope', 'FacesModel',
    	        function ($scope, FacesModel) {



    $scope.faces = FacesModel.getFaces();
    $scope.$watch('faces', function(newVal) {
    	console.log(newVal);
    });
    // setInterval(function() {
    // 	console.log(FacesModel.getFaces());
    // }, 2000);


    // /*******************
    //  * Data Management *
    //  *******************/

    // // Switch active view
    // $scope.models.activeView = 'faces';


    // /******************
    //  * UI Interaction *
    //  ******************/
    // $scope.navigateToMap = function() {
    //     window.location.href = "/#/map";
    // };



    // /***********
    //  * Styling *
    //  ***********/
    // $scope.cropFaces = function() {
    //     $('ul.faces li').each(function() {
    //         var width = $(this).children('img').width();
    //         $(this).height(width);
    //     });
    // };
    // $scope.cropFaces();

}]);