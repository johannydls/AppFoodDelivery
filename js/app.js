'use strict';

var app = angular.module('appfood', ['ngStorage','angularUtils.directives.dirPagination']);

app.controller('appfoodController', function($scope, $http, $localStorage) {

	$scope.menu = [];
	$scope.bag = [];

	$scope.bag = $localStorage.bag;
	$scope.totalBag = $localStorage.totalBag;
	$scope.totalItems = $localStorage.totalItems;

	//Recovery datas from menu.json
	$http.get('data/menu.json')
		.then(function(response) {
			$scope.menu = response.data.food;
	});

	//Function to add one item on the bag
	$scope.addOne = function(id) {
		
		//$scope.bag = $localStorage.bag;

		var index = getItemBag(id);
		var food = $scope.bag[index];

		$scope.bag[index].quantity += 1;
		$scope.bag[index].totalPrice = food.price * $scope.bag[index].quantity;

		$scope.totalBag = getTotalPrice();
		$scope.totalItems = getTotalItems();

		//$localStorage.bag = $scope.bag;
	}

	//Function to remove one item from the bag
	$scope.removeOne = function(id) {
		
		//$scope.bag = $localStorage.bag;

		var index = getItemBag(id);
		var food = $scope.bag[index];

		if($scope.bag[index].quantity == 1) {
			$scope.bag.splice(index, 1);
		} else {
			$scope.bag[index].quantity -= 1;
			$scope.bag[index].totalPrice = food.price * $scope.bag[index].quantity;
		}

		$scope.totalBag = getTotalPrice();
		$scope.totalItems = getTotalItems();

		//$localStorage.bag = $scope.bag;
	}

	//Function to add a item to the bag
	$scope.addFoodBag = function(id) {

		var index = getSelectedIndex(id);
		var food = $scope.menu[index];

		if(getItemBag(id) == -1) {
			$scope.bag.push(
				{
					id: food.id,
					title: food.title,
					price: food.price,
					quantity: 1,
					totalPrice: food.price
				}
			);

		} else {
			$scope.bag[index].quantity += 1;
			$scope.bag[index].totalPrice = food.price * $scope.bag[index].quantity;
		}

		$scope.totalBag = getTotalPrice();
		$scope.totalItems = getTotalItems();

		$localStorage.bag = $scope.bag;
		$localStorage.totalBag = $scope.totalBag;
		$localStorage.totalItems = $scope.totalItems;

	}

	//Function to clear the bag once the purchase has been made
	$scope.cleanBag = function() {
		$scope.bag = $localStorage.bag = [];
		$scope.totalBag = 0;
		$scope.totalItems = 0;
	}

	//Function to filter the table of food by cuisine
	$scope.filterBy = function(cuisine) {
		$scope.myFilter = cuisine;
	};

	//Function to order the table of food
	$scope.orderByMe = function(ord) {
		$scope.myOrderBy = ord;
		$scope.reverse = !$scope.reverse;
	};

	//Change the image src item according to the category
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

	//Function to get the index of the selected item from the table of food
	function getSelectedIndex(id) {

		for(var i = 0; i < $scope.menu.length; i++) {
			if($scope.menu[i].id == id)
				return i;
		}
		return -1;
	};

	//Function to get the total items from the bag
	function getTotalItems() {

		//$scope.bag = $localStorage.bag;
		var total = 0;

		for( var i = 0; i < $scope.bag; i++) {
			total += $scope.bag[i].quantity;
		}
		return total;
	};

	//Function to calculate the total price from the bag
	function getTotalPrice() {
		
		//$scope.bag = $localStorage.bag;
		var total = 0;
		
		for(var i = 0; i < $scope.bag.length; i++) {
			total += $scope.bag[i].totalPrice;
		}
		return parseFloat(total.toFixed(2));
	};

	//Function to get index of the selected item from the bag
	function getItemBag(id) {

		//$scope.bag = $localStorage.bag;
		
		for (var i = 0; i < $scope.bag.length; i++) {
			if($scope.bag[i].id == id)
				return i;
		}
		return -1;
	};
});