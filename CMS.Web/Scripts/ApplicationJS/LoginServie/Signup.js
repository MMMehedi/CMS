App.controller('SignupCtrl', function ($scope, CMSService) {
    return;
    $scope.CUser = {};
    $scope.Save = function (CUser) {
        if ($scope.CUser.Email == undefined)
            $scope.CUser.Email = "";
        if (filedVal() == true) {
            CUser.UnionID = 1;
            CUser.Name = $scope.CUser.Name;
            CUser.Address = $scope.CUser.Address;
            CUser.LoginUser = "";
            CUser.Password = $scope.CUser.Password;
            CUser.DesignationID = 1;
            CUser.Mobile = $scope.CUser.Mobile;
            CUser.Email = $scope.CUser.Email;
            CUser.UserType = '0';
            CUser.Active = 'False';
            CMSService.Save('/api/UserInfo/Add/', CUser).success(function (data) {
                toastr.success(data);
                $scope.ClearAll();
                //window.location = '../Home/Index';
            });
        }
    }

    //Clear All
    $scope.ClearAll = function () {
        $scope.CUser = {};
        $('#Name').css('border-color', '');
        $('#Address').css('border-color', '');
        $('#Password').css('border-color', '');
        $('#MobileNo').css('border-color', '');
        $('#Email').css('border-color', '');
        $('.validation').hide();
    }

    $("#MobileNo").bind('keypress', function (e) {
        if (e.keyCode == '9' || e.keyCode == '20') {
            return true;
        }
        var code;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        if (e.which == 46)
            return false;
        if (code == 8 || code == 46)
            return true;
        if (code < 48 || code > 57)
            return false;
    });
    function filedVal() {
        var reEmail = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        $('#Name').css('border-color', '');
        $('#Address').css('border-color', '');
        $('#Password').css('border-color', '');
        $('#MobileNo').css('border-color', '');
        $('#Email').css('border-color', '');
        $('.validation').hide();
        if ($('#Name').val() == '') {
            $('#Name').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>ঘরটি অবশ্যই পূরণ করতে হবে।</div></div>");
            $('#Name').css('border-color', 'red');
            $('#Name').focus();
        }
        else if ($('#MobileNo').val() == '') {
            $('#MobileNo').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>ঘরটি অবশ্যই পূরণ করতে হবে।</div></div>");
            $('#MobileNo').css('border-color', 'red');
            $('#MobileNo').focus();
        }
        else if ($('#MobileNo').val() == '') {
            $('#MobileNo').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>১১ টি নম্বর এর কম হয়েছে ।</div></div>");
            $('#MobileNo').css('border-color', 'red');
            $('#MobileNo').focus();
        }
            //else if ($('#MobileNo').val() == '' || $('#MobileNo').val().length < 11) {
            //    if ($('#MobileNo').val() == '') {
            //        $('#MobileNo').parent().after("<div class='validation  col-md-7' style='color:red'><div class='col-md-12'>ঘরটি অবশ্যই পূরণ করতে হবে।</div></div>");
            //        $('#MobileNo').css('border-color', 'red');
            //        $('#MobileNo').focus();
            //    }
            //    else if ($('#MobileNo').val().length < 11) {
            //        $('#spnMobileClearText').show();
            //        $('#MobileNo').css('border-color', '');
            //        $('.validation').hide();
            //    }
            //}
        else if ($('#Email').val().length < 11) {
            $('#Email').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>১১ টি নম্বর এর কম হয়েছে ।</div></div>");
            $('#Email').css('border-color', 'red');
            $('#Email').focus();
        }
        else if ($('#Email').val() != "") {
            if (!(reEmail.test($('#Email').val()))) {
                $('#Email').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>ইমেইলটি সঠিক নয়</div></div>");
                $('#Email').css('border-color', 'red');
                $('#Email').focus();
                return false;
            }
            return true;
        }
        else if ($('#Password').val() == '') {
            $('#Password').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>ঘরটি অবশ্যই পূরণ করতে হবে।</div></div>");
            $('#Password').css('border-color', 'red');
            $('#Password').focus();
        }
        else if ($('#Address').val() == '') {
            $('#Address').parent().after("<div class='validation  col-md-12' style='color:red'><div class='col-md-12'>ঘরটি অবশ্যই পূরণ করতে হবে।</div></div>");
            $('#Address').css('border-color', 'red');
            $('#Address').focus();
        }
        else {
            $('#Address').css('border-color', '');
            $('.validation').hide();
            return true;
        }
    }
});
