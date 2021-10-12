
//Start Service
app.factory("loginService", ["$http", function ($http) {

    var urlPrefix = "http://localhost:25692";
    var loginService = {};
    loginService.Save = function (apiUrl, entity) {
        return $http({
            method: "post",
            url: urlPrefix + apiUrl,
            //headers: { "Authorization": "Bearer " + token },
            data: entity
        });
    }
    return loginService;
}]);
//End of Service