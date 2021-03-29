myApp.controller('NavbarController', ["$scope", "$state",

    function ($scope, $state) {

        console.log('this is the navigation bar controller, hi!');


        $scope.gotohome = function () {
            $state.go("home");
        }
        $scope.gotopage3 = function () {
            $state.go("page3");
        }
        $scope.gotoautocomplete = function () {
            $state.go("autocomplete");
        }

    }
]);
