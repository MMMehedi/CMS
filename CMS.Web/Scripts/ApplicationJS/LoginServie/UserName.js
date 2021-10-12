
//Controller
App.controller('UserNameCtrl', function ($scope, CMSService) {
    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
        $scope.UserName = localStorage.getItem('Name');
    }
    $scope.Logout = function () {
        CMSService.GetAll('/api/User/session/' + 0).success(function (data) {
            window.location = '../Home/Index';
        });
    }

    $scope.Home = function () {
        window.location = "/CMS/Info";
    }
});
//End of Controller
