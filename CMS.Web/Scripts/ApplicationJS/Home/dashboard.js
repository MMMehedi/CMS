
//Controller
App.controller('DashboardCtrl', function ($location) {
    alert(12)
    alert($location.absUrl().split('#/')[1].split('/')[1])
    localStorage.setItem("LsUserName", $location.absUrl().split('#/')[1].split('/')[1]);
    window.location = "/Mis/Rpt#/Dashboard1/000";

});
//End of Controller