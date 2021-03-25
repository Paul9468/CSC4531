myApp.controller('Page2Controller', ["$scope", "$state", "$http",

    function ($scope, $state, $http) {

        console.log('this is the page2controller, hi!');

        $scope.hardCodedData = "Hard coded data";
        $scope.ahData = "Waiting for input";

        $scope.gotohome = function () {
            $state.go("home");
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
]);
