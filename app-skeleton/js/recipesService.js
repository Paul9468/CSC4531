myApp.service('RecipesService',["$http", function($http){
    var recipesService = {};

    recipesService.recipesList = [
        {"name":"AAAA",
        "components":[{"name":"Apprentice's Boots","count":1,"id":55},{"name":"Primitive Kilt","count":1,"id":153}],
        "products":[{"name":"A Sycamore Branch","count":2,"id":742}],
        "setPrice":"",
        "price":-1,
        "cost":-1,
        "profit":-1,
        "id":7033296789},
        {"name":"BBB",
        "components":[{"name":"A Sycamore Branch","count":2,"id":742}],
        "products":[{"name":"Bent Staff","count":1,"id":35}],
        "setPrice":"",
        "price":-1,
        "cost":-1,
        "profit":-1,
        "id":7033430428}
    ]
    recipesService.add = (recipe) => {
        recipesService.recipesList.push(recipe);
        console.log(recipesService.recipesList);
    }

    recipesService.evaluate = (recipe) => {
        recipe.cost = 0;
        recipe.price = 0;
        recipe.profit = - recipe.products.length - recipe.components.length;
        recipesService.getPrices(recipe,true);
        recipesService.getPrices(recipe,false);
    }

    recipesService.getPrices = (recipe,bool) => {
        list = bool ? recipe.products : recipe.components;
        list.forEach(item =>
        {
            $http({
                method: 'GET',
                url: `http://localhost:5000/api/ahprices/item/${item.id}`
            }).then(function successCallback(response) {
                // this callback will be called asynchronously when the response is available
                if(bool){
                    recipe.cost += response.data * item.count;
                }
                else{
                    recipe.price += response.data * item.count;
                }
                recipesService.updateRecipe(recipe);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs or server returns response with an error status.
                console.log('get nok');
            });
        })
    }

    recipesService.updateRecipe = (recipe) => {
        recipe.profit++;
        if (recipe.profit == 0){
            recipe.profit = recipe.price - recipe.cost;
            console.log("update complete");
        }
    }

    recipesService.evaluateAll = () => {
        recipesService.recipesList.forEach((recipe)=>{
            recipesService.evaluate(recipe);
        })
    }

    return recipesService;
}])