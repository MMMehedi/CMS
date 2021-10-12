App.controller('SectionInfoCtrl', function ($scope, $filter, CMSService) {


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
            $scope.SectionInfo = {};
            $('#ClassId').val('').trigger('change.select2');
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
        $scope.SectionInfo = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (entity) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                if ($scope.buttonText == 'Save') {
                    entity.SectionID = 0;
                    entity.SectionName = $scope.SectionInfo.Section;
                    entity.ClassID = $("#ClassId").val();
                    entity.CompanyID = 1;
                    entity.CreateBy = $scope.UserID;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = SectionInfo.Active;
                    //entity.CreateDate = $scope.Today;
                    //entity.ModifyDate = $scope.Today;
                    CMSService.Save('/api/SectionInfo/Add/', entity).success(function (data) {
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
                    
                    entity.SectionID = $scope.SectionID;
                    entity.SectionName = $scope.SectionInfo.Section;
                    entity.ClassID = $("#ClassId").val();
                    entity.CompanyID = $scope.CompanyId;
                    entity.CreateBy = $scope.CreatedBy;
                    entity.CreateDate = $scope.CreateDate;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = $scope.SectionInfo.Active;                   
                    CMSService.Save('/api/SectionInfo/Update/', entity).success(function (data) {
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
                CMSService.GetAll('/api/SectionInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
                CMSService.GetAll('/api/SectionInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
        { field: 'SectionID', displayName: 'SectionID', visible: false },
        { field: 'Edit', width: 70, sortable: false, cellTemplate: '<button  ng-hide="edithide" ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
        { field: 'ClassID', displayName: 'ClassID', visible: false },
        { field: 'ClassName', displayName: 'Class', visible: true },
        { field: 'SectionName', displayName: 'SectionName', visible: true },
        { field: 'Status', displayName: 'Status', width: 100, visible: false },      
        ]
    };
    //End of ng-Grid
    //Edit
    $scope.edit = function (row) {
        $scope.ClearAll();
        //$scope.Desig = angular.copy(row);
        //Active = angular.copy(row.Active);
        $scope.SectionID = angular.copy(row.SectionID);
        $scope.SectionInfo.Section = angular.copy(row.SectionName);
        $('#ClassId').val(angular.copy(row.ClassID));
        $('#ClassId').select2().trigger('change.select2');
        $scope.CompanyId = angular.copy(row.CompanyID);
        $scope.CreatedBy = angular.copy(row.CreateBy);
        $scope.CreateDate = angular.copy(row.CreateDate);
        $scope.SectionInfo.Active = angular.copy(row.Status);
        $scope.buttonText = 'Update';
    }

    //Validation
    function filedVal() {
        $('.bordercolor').css('border-color', '');
        $('.validation').hide();
        $('#spnMobileClearText').hide();

        if ($("#ClassId").val() == "") {
            $("#ClassId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Class !");
            return;
        }
        else if ($('#SectionId').val() == '') {
            $('#SectionId').css('border-color', 'red');
            $('#SectionId').focus();
            toastr.warning("Can't be empty !");
        }
        else {
            $('#ClassId').css('border-color', '');
            $('.validation').hide();
            return true;
        }

    }
});
