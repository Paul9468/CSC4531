myApp.controller('HomeController', ["$scope", "$state","RecipesService",

    function ($scope, $state, RecipesService) {

        console.log('this is the homecontroller, hi!');

        $scope.userString = RecipesService.getUser();

        document.querySelector('input[name="usernameInput"]').addEventListener('input', function (evt) {
            if(this.value){
            RecipesService.setUser(this.value);
            }
        });

        $scope.gotopage3 = function () {
            console.log('reaching p3');
            $state.go("page3");
        }

        $scope.gotopage2 = function () {
            console.log('reaching p2');
            $state.go("page2");
        }



    }
]);
