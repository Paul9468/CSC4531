myApp.controller('HomeController', ["$scope", "$state",

    function ($scope, $state) {

        console.log('this is the homecontroller, hi!');

        $scope.userString = "default value";

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
