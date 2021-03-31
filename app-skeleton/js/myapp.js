var myApp = angular.module("myApp", ["ui.router"]);

myApp
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state("home", {
        url: "/home",
        templateUrl: "home/home.html",
      })

      .state("CustomRecipeList", {
        url: "/CustomRecipeList",
        templateUrl: "CustomRecipeList/CustomRecipeList.html",
      })

      .state("page3", {
        url: "/page3",
        templateUrl: "page3/page3.html",
      })

      .state("recipeCreation", {
        url: "/recipeCreation",
        templateUrl: "recipeCreation/recipeCreation.html",
      })
      
      .state("recipeEdition", {
        url: "/recipeEdition/:id",
        templateUrl: "recipeCreation/recipeCreation.html",
      });

    $urlRouterProvider.otherwise("home");
  })
  ;
