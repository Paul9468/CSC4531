myApp.controller('Page3Controller', ["$scope", "$state", "$http",

    function ($scope, $state, $timeout, $q, $log) {

        console.log('this is the page3controller, hi!');


        $scope.gotohome = function () {
            $state.go("home");
        }

        this.items = loadAll();
        this.querySearch = querySearch;
        this.selectedItemChange = selectedItemChange;
        this.searchTextChange = searchTextChange;

        //Search for item
        function querySearch(query) {
            var results = query ? this.items.filter(createFilterFor(query)) : this.items,
                deferred;
            if (this.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build items list of key/value pairs
         */
        function loadAll() {
            var allitems = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut';

            return allitems.split(/, +/g).map(function (item) {
                return {
                    value: item.toLowerCase(),
                    display: item
                };
            });
        }

        /**
         * Create filter function for a query string
        */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };

        }
    }
]);
