
//Controller
app.controller("LoginCtrl", function ($scope, loginService) {

    $("#loginID").focus();
    $scope.user = {};
    $scope.isReadOnly = false;

    $scope.loader = {
        loading: true,
    };

    $scope.Signup = function () {
        window.location = '/Signup.html'
    }
    $scope.UserLogin = function (user) {
        if (filedVal() == true) {
            loginService.Save('/api/User/Login', user).success(function (data) {
                if (data == null) {
                    toastr.error("User or Password not match !");
                    return
                };
                localStorage.setItem("UserID", data.UserID);
                localStorage.setItem("CompanyID", data.CompanyID);
                localStorage.setItem("Name", data.Name);
                localStorage.setItem("Address", data.Address);
                localStorage.setItem("LoginUser", data.LoginUser);
                localStorage.setItem("Password", data.Password);
                localStorage.setItem("DesignationID", data.DesignationID);
                localStorage.setItem("Mobile", data.Mobile);
                localStorage.setItem("Email", data.Email);
                localStorage.setItem("UserType", data.UserType);
                localStorage.setItem("Active", data.Active);
                window.location = "/CMS/Info";
            });
        }
    }


    function filedVal() {
        $('#loginID').css('border-color', '');
        $('#Lpassword').css('border-color', '');
        $('.validation').hide();

        //$('#divLoading').show();
        if (typeof ($scope.user.Email) == "undefined" || $scope.user.Email == "") {
            toastr.warning("User Email is required");
            $("#loginID").focus();
            return;
        }
        else if (typeof ($scope.user.Password) == "undefined" || $scope.user.Password == "") {
            toastr.warning("Password is required!");
            $("#Lpassword").focus();
            return;
        }
        return true;


        //if ($('#loginID').val() == undefined || $('#loginID').val() == '') {
        //    $('#loginID').css('border-color', 'red');
        //    $('#loginID').focus();
        //}
        //else if ($('#Lpassword').val() == undefined || $('#Lpassword').val() == '') {
        //    $('#Lpassword').css('border-color', 'red');
        //    $('#Lpassword').focus();
        //}
        //else {
        //    $('#Lpassword').css('border-color', '');
        //    $('.validation').hide();
        //    return true;
        //}
    }


});
//End of Controller