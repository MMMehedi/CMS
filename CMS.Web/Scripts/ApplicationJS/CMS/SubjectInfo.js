App.controller('SubjectInfoCtrl', function ($scope, $filter, CMSService) {


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
            $scope.Sub = {};          
            $('.bordercolor').css('border-color', '');
            $scope.filterOptions.filterText = "";
            $('#divMsg').hide();
            $('.validation').hide();
            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
            $scope.buttonText = 'Save';
        }



        //Dropdown
      
        $scope.Sub = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (entity) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                if ($scope.buttonText == 'Save') {
                    entity.SubjectID = 0;
                    entity.SubjectCode = $scope.Sub.SubjectCode;
                    entity.SubjectName = $scope.Sub.SubjectName;
                    entity.CompanyID = 1;
                    entity.CreatedBy = $scope.UserID;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = $scope.Sub.Status;                   
                    CMSService.Save('/api/SubjectInfo/Add/', entity).success(function (data) {
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
                if ($scope.buttonText == 'Update') {                    
                    entity.SubjectID = $scope.Sub.SubjectID;
                    entity.SubjectCode = $scope.Sub.SubjectCode;
                    entity.SubjectName = $scope.Sub.SubjectName;
                    entity.CompanyID = 1;
                    entity.CreatedBy = $scope.Sub.CreatedBy;
                    entity.CreatedDate = $scope.Sub.CreatedDate;
                    entity.Status = $scope.Sub.Status;
                    CMSService.Save('/api/SubjectInfo/Update/', entity).success(function (data) {
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
                CMSService.GetAll('/api/SubjectInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
                CMSService.GetAll('/api/SubjectInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
        { field: 'SubjectID', displayName: 'SubjectID', visible: false },
        { field: 'Edit', width: 70, sortable: false, cellTemplate: '<button  ng-hide="edithide" ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
        { field: 'SubjectCode', displayName: 'Subject Code', visible: true },
        { field: 'SubjectName', displayName: 'Subject Name', visible: true },
        ]
    };
    //End of ng-Grid
    //Edit
    $scope.edit = function (row) {
        $scope.ClearAll();       
        $scope.Sub = angular.copy(row);       
        $scope.buttonText = 'Update';
    }

    //Validation
    function filedVal() {
        $('.bordercolor').css('border-color', '');
        $('.validation').hide();
        $('#spnMobileClearText').hide();

        if ($("#SubjectCodeId").val() == "") {
            $('#SectionId').css('border-color', 'red');
            $('#SectionId').focus();
            toastr.warning("Please Wrrite Subject Code !");
            return;
        }
        else if ($('#SubjectNameId').val() == '') {
            $('#SubjectNameId').css('border-color', 'red');
            $('#SubjectNameId').focus();
            toastr.warning("Can't be empty !");
        }
        else {
            $('#SubjectNameId').css('border-color', '');
            $('.validation').hide();
            return true;
        }

    }
});
