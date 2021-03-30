myApp.controller('CustomRecipeListController', ["$scope", "$state", "$http","RecipesService",

    function ($scope, $state, $http, recipesService) {

        console.log('this is the CustomRecipeList controller, hi!');

        $scope.hardCodedData = "Hard coded data";
        $scope.ahData = "Waiting for input";

        $scope.recipesList = recipesService.recipesList;

        $scope.evaluateAllRecipes = () => {
            recipesService.evaluateAll();
        }

        $scope.getAHData = function () {
            $scope.ahData = "Trying to reach API";
            $http({
                method: 'GET',
                url: 'http://localhost:3000/signature?region=us&realmName=tichondrius&characterName=tmpikaboo'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('get ok');
                $scope.ahData = response.data;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('get nok');
                $scope.ahData = "Couldnt load API data";
            });
        };
        $scope.getAHData();


    }
]);
