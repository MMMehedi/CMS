App.controller('CourseSetUpCtrl', function ($scope, $filter, CMSService) {
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
        $scope.SubjectDiv = true;
        $scope.CourseDiv = true;
        $scope.Clearspinner = function () {
            $scope.msgspinner = true;
            $scope.SaveDisabled = false;
            $scope.msgloading = true;
            $scope.msgSave = false;
        }

        $scope.ClearAllDetails = function () {
            $scope.detail.SubjectID = '';
            $scope.detail.ClassID = '';
            $scope.detail.GroupID = '';
            $scope.buttonTextD = 'Add to List';
        }
        $scope.ClearAll = function () {
            $scope.Clearspinner();
            $scope.Fee = {};
            $scope.obGrid.length = 0;
            $scope.myData2.length = 0;
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

        CMSService.GetAll('/api/SetUpInfo/GetAllSubject/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Subjects = data;
        });

        CMSService.GetAll('/api/SetUpInfo/GetAllStudentType/').success(function (data) {
            $scope.Students = data;
        });

        $scope.Group = function () {
            CMSService.GetAll('/api/SetUpInfo/GetAllGroupForFee/' + $scope.detail.ClassID).success(function (data) {
                $scope.Groups = data;
            });
        }
        //alert($scope.Groups[$scope.detail.GroupID - 1].GroupName)
        //alert($scope.Classs[$scope.detail.ClassID - 1].ClassName)

        //$scope.SubjectName = function () {
        //    //alert($scope.detail.SubjectID)
        //   // console.log($scope.Subjects[m=>m.SubjectID == $scope.detail.SubjectID].SubjectName);
        //    alert($scope.Subjects[$scope.detail.SubjectID-1].SubjectName)

        //    CMSService.GetAll('/api/SetUpInfo/GetSubjectName/' + $scope.detail.SubjectID).success(function (data) {
        //        $scope.detail.SubjectName = data[0].SubjectName;
        //    });
        //}
        //$scope.ClassName = function () {
        //    alert($scope.Classs[$scope.detail.ClassID-1].ClassName)
        //    CMSService.GetAll('/api/SetUpInfo/GetClassName/' + $scope.detail.ClassID).success(function (data) {
        //        $scope.detail.ClassName = data[0].ClassName;
        //    });
        //}
        $scope.GroupName = function () {
            CMSService.GetAll('/api/SetUpInfo/GetGroupName/' + $scope.detail.GroupID).success(function (data) {
                $scope.detail.GroupName = data[0].GroupName;
            });
        }

        //add to list
        //$scope.obGrid.length = 0;
        $scope.obGrid = [];
        $scope.buttonTextD = "Add to List";
        $scope.SaveDetails = function (obGrid, detail) {
            // if (fnValDet() == true) {          
            var vCount = 0; vMaxtDid = 0;
            for (i in $scope.obGrid) {
                if ($scope.obGrid[i].SubjectID == detail.SubjectID) {
                    vCount = 1;
                }
            }
            for (i in $scope.obGrid) {
                if (vMaxtDid < $scope.obGrid[i].ID) {
                    vMaxtDid = $scope.obGrid[i].ID;
                }
            }
            if ($scope.buttonTextD == "Add to List") {
                if (vCount == 0) {
                    $scope.obGrid.push({
                        ID: $scope.obGrid.length + 1,
                        SubjectID: detail.SubjectID,
                        ClassID: detail.ClassID,
                        GroupID: detail.GroupID,
                        SubjectName: $scope.Subjects[$scope.detail.SubjectID - 1].SubjectName, //detail.SubjectName,
                        ClassName: $scope.Classs[$scope.detail.ClassID - 1].ClassName, //detail.ClassName,
                        GroupName: detail.GroupName,
                    });
                    $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                    $scope.ClearAllDetails();
                }
            }
            if ($scope.buttonTextD == "Update") {
                //for (i in $scope.obGrid) {
                //    if (vMaxtDid < $scope.obGrid[i].ID) {
                //        vMaxtDid = $scope.obGrid[i].ID;
                //    }
                //}
                $scope.obGrid[detail.ID - 1] = angular.copy(detail);
                $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                Gtotal += total;
                $scope.detail.Total = Gtotal;
                $scope.Editdisabled = false;
                $scope.ClearAllDetails();
            }
            //}
        }
        //End of Save 
        //Item ng-Grid
        $scope.filterItemOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems2 = 0;
        $scope.pagingItemOptions = {
            pageSizes: [10, 15, 20],
            pageSize: 10,
            currentPage: 1
        };
        $scope.setItemPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData2 = pagedData;
            $scope.totalServerItems2 = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getItemPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                $scope.setItemPagingData($scope.obGrid, page, pageSize);
            }, 100);
        };

        $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, $scope.pagingItemOptions.currentPage);

        $scope.$watch('pagingItemOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, $scope.pagingItemOptions.currentPage, $scope.filterItemOptions.filterText);
            }
        }, true);
        $scope.$watch('filterItemOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, $scope.pagingItemOptions.currentPage, $scope.filterItemOptions.filterText);
            }
        }, true);

        $scope.PartyItemsgridOptions = {
            data: 'myData2',
            enablePaging: true,
            showFooter: false,
            totalServerItems2: 'totalServerItems2',
            pagingItemOptions: $scope.pagingItemOptions,
            filterItemOptions: $scope.filterItemOptions,
            enableCellSelection: true,
            selectedItems: $scope.selectedRow,
            multiSelect: false,
            columnDefs: [
            { field: 'ID', displayName: 'ID', width: 156, visible: false },
            { field: 'Edit', width: 40, cellTemplate: '<button  ng-hide="edithide" ng-click=editItem(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
            { field: 'Delete', width: 65, cellTemplate: '<button  ng-hide="deletehide" ng-click=deleteItem(row.entity)><i class="fa fa-pencil-square-o grid-delete-icon"></i></button>' },
            { field: 'SubjectID', displayName: 'Class', width: 100, visible: false },
            { field: 'ClassID', displayName: 'Group', width: 100, visible: false },
            { field: 'GroupID', displayName: 'Subject', width: 100, visible: false },
            { field: 'ClassName', displayName: 'Class', width: 200, visible: true },
            { field: 'GroupName', displayName: 'Group', width: 200, visible: true },
            { field: 'SubjectName', displayName: 'Subject', width: 200, visible: true },
            //{ field: 'total', displayName: 'Duration', width: 90, visible: true },
            ]
        };
        $scope.editItem = function (row) {
            $scope.detail = angular.copy(row);
            Gtotal = Gtotal - row.total;
            $scope.detail.Total = Gtotal;
            $scope.Editdisabled = true;
            $scope.buttonTextD = "Update";
        }
        $scope.deleteItem = function (row) {
            var retValue = confirm('Do you want to delete this record?');
            if (retValue == true) {
                var index = -1;
                for (var i = 0; i < $scope.obGrid.length; i++) {
                    if ($scope.obGrid[i].Inv_ProductID === row.Inv_ProductID) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    alert("Something gone wrong");
                }
                $scope.obGrid.splice(index, 1);
                $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                $scope.detail.Total = ' ';
                Gtotal = Gtotal - row.total;
                $scope.detail.Total = Gtotal;
            }
        }

        $scope.Fee = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (entity) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                if ($scope.buttonText == 'Save') {
                    entity.TutionFeeID = 0;
                    entity.StudentTypeID = $scope.Fee.StudentTypeID;
                    entity.ClassID = $scope.Fee.ClassID;
                    entity.GroupID = $scope.Fee.GroupID;
                    entity.SubjectID = $scope.Fee.SubjectID || "";
                    entity.CourseID = $scope.Fee.CourseID || "";
                    entity.TutionFee = $scope.Fee.TutionFee;
                    entity.CompanyID = 1;
                    entity.CreatedBy = $scope.UserID;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = true;
                    //entity.CreateDate = $scope.Today;
                    //entity.ModifyDate = $scope.Today;
                    CMSService.Save('/api/TutionFeeSetUpInfo/Add/', entity).success(function (data) {
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
                    entity.TutionFeeID = $scope.Fee.TutionFeeID;
                    entity.StudentTypeID = $scope.Fee.StudentTypeID;
                    entity.ClassID = $scope.Fee.ClassID;
                    entity.GroupID = $scope.Fee.GroupID;
                    entity.SubjectID = $scope.Fee.SubjectID;
                    entity.CourseID = $scope.Fee.CourseID;
                    entity.TutionFee = $scope.Fee.TutionFee;
                    entity.CompanyID = 1;
                    entity.CreatedBy = $scope.Fee.CreatedBy;
                    entity.CreatedDate = $scope.Fee.CreatedDate;
                    entity.ModifyBy = $scope.UserID;
                    entity.Status = $scope.Fee.Status;
                    CMSService.Save('/api/TutionFeeSetUpInfo/Update/', entity).success(function (data) {
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
                CMSService.GetAll('/api/TutionFeeSetUpInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
                CMSService.GetAll('/api/TutionFeeSetUpInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
        { field: 'TutionFeeID', displayName: 'ClassSubjectID', visible: false },
        { field: 'Edit', width: 70, sortable: false, cellTemplate: '<button  ng-hide="edithide" ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
        { field: 'StudentTypeName', displayName: 'Student Type', visible: true },
        { field: 'ClassName', displayName: 'Class', visible: true },
        { field: 'GroupName', displayName: 'Group', visible: true },
        { field: 'SubjectName', displayName: 'Subject', visible: false },
        { field: 'CourseName', displayName: 'Course', visible: false },
        { field: 'TutionFee', displayName: 'Fee', visible: true },
        ]
    };
    //End of ng-Grid
    //Edit
    $scope.edit = function (row) {
        $scope.ClearAll();
        $scope.Fee = angular.copy(row);
        $scope.Group();
        $scope.buttonText = 'Update';
    }

    //Validation
    function filedVal() {
        toastr.remove();
        $('.bordercolor').css('border-color', '');
        $('.validation').hide();
        $('#spnMobileClearText').hide();

        if ($("#StudentTypeIDId").val() == "") {
            $('#StudentTypeIDId').css('border-color', 'red');
            $('#StudentTypeIDId').focus();
            toastr.warning("Please Selcet Student Type !");
            return;
        }
        else if ($("#ClassIDId").val() == "") {
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
        else if ($scope.SubjectDiv == false) {
            if ($("#SubjectIDId").val() == "") {
                $('#SubjectIDId').css('border-color', 'red');
                $('#SubjectIDId').focus();
                toastr.warning("Please Selcet Subject !");
                return;
            }
            return;
        }
        else if ($scope.CourseDiv == false) {
            if ($("#CourseIDId").val() == "") {
                $('#CourseIDId').css('border-color', 'red');
                $('#CourseIDId').focus();
                toastr.warning("Please Selcet Course !");
                return;
            }
            return;
        }
        else if ($("#TutionFeeId").val() == "") {
            $('#TutionFeeId').css('border-color', 'red');
            $('#TutionFeeId').focus();
            toastr.warning("Can Not Be Empty !");
            return;
        }
        else {
            $('#TutionFeeId').css('border-color', '');
            $('.validation').hide();
            return true;
        }

    }
});
