
//Controller
App.controller('UserCtrl', function ($scope, CMSService, $location, $filter) {
    function GetUserTypeList() {
        CMSService.GetAll('/api/RoleGroup/GetAll').success(function (data) {
            $scope.userTypes = data;
        });
    }

    if (localStorage.getItem('LsUserName') === null) {
        window.location = CMSService.MainWebUrlPrefix + "/Home/Index";
    }
    else {
        $scope.emailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        function fnPageLoad() {
            var crud = '';
            var result = JSON.parse(localStorage.getItem("lsAssignedPermission"));
            var myPermission = $filter('filter')(result, { rolePageID: 33 });
            for (var i = 0; i < myPermission.length; i++) {
                crud = crud + ',' + myPermission[i].roleFunctionID;
            }
            if (crud.match('1')) {
                $scope.btnSave = "Create";
            }
            if (!crud.match('4')) {
                window.location = '/PremierCement/Crm#/Dashboard';
            }
        }
        fnPageLoad();

        if ($location.absUrl().match('NewUser')) {
            $('#strUserOperation').html('');
            $('#strUserOperation').append('<i class="ace-icon fa fa-angle-double-right"></i>User Add');
            localStorage.setItem('userData', null);
        }
        else {
            $('#strUserOperation').html('');
            $('#strUserOperation').append('<i class="ace-icon fa fa-angle-double-right"></i>Edit User');
        }

        $scope.userTypes = {};
        $scope.user = {};
        $scope.user.RoleGroupID = {};
        $scope.truefalse = true;
        $scope.userActions = 'Add New';
        $scope.buttonText = 'Save';
        $scope.isReadOnly = "false";

        function GetEmployeeList() {
            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('EmployeeObject');
            var vResult = JSON.parse(retrievedObject);
            if (vResult == null || vResult.length <= 0) {
                CMSService.GetAll('/api/Employee/GetAll').success(function (data) {
                    $scope.EmployeeInfo = data;
                    var testObject = data;
                    // Put the object into storage
                    localStorage.setItem('EmployeeObject', JSON.stringify(testObject));
                });
            }
            else {
                $scope.EmployeeInfo = vResult;
            }
        }
        GetEmployeeList();

        function GetUserTypeList() {
            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('UserTypeObject');
            var vResult = JSON.parse(retrievedObject);
            if (vResult == null || vResult.length <= 0) {
                CrmService.GetAll('/api/RoleGroup/GetAll').success(function (data) {
                    $scope.userTypes = data;
                    var testObject = data;
                    // Put the object into storage
                    localStorage.setItem('UserTypeObject', JSON.stringify(testObject));
                });
            }
            else {
                $scope.userTypes = vResult;
            }
        }
        GetUserTypeList();
        //End of Dropdownlist

        function UpdateUser() {
            var row = JSON.parse(localStorage.getItem('userData'));
            if (row == null) {
                $scope.user.IsActive = 1;
                return;
            }
            $scope.user.UserID = angular.copy(row.userID);
            //$scope.user.EmployeeID = angular.copy(row.employeeID);
            $scope.user.IsActive = angular.copy(row.isActive);
            $scope.user.IsTempoarryBlocked = angular.copy(row.isTempoarryBlocked);
            $scope.user.UserName = angular.copy(row.userName);
            $scope.user.Email = angular.copy(row.email);
            $scope.user.Password = angular.copy(row.password);

            for (var i = 0; i < $scope.EmployeeInfo.length; i++) {
                if (row.employeeID == $scope.EmployeeInfo[i].employeeID) {
                    $scope.user.EmployeeID = $scope.EmployeeInfo[i];
                }
            }

            for (var i = 0; i < $scope.userTypes.length; i++) {
                if (row.roleGroupID == $scope.userTypes[i].roleGroupID) {
                    $scope.user.RoleGroupID = $scope.userTypes[i];
                }
            }
            $scope.userActions = 'Update';
            $scope.buttonText = "Update";
            $scope.isReadOnly = "true";
            $scope.truefalse = true;

        }
        UpdateUser();

        //Clear All
        $scope.ClearAll = function () {
            $scope.user = {};
            $('#spanEmployee').text('');
            $('#spnClearText').hide();
            $('#spClearMail').hide();
            $scope.buttonText = 'Save';
            $scope.isReadOnly = "false";
            $scope.userActions = 'Add New';
            $scope.truefalse = true;
            $("#txtEmployeeID").prop('readonly', false);
            $("#txtPassword").prop('readonly', false);
            $scope.user.IsActive = 1;
        }
        $('#txtUserName').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > -1) {
                $('#spnClearText').show();
            }
        });
        $('#txtEmail').bind('keypress', function (evt) {
            var charcode = (evt.which);
            if ($(this).val().length > -1) {
                $('#spClearMail').show();
            }
        });

        $scope.Save = function (user) {
            //if (filedVal() == true) {
            user.EmployeeID = $scope.user.EmployeeID.employeeID;
            user.RoleGroupID = $scope.user.RoleGroupID.roleGroupID;
            user.Password = $scope.user.Password;
            user.CreatedUserID = localStorage.getItem("LsUserID");
            if ($scope.buttonText == 'Save') {
                CrmService.Save('/api/User/Add/', user).success(function (data) {
                    if (data.value == 'Data Saved Successfully' || data.value == "Saved Successfully. Mail didn't send") {
                        toastr.success(data.value);
                        window.location = '/PremierCement/Crm#/ViewAllUser';
                        $scope.ClearAll();
                    }
                    else {
                        toastr.error(data.value);
                    }
                });
            }
            if ($scope.buttonText == 'Update') {
                CrmService.Save('/api/User/Update/', user).success(function (data) {
                    if (data.value == "Data Updated Successfully") {
                        toastr.success(data.value);
                        window.location = '/PremierCement/Crm#/ViewAllUser';
                        $scope.ClearAll();
                    }
                    else {
                        toastr.error(data.value);
                    }
                });
            }
            //}
        }

        //$scope.isactive = function () {
        //    if (!$("#IsActive").is(":checked")) {
        //        $("#IsTempoarryBlocked").closest('div').parent('div').hide();
        //    }
        //    else {
        //        $("#IsTempoarryBlocked").prop('checked', false);
        //        $("#IsTempoarryBlocked").closest('div').parent('div').show();
        //    }
        //}

        $scope.ResetPassword = function (user) {
            var a = $location.absUrl().split('?')[1].split('&');
            var UserName = a[0].substring(2, a[0].length);
            var Email = a[1].substring(2, a[1].length);
            user.UserName = UserName;
            user.Email = Email;
            user.Password = user.Password;
            if (user.ConfirmPassword == user.Password) {
                CrmService.Save('/api/User/ResetPassword/', user).success(function (data) {
                    toastr.success(data.trim());
                    if (data.trim() == 'Password reset successfully') {
                        window.location = '/';
                    }
                });
            }
            else {
                toastr.error('ConfirmPassword does not match');
                $('#txtConfirmpassword').focus();
            }
        }

        $scope.ChangePassword = function (user) {
            if (user.ConfirmPassword == user.Password) {

                var UserName = localStorage.getItem('LsUserName');
                if ($location.absUrl().match('OU')) {
                    UserName = localStorage.getItem('lsUserNameForCP');
                }
                user.UserName = UserName;
                CrmService.Save('/api/User/ChangedPassword/', user).success(function (data) {
                    if (data.trim() == "Old password is not mached") {
                        toastr.warning(data.trim());
                        toastr.options.fadeOut = 2500;
                    }
                    else if (data.trim() == "Password changed successfully") {
                        toastr.success(data.trim());
                        toastr.options.fadeOut = 2500;
                        localStorage.setItem('lsUserNameForCP', null);
                        if (!$location.absUrl().match('OU')) {
                            setTimeout(function () {
                                window.location = '/';
                            }, 2000);
                        }
                    }
                });
            }
            else {
                toastr.error('ConfirmPassword does not match');
                $('#txtConfirmpassword').focus();
            }
        }
    }

    function filedVal() {
        var reEmail = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        $('#Email').css('border-color', '');
        $('.validation').hide();
        if ($scope.user.EmployeeID == undefined) {
            alert('Employee is required.');
            return false;
        }
        else if ($scope.user.RoleGroupID == undefined) {
            alert('Role Group is required.');
            return false;
        }
        else if ($('#txtEmail').val() == '') {
            $('#txtEmail').parent().after("<div class='validation  col-md-6' style='color:red'><div class='col-md-12 col-md-offset-8'> This field is required.</div></div>");
            $('#txtEmail').css('border-color', 'red');
            $('#txtEmail').focus();
        }
        else if (!(reEmail.test($('#txtEmail').val()))) {
            $('#txtEmail').parent().after("<div class='validation  col-md-6' style='color:red'><div class='col-md-12 col-md-offset-8'>Email not correct format.</div></div>");
            $('#txtEmail').css('border-color', 'red');
            $('#txtEmail').focus();
            return false;
        }
        else {
            $('#txtEmail').css('border-color', '');
            $('.validation').hide();
            return true;
        }
    }

});
//End of Controller
