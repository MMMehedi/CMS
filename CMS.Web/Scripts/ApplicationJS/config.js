
App.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("UserInfo", {
            url: "/UserInfo",
            templateUrl: "/CMS/_UserInfo"
        })
        .state("SectionInfo", {
            url: "/SectionInfo",
            templateUrl: "/CMS/_SectionInfo"
        })
        .state("StudentInfo", {
            url: "/StudentInfo",
            templateUrl: "/CMS/_StudentInfo"
        })
        .state("UserPermission", {
            url: "/UserPermission",
            templateUrl: "/CMS/_UserPermission"
        })
        .state("AllReport", {
            url: "/AllReport",
            templateUrl: "/Report/_AllReport"
        })
}]);