
//Service
App.factory("CMSService", ["$http", function ($http) {
    var urlPrefix = "http://localhost:25692";
    //var urlPrefix = "http://vc.federalbd.com/";
    var CMSService = {};

    CMSService.GetAll = function (apiUrl) {
        return $http.get(urlPrefix + apiUrl);
    }
    CMSService.GetByID = function (apiUrl, Id) {
        return $http.get(urlPrefix + apiUrl + "?ID=" + Id);
    }
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    //CMSService.Save = function (apiUrl, entity, token)
    CMSService.Save = function (apiUrl, entity) {
        return $http({
            method: "post",
            url: urlPrefix + apiUrl,
            //headers: { "Authorization": "Bearer " + token },
            data: entity
        });
    }
    CMSService.Update = function (apiUrl, entity) {
        return $http.put(urlPrefix + apiUrl, entity);
    }
    CMSService.Delete = function (apiUrl) {
        return $http.delete(apiUrl);
    }
    CMSService.GetOthersByID = function (apiUrl, token) {
        return $http({
            url: urlPrefix + apiUrl,
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        });
    }
    CMSService.GetAllOther = function (apiUrl) {
        return $http.get(apiUrl);
    }
    return CMSService;
}]);
//End of Service