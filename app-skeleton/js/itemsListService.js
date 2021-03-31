myApp.service("ItemsListService", ["$http", function ($http) {

    var itemsListService = {};
    
    itemsList = [];

    cantReachServerAlert = function () {
        alert(
          "Could not reach the server, you will not be able to create a new recipe at this time"
        );
      };

    reloadItemsList = function (callback) {
        console.log("Attempting to retrieve items list");
        $http({
          method: "GET",
          url: "http://localhost:5000/database/items",
        }).then(
          function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("Items list successfully retrieved");
            itemsList = response.data;
            callback(itemsList);
          },
          function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("Could not retrieve items list");
            cantReachServerAlert();
          }
        );
      };

    itemsListService.getItemsList = (callback) => {
        if(itemsList.length > 0){
            callback(itemsList);
        }
        else{
            reloadItemsList(callback);
        }
    }

    return itemsListService;

}]);
