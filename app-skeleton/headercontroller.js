myApp.controller('HeaderController', ["$scope", "$state",

    function ($scope, $state) {

        console.log('this is the header controller, hi!');


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
