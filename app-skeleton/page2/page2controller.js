myApp.controller('Page2Controller', ["$scope", "$state", "$http","RecipesService",

    function ($scope, $state, $http, recipesService) {

        console.log('this is the page2controller, hi!');

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
])

.service('RecipesService', function(){
    var recipesService = {};

    recipesService.recipesList = [
        {componants: ['comp1','comp2'], products: 'prod1'},
        {componants: ['comp3','comp4'], products: 'prod2'},
        {componants: ['comp1','comp4'], products: 'prod2'}
    ]
    recipesService.add = (recipe) => {
        recipesService.recipesList.push(recipe);
        console.log(recipesService.recipesList);
    }

    recipesService.evaluate = (recipe) => {
        recipe.cost = 0;
        recipe.price = 0;
        recipe.profit = - products.count() - componants.count();
        recipesService.getPrices(products,recipe,true);
        recipesService.getPrices(componants,recipe,false);
    }

    recipesService.getPrices = (list,recipe,bool) => {
        for (item in list){
            $http({
                method: 'GET',
                url: `http://localhost:5000/api/ahprices/item/:${item.id}`
            }).then(function successCallback(response) {
                // this callback will be called asynchronously when the response is available
                console.log('get ok');
                if(bool){
                    recipe.cost += response;
                }
                else{
                    recipe.price += response;
                }
                recipesService.updateRecipe(recipe);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs or server returns response with an error status.
                console.log('get nok');
            });
        }
    }

    recipesService.updateRecipe = (recipe) => {
        recipe.profit++;
        if (recipe.profit == 0){
            recipe.profit = recipe.price - recipe.cost;
            console.log("update complete");
        }
    }

    recipesService.evaluateAll = () => {
        for(recipe in recipesService.recipesList){
            evaluate(recipe);
        }
    }

    return recipesService;
})
;
