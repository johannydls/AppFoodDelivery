'use strict';

var app = angular.module('appfood', ['angularUtils.directives.dirPagination',
									'ngStorage']);

app.controller('appfoodController', function($scope, $http, $localStorage) {

	$scope.menu = [];
	$scope.bag = [];

	//Recovery datas from menu.json
	$http.get('data/menu.json')
		.then(function(response) {
			$scope.menu = response.data.food;
	});

	$scope.filterBy = function(cuisine) {
		$scope.myFilter = cuisine;
	};

	$scope.orderByMe = function(ord) {
		$scope.myOrderBy = ord;
		$scope.reverse = !$scope.reverse;
	};

	$scope.loadImg = function(food) {
		
		var pathImg = "";

		switch(food.cuisine) {
			case "salad":
				pathImg = "images/salad.svg"
				break;

			case "pizza":
				pathImg = "images/pizza.svg"
				break;

			case "chinese":
				pathImg = "images/chinese.svg"
				break;

			case "beverage":
				pathImg = "images/beverage.svg"
				break;

			case "burgers":
				pathImg = "images/burgers.svg"
				break;
		}

		return pathImg;
	};
});