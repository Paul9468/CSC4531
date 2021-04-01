myApp.service("RecipesService", [
  "$http",
  function ($http) {
    var recipesService = {};
    var user ="";
    recipesService.recipesList = [];

    //Get recipes list from server
    recipesService.getRecipes = (callback) => {
      if(user==""){user="default"}
      $http({
        method: "GET",
        url: `http://localhost:5000/recipes/get/${user}`,
      }).then(
        function successCallback(response) {
          console.log("Recipes list successfully retrieved");
          // this callback will be called asynchronously when the response is available
          recipesService.recipesList = response.data || [];
          if (callback) {
            callback();
          }
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs or server returns response with an error status.
          console.log("Could not retrieve recipes list");
        }
      );
    };

    //#region add a recipe
    recipesService.add = (recipe) => {
      recipesService.recipesList.push(recipe);
      recipesService.postRecipe(recipe);
    };

    recipesService.postRecipe = (recipe) => {
      $http({
        method: "POST",
        url: `http://localhost:5000/recipes/post/${user}`,
        data: recipe,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously when the response is available
          console.log("Recipe succesfully posted");
          recipesService.getRecipes();
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs or server returns response with an error status.
          console.log("Could not post recipes");
          console.log(response);
        }
      );
    };
    //#endregion

    //#region delete a recipe
    recipesService.deleteRecipe = (recipe,callback) => {
      $http({
        method: "GET",
        url: `http://localhost:5000/recipes/delete/${user}/${recipe.id}`,
      }).then(
        function successCallback(response) {
          console.log(`Recipe with id: ${recipe.id} successfully deleted`);
          // this callback will be called asynchronously when the response is available
          recipesService.recipesList.splice(recipesService.recipesList.indexOf(recipe),1);
          if (callback) {
            callback();
          }
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs or server returns response with an error status.
          console.log("Could not retrieve recipes list");
        }
      );
    };
    //#endregion

    //#region Evaluate price and cost of all recipes in list
    recipesService.evaluateAll = () => {
      recipesService.recipesList.forEach((recipe) => {
        recipesService.evaluate(recipe);
      });
    };

    //Evaluate single recipe
    recipesService.evaluate = (recipe) => {
      recipe.cost = 0;
      recipe.price = 0;
      recipe.profit = -recipe.products.length - recipe.components.length;
      recipesService.getPrices(recipe, true);
      recipesService.getPrices(recipe, false);
    };

    //Retrieve price for a single item from API
    recipesService.getPrices = (recipe, bool) => {
      list = bool ? recipe.products : recipe.components;
      list.forEach((item) => {
        $http({
          method: "GET",
          url: `http://localhost:5000/ahprices/item/${item.id}`,
        }).then(
          function successCallback(response) {
            // this callback will be called asynchronously when the response is available
            if (bool) {
              recipe.price +=
                Math.max(item.sell_price/10000, response.data) * item.count;
            } else {
              var itemcost = response.data ? response.data : item.purchase_price/10000;
              recipe.cost += item.count * itemcost;
            }
            recipesService.updateRecipe(recipe);
          },
          function errorCallback(response) {
            // called asynchronously if an error occurs or server returns response with an error status.
            console.log("get nok");
          }
        );
      });
    };

    //Conclude evaluation by calculating profit
    recipesService.updateRecipe = (recipe) => {
      recipe.profit++;
      if (recipe.profit == 0) {
        recipe.profit = recipe.price - recipe.cost;
        console.log("Update complete");
        if(recipe.profit/recipe.cost > 0.1){
          recipe.color = "w3-green";
        }
        else if (recipe.profit < 0){
          recipe.color = "w3-red";
        }
        else{
          recipe.color = "w3-grey";
        }
      }
    };
    //#endregion

    //#region set and get user to differentiate recipes lists
    recipesService.setUser = (new_user) => {
      user = new_user;
    };

    recipesService.getUser = () => {
      return user;
    };
    //#endregion

    return recipesService;
  },
]);
