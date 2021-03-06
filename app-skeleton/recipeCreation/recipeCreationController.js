myApp.controller("RecipeCreationController", [
  "$scope",
  "$state",
  "$http",
  "RecipesService",
  "ItemsListService",

  function ($scope, $state, $http, recipesService, itemsListService) {
    console.log("this is the recipeCreation controller, hi!");

    $scope.compList = [];
    $scope.prodList = [];

    if ($state.params.id) {
      const recipe = recipesService.recipesList.filter(
        (recipe) => recipe.id == $state.params.id
      )[0];
      console.log(recipe);
      recipe.components.forEach((item) => {
        $scope.compList.push(item);
      });
      recipe.products.forEach((item) => {
        $scope.prodList.push(item);
      });
      document.getElementById("nameForm").value = recipe.name;
    }

    $scope.goToList = function () {
      $state.go("CustomRecipeList");
    };

    bindFormsToAutocompletionList = function (list) {
      if (document.getElementById("componentForm")) {
        autocomplete(document.getElementById("componentForm"), list);
        autocomplete(document.getElementById("productForm"), list);
      }
    };

    $scope.saveRecipe = function () {
      saveCallback = () => {
        newRecipe = {
          name:
            document.getElementById("nameForm").value.length > 0
              ? document.getElementById("nameForm").value
              : $scope.prodList.length > 0
              ? $scope.prodList[0].name
              : "Empty recipe",
          components: $scope.compList,
          products: $scope.prodList,
          price: -1,
          cost: -1,
          profit: -1,
          id: $state.params.id || Date.now() - 1610000000000,
        };
        recipesService.add(newRecipe);
        $state.go("CustomRecipeList");
      };

      if ($state.params.id) {
        recipesService.deleteRecipe(
          recipesService.recipesList.filter(
            (recipe) => recipe.id == $state.params.id
          )[0],
          saveCallback
        );
      } else {
        saveCallback();
      }
    };

    var items = [];

    $scope.reloadItemsList = (function () {
      itemsListService.getItemsList((list) => {
        bindFormsToAutocompletionList(list);
        items = list;
      });
    })();

    //Autocomplete function from https://www.w3schools.com/howto/howto_js_autocomplete.asp
    function autocomplete(inp, arr) {
      /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function (e) {
        var a,
          b,
          i,
          val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        //If the user type at least 3 characters
        if (val.length > 2) {
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
              arr[i]._name.substr(0, val.length).toUpperCase() ==
              val.toUpperCase()
            ) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML =
                "<strong>" + arr[i]._name.substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i]._name.substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML +=
                "<input type='hidden' value='" + arr[i]._name + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                                (or any other open lists of autocompleted values:*/
                closeAllLists();
              });
              a.appendChild(b);
            }
          }
        }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }

    $scope.addComponent = function () {
      addItem($scope.compList, "componentForm");
    };

    $scope.addProduct = function () {
      addItem($scope.prodList, "productForm");
    };

    $scope.deleteItem = function (bool, itemId) {
      if (bool) {
        $scope.prodList = $scope.prodList.filter((item) => item.id != itemId);
      } else {
        $scope.compList = $scope.compList.filter((item) => item.id != itemId);
      }
    };

    function addItem(list, form) {
      try {
        itemIndex = list.findIndex(
          (item) => item.name == document.getElementById(form).value
        );
        if (itemIndex != -1) {
          list[itemIndex].count++;
        } else {
          var new_item =
            items[
              items.findIndex(
                (item) => item.name == document.getElementById(form).value
              )
            ];
          new_item.count = 1;
          list.push(new_item);
        }
      } catch (err) {
        console.log(err);
        alert("Cannot find this item");
      }
    }
  },
]);
