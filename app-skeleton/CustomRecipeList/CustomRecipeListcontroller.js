myApp.controller('CustomRecipeListController', ["$scope", "$state", "$http","RecipesService",

    function ($scope, $state, $http, recipesService) {

        console.log('this is the CustomRecipeList controller, hi!');

        $scope.hardCodedData = "Hard coded data";
        $scope.ahData = "Waiting for input";

        $scope.recipesList = recipesService.recipesList;

        $scope.evaluateAllRecipes = () => {
            recipesService.evaluateAll();
        }
    }
]);
