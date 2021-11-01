App.controller('ClassWiseSubjectCtrl', function ($scope, $filter, CMSService) {
    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
        $('.select2').select2({ allowClear: true })
        var sysDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
        $scope.Today = sysDate;
        //var Status = true;
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
            $scope.Clearspinner();
            $scope.CWS = {};           
            $('.bordercolor').css('border-color', '');
            $scope.filterOptions.filterText = "";
            $('#divMsg').hide();
            $('.validation').hide();
            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
            $scope.buttonText = 'Save';
        }



        //Dropdown
        CMSService.GetAll('/api/SetUpInfo/GetAllClass/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Classs = data;
        });

        $scope.Group = function () {
            CMSService.GetAll('/api/SetUpInfo/GetAllGroupForFee/' + $scope.CWS.ClassID).success(function (data) {
                $scope.Groups = data;
            });
        }

        CMSService.GetAll('/api/SetUpInfo/GetAllSubject/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Subjects = data;
        });

        $scope.CWS = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (entity) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                if ($scope.buttonText == 'Save') {
                    entity.ClassSubjectID = 0;
                    entity.ClassID = $scope.CWS.ClassID;
                    entity.GroupID = $scope.CWS.GroupID;
                    entity.SubjectID = $scope.CWS.SubjectID;
                    entity.CompanyID = 1;
                    entity.CreatedBy = $scope.UserID;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = true;
                    //entity.CreateDate = $scope.Today;
                    //entity.ModifyDate = $scope.Today;
                    CMSService.Save('/api/ClassWiseSubjectInfo/Add/', entity).success(function (data) {
                        if (data == "Data Saved Successfullly") {                          
                            toastr.success(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.ClearAll();
                        }
                        else if (data == "Data Already Exits") {
                            toastr.remove();
                            toastr.warning(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.Clearspinner();
                        }
                        else {
                            toastr.remove();
                            $scope.Clearspinner();                          
                            toastr.error("Something wrong!!");
                        }
                    });
                }
                if ($scope.buttonText == 'Update') {
                    entity.ClassSubjectID =$scope.CWS.ClassSubjectID; 
                    entity.ClassID = $scope.CWS.ClassID;
                    entity.GroupID = $scope.CWS.GroupID;
                    entity.SubjectID = $scope.CWS.SubjectID;
                    entity.CompanyID = $scope.CWS.CompanyID;
                    entity.CreatedBy = $scope.CWS.CreatedBy;
                    entity.CreatedDate = $scope.CWS.CreatedDate;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = $scope.CWS.Status;                                
                    CMSService.Save('/api/ClassWiseSubjectInfo/Update/', entity).success(function (data) {
                        if (data == "Data Updated Successfullly") {
                            toastr.remove();
                            toastr.success(data);
                            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
                            $scope.ClearAll();
                        }
                        else {
                            toastr.remove();
                            $scope.Clearspinner();
                            alert("Something wrong!!");
                        }
                    });
                }
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
        $scope.data = pagedData;
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
                CMSService.GetAll('/api/ClassWiseSubjectInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
                CMSService.GetAll('/api/ClassWiseSubjectInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
        data: 'data',
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
        { field: 'ClassSubjectID', displayName: 'ClassSubjectID', visible: false },
        { field: 'Edit', width: 70, sortable: false, cellTemplate: '<button  ng-hide="edithide" ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
        { field: 'ClassName', displayName: 'Class Name', visible: true },
        { field: 'GroupName', displayName: 'Group Name', visible: true },
        { field: 'SubjectName', displayName: 'SubjectName', visible: true },
        { field: 'Status', displayName: 'Status', width: 100, visible: false },      
        ]
    };
    //End of ng-Grid
    //Edit
    $scope.edit = function (row) {
        $scope.ClearAll();       
        $scope.CWS = angular.copy(row);      
        $scope.buttonText = 'Update';
    }

    //Validation
    function filedVal() {
        toastr.remove();
        $('.bordercolor').css('border-color', '');
        $('.validation').hide();
        $('#spnMobileClearText').hide();

        if ($("#ClassIDId").val() == "") {
            $('#ClassIDId').css('border-color', 'red');
            $('#ClassIDId').focus();           
            toastr.warning("Please Selcet Class !");
            return;
        }
        else if ($("#GroupIDId").val() == "") {
            $('#GroupIDId').css('border-color', 'red');
            $('#GroupIDId').focus();
            toastr.warning("Please Selcet Group !");
            return;
        }
        else if ($("#SubjectIDId").val() == "") {
            $('#SubjectIDId').css('border-color', 'red');
            $('#SubjectIDId').focus();           
            toastr.warning("Please Selcet Subject !");
            return;
        }
        else {
            $('#SubjectIDId').css('border-color', '');
            $('.validation').hide();
            return true;
        }

    }
});
