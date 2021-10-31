App.controller('UserPermissionCtrl', function ($scope, CMSService) {

    $('.select2').select2({ allowClear: true })
    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
        CMSService.GetAll('/api/UserInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.UserInfo = data;
        });

        $('#UserID').change(function () {
            $scope.Email = "";
            CMSService.GetAll('/api/UserInfo/GetByUserID/' + $("#UserID").val()).success(function (data) {
                $scope.Email = angular.copy(data[0].Email) + ', ' + angular.copy(data[0].Mobile);
            });
        });

        CMSService.GetAll('/api/Menu/GetRootMenu').success(function (data) {
            $scope.Menu = data;
        });

        $scope.ClearAll = function () {
            $('#UserID').val('').trigger('change.select2');
            $('#MenuID').val('').trigger('change.select2');
            $scope.Email = "";
            $scope.checker.checked = "";
            $scope.myData.length = 0;
        }

        //Start Save
        $scope.buttonText = 'Save';
        $scope.Save = function (myData) {
            if (filedVal() == true) {
                var lstEntity = [];
                var chkRootMenu;
                for (var i = 0; i < myData.length; i++) {
                    if (myData[i].UserPer == true) {
                        chkRootMenu = true;
                        break;
                    } else
                        chkRootMenu = false;
                }

                for (var i = 0; i < myData.length; i++) {
                    var entity = {
                        PerID: myData[i].PerID,
                        UserID: $("#UserID").val(),
                        MenuCode: myData[i].MenuCode,
                        UserPer: myData[i].UserPer,
                        PerDate: new Date(),
                        chkRootMenu: chkRootMenu
                    }
                    //console.log(entity);
                    lstEntity.push(entity);
                }
                CMSService.Save('/api/Menu/Add/', lstEntity).success(function (data) {
                    CMSService.Save('/api/Menu/Update/', lstEntity);
                    toastr.success(data);
                    $scope.checker.checked = "";
                    $scope.myData.length = 0;
                });
            }
        }
        //End of Save

        //Start ng-Grid
        $scope.filterOptions = {
            finterText: "",
            useExternalFinter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [10, 15, 20],
            pageSize: 100,
            currentPage: 1
        };
        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.checker = {};
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            $('#MenuID').change(function () {
                CMSService.GetAll('/api/Menu/GetChildMenuByParentIDUserID/' + $("#MenuID").val() + '/' + $("#UserID").val()).success(function (data) {
                    $scope.setPagingData(data, page, pageSize);
                    $scope.checker.checked = true;
                    for (var i = 0; i < data.length; i++) {
                        var check = 1;
                        if ($scope.myData[i].UserPer == false && check == 1) {
                            $scope.checker.checked = "";
                            check = 0;
                        }
                    }
                });
            })
            $('#UserID').change(function () {
                CMSService.GetAll('/api/Menu/GetChildMenuByParentIDUserID/' + $("#MenuID").val() + '/' + $("#UserID").val()).success(function (data) {
                    $scope.setPagingData(data, page, pageSize);
                    $scope.checker.checked = true;
                    for (var i = 0; i < data.length; i++) {
                        var check = 1;
                        if ($scope.myData[i].UserPer == false && check == 1) {
                            $scope.checker.checked = "";
                            check = 0;
                        }
                    }
                });
            })
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal != oldVal && newVal.currentPage != oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.PartyItemsgridOption = {
            data: 'myData',
            enablePaging: true,
            showFooter: false,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
            enableCellSelection: true,
            selectedIems: $scope.selectedRow,
            multiSelect: false,
            columnDefs: [
                        { field: 'MenuText', displayName: 'Menu Name', enableCellEdit: true, width: 310 },
                        { field: 'MenuID', displayName: 'Menu ID', enableCellEdit: true, visible: false },
                        { field: 'MenuCode', displayName: 'Menu Code', enableCellEdit: true, width: 100, visible: false },
                        { field: 'ParentID', displayName: 'Parent ID', enableCellEdit: true, width: 100, visible: false },
                        { field: 'URL', displayName: 'URL', enableCellEdit: true, width: 100, visible: false },
                        { field: 'MenuOrder', displayName: 'Menu Order', enableCellEdit: true, width: 100, visible: false },
                        {
                            field: 'UserPer', displayName: 'Select', enableCellEdit: false, width: 80,
                            headerCellTemplate: "<div class=\"ngHeaderSortColumn {{col.headerClass}}\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"> \
                    <div ng-click=\"col.sort($event)\" ng-class=\"'colt' + col.index\" class=\"ngHeaderText\"> \
                        {{col.displayName}} \&nbsp\
                        <input type=\"checkbox\"style=\"margin-top:4px\" ng-model=\"checker.checked\" ng-change=\"toggleCheckerAll(checker.checked);\"> \
                    </div> \
                </div>",
                            cellTemplate: "<div class=\"ngCellText\" ng-class=\"col.colIndex()\"> \
                    <input type=\"checkbox\"style=\"margin-left:29px;margin-top:3px\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-change=\"toggleChecker(COL_FIELD)\"> \
                </div>"
                        },
            ]
        };
        //End ng-Grid

        $scope.toggleCheckerAll = function (checked) {
            for (var i = 0; i < $scope.myData.length; i++) {
                $scope.myData[i].UserPer = checked;
            }
        };

        $scope.toggleChecker = function (checked) {
            //for (var i = 0; i < $scope.myData.length; i++) {
            //    var check = 1;
            //    if ($scope.myData[i].UserPer == false && check == 1) {
            //        $scope.checker.checked = "";
            //        check = 0;
            //    }
            //    //else
            //    //    $scope.checker.checked = true;
            //}
              var rows = $scope.gridOptions.$gridScope.renderedRows,
                allChecked = true;

            for (var r = 0; r < rows.length; r++) {
                if (rows[r].entity.UserPer !== true) {
                    allChecked = false;
                    break;
                }
            }
            if (!$scope.gridOptions.$gridScope.UserPer)
                $scope.gridOptions.$gridScope.UserPer = {};
            $scope.gridOptions.$gridScope.UserPer.checked = allChecked;


          
        };

        function filedVal() {
            if ($("#UserID").val() == "") {
                $("#UserID").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Can't be empty !");
                return;
            }
            else if ($("#MenuID").val() == "") {
                $("#MenuID").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Can't be empty !");
                return;
            }
            return true;
        }

    }
});
