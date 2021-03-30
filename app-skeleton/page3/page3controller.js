myApp.controller('Page3Controller', ["$scope", "$state", "$http",

    function ($scope, $state, $timeout, $q, $log) {

        console.log('this is the page3controller, hi!');


        $scope.gotohome = function () {
            $state.go("home");
        }


    }
]);
