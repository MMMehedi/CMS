App.controller('UserInfoCtrl', function ($scope, $filter, CMSService) {

    $('.select2').select2({ allowClear: true })
    $('#DesignationID').prop("disabled", true);
    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
        $('#EmpNameID').change(function () {
            CMSService.GetAll('/api/UserInfo/GetByEmpID/' + localStorage.getItem('CompanyID') + '/' + $("#EmpNameID").val()).success(function (data) {
                $scope.CUser.Address = angular.copy(data[0].Address);
                $scope.CUser.Name = angular.copy(data[0].EmpName);
                $scope.CUser.Email = angular.copy(data[0].Email);
                $scope.CUser.Mobile = angular.copy(data[0].Mobile);
                $('#DesignationID').val(angular.copy(data[0].DesignationID));
                $('#DesignationID').select2().trigger('change.select2');
            });
        });

        CMSService.GetAll('/api/UserInfo/GetEmpByComID/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
            $scope.Employees = largeLoad;
        });
        CMSService.GetAll('/api/DesignationInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.designations = data;
        });

        $scope.UserID = localStorage.getItem('UserID');
        $scope.SaveDisabled = false;
        $scope.msgspinner = true;
        $scope.msgloading = true;
        $scope.msgSave = false;
        $scope.Clearspinner = function () {
            $scope.msgspinner = true;
            $scope.SaveDisabled = false;
            $scope.msgloading = true;
            $scope.msgSave = false;
        }
        $scope.ClearAll = function () {
            $('#EmpNameID').css('border-color', '');
            $('#NameID').css('border-color', '');
            $('#Address').css('border-color', '');
            $('#DesignationID').css('border-color', '');
            $('#MobileNo').css('border-color', '');
            $('#Email').css('border-color', '');
            $('#Password').css('border-color', '');
            $('#EmpNameID').val('').trigger('change.select2');
            $('#DesignationID').val('').trigger('change.select2');
            $('#EmpNameID').prop("disabled", false);
            $scope.Clearspinner();
            $scope.CUser = {};
            $scope.filterOptions.filterText = "";
            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
            $scope.buttonText = 'Save';
        }

        $scope.CUser = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (entity) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                entity.EmpID = $("#EmpNameID").val();
                entity.Name = $scope.CUser.Name;
                entity.Address = $scope.CUser.Address;
                entity.Mobile = $scope.CUser.Mobile;
                entity.Email = $scope.CUser.Email;
                entity.Password = $scope.CUser.Password;
                entity.UserType = "0";
                entity.DesignationID = $("#DesignationID").val();
                entity.CompanyID = 1;
                entity.Active = $scope.CUser.Active;
                entity.CreateBy = $scope.UserID;
                entity.ModifyBy = $scope.UserID;
                //console.log(entity
                if ($scope.buttonText == 'Save') {
                    CMSService.Save('/api/UserInfo/Add/', entity).success(function (data) {
                        if (data == "Data Saved Successfullly") {
                            toastr.success(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.ClearAll();
                        }
                        else if (data == "Data Already Exits") {
                            toastr.warning(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.Clearspinner();
                        }
                        else {
                            $scope.Clearspinner();
                            toastr.error("Something wrong!!");
                        }
                    });
                }
                if ($scope.buttonText = 'Update') {
                    entity.EmpID = $("#EmpNameID").val();
                    entity.DesignationID = $("#DesignationID").val();
                    entity.CreateBy = $scope.CreatedBy;
                    entity.CreateDate = $scope.CreateDate;
                    entity.ModifyBy = $scope.UserID;
                    CMSService.Save('/api/UserInfo/Update/', entity).success(function (data) {
                        if (data == "Data Updated Successfullly") {
                            toastr.success(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.ClearAll();
                        }
                        else {
                            $scope.Clearspinner();
                            alert("Something wrong!!");
                        }
                    });
                }
            }
        }

        //ng-Grid
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10, 20, 50, 100, 150, 200],
            pageSize: '10',
            currentPage: 1
        };
        function fnSetPagingData(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.UserInfos = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function fnGetPagedDataAsync(pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    CMSService.GetAll('/api/UserInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
                        data = largeLoad.filter(function (item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        if (data.length == 0) {
                            $('#divMsg').show();
                        }
                        else {
                            $('#divMsg').hide();
                        }
                        fnSetPagingData(data, page, pageSize);
                    });
                } else {
                    CMSService.GetAll('/api/UserInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
                        fnSetPagingData(largeLoad, page, pageSize);
                    });
                }
            }, 100);
        };

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (isNaN($scope.pagingOptions.currentPage)) {
                $scope.pagingOptions.currentPage = 1;
            }
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                fnGetPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
            else {
                fnGetPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                fnGetPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.gridOptions = {
            data: 'UserInfos',
            enablePaging: true,
            showFooter: true,
            enableRowSelection: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            enableCellSelection: false,
            selectedItems: $scope.selectedRow,
            multiSelect: false,
            columnDefs: [
            { field: 'UserID', displayName: 'UserID', width: 100, visible: false },
            { field: 'Edit', width: 45, sortable: false, cellTemplate: '<button ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
            { field: 'Name', displayName: 'Name', width: 200, visible: true },
            { field: 'Address', displayName: 'Address', width: 300, visible: true },
            { field: 'Name', displayName: 'Profile Name', width: 200, visible: true },
            { field: 'Mobile', displayName: 'Mobile', width: 100, visible: true },
            { field: 'Email', displayName: 'Email', width: 230, visible: true },
            { field: 'EmpID', displayName: 'EmpID', width: 200, visible: false },
            { field: 'Password', displayName: 'Password', width: 100, visible: false },
            { field: 'DesignationID', displayName: 'DesignationID', width: 100, visible: false },
            { field: 'UnionID', displayName: 'UnionID', width: 100, visible: false },
            { field: 'UserType', displayName: 'UserType', width: 100, visible: false },
            { field: 'Active', displayName: 'Active', width: 100, visible: false },
            { field: 'CreateBy', displayName: 'CreatedBy', width: 100, visible: false },
            { field: 'CreateDate', displayName: 'CreateDate', width: 100, visible: false }
            ]
        };

        $scope.edit = function (row) {
            $scope.ClearAll();
            $('#EmpNameID').prop("disabled", true);
            $('#EmpNameID').val(angular.copy(row.EmpID));
            $('#EmpNameID').select2().trigger('change.select2');
            $('#DesignationID').val(angular.copy(row.DesignationID));
            $('#DesignationID').select2().trigger('change.select2');
            $scope.CUser = angular.copy(row);
            $scope.CreatedBy = angular.copy(row.CreateBy);
            $scope.CreateDate = angular.copy(row.CreateDate);
            $scope.buttonText = 'Update';
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

            $('#EmpNameID').css('border-color', '');
            $('#NameID').css('border-color', '');
            $('#Address').css('border-color', '');
            $('#DesignationID').css('border-color', '');
            $('#MobileNo').css('border-color', '');
            $('#Email').css('border-color', '');
            $('#Password').css('border-color', '');
            $('.validation').hide();

            if ($("#EmpNameID").val() == "") {
                $("#EmpNameID").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Can't be empty !");
                return;
            }
            else if ($('#NameID').val() == '') {
                $('#NameID').css('border-color', 'red');
                $('#NameID').focus();
                toastr.warning("Can't be empty !");
            }
            else if ($('#Address').val() == '') {
                $('#Address').css('border-color', 'red');
                $('#Address').focus();
                toastr.warning("Can't be empty !");
            }
            else if ($("#DesignationID").val() == "") {
                $("#DesignationID").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Can't be empty !");
                return;
            }
            else if ($('#MobileNo').val() == '' || $('#MobileNo').val().length < 11) {
                if ($('#MobileNo').val() == '') {
                    $('#MobileNo').css('border-color', 'red');
                    $('#MobileNo').focus();
                    toastr.warning("Can't be empty !");
                }
                else if ($('#MobileNo').val().length < 11) {
                    $('#spnMobileClearText').show();
                    $('#MobileNo').css('border-color', '');
                    $('.validation').hide();
                }
            }
            else if ($('#Password').val() == '') {
                $('#Password').css('border-color', 'red');
                $('#Password').focus();
                toastr.warning("Can't be empty !");
            }
            else if ($('#Email').val() == '') {
                $('#Email').css('border-color', 'red');
                $('#Email').focus();
                toastr.warning("Can't be empty !");
            }
            else if ($('#Email').val() != "") {
                if (!(reEmail.test($('#Email').val()))) {
                    $('#Email').parent().after("<div class='validation  col-md-7' style='color:red'><div class='col-md-12'>Email is not valid</div></div>");
                    $('#Email').css('border-color', 'red');
                    $('#Email').focus();
                    return false;
                }
                return true;
            }
            else {
                $('#Email').css('border-color', '');
                $('.validation').hide();
                return true;
            }
        }
    }
});
