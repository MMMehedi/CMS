App.controller('StudentInfoCtrl', function ($scope, $filter, CMSService) {
    $('.select2').select2({ allowClear: true })
    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
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
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        var Active = true;
        var sysDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
        $scope.DOB = sysDate;
        $('#fupEmpImage').val('');
        $('#imgEmpImage').attr('src', '/assets/images/NoPreview.jpg');
        $(".Groupdiv").hide();
        $(".Sectiondiv").hide();

        $scope.AddToListDiv = true;
        $scope.SubjectDiv = true;
        $scope.CourseDiv = true;

        $scope.ClearAllDetails = function () {
            $scope.ClassDisable = false;
            $scope.GroupDisable = false;
            $scope.detail.SubjectID = '';
            $scope.detail.ClassID = '';
            $scope.detail.GroupID = '';
            $scope.buttonTextD = 'Add to List';
        }

        $scope.ClearAll = function () {
            $scope.Clearspinner();
            $scope.Std = {};
            $scope.DOB = sysDate;
            //$('.select2').val('').trigger('change.select2');
            $('.bordercolor').css('border-color', '');
            $scope.filterOptions.filterText = "";
            $('#divMsg').hide();
            $('.validation').hide();
            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
            $scope.buttonText = 'Save';
            $('#fupEmpImage').val('');
            $('#imgEmpImage').attr('src', '/assets/images/NoPreview.jpg');
            $('.form-control').val('');

        }



        //Dropdown

        CMSService.GetAll('/api/SetUpInfo/GetAllStudentType/').success(function (data) {
            $scope.Students = data;
        });
        $scope.DivShow = function () {
            if ($scope.Std.StudentTypeID == 2) {
                $scope.SubjectDiv = false;
                $scope.CourseDiv = true;
                $scope.AddToListDiv = false;
            }
            else if ($scope.Std.StudentTypeID == 3) {
                $scope.SubjectDiv = true;
                $scope.CourseDiv = false;
                $scope.AddToListDiv = false;
            }
            else {
                $scope.AddToListDiv = true;
                $scope.SubjectDiv = true;
                $scope.CourseDiv = true;
            }
        }
      
        CMSService.GetAll('/api/SetUpInfo/GetAllClass/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Classs = data;
        });

        CMSService.GetAll('/api/SetUpInfo/GetAllShift/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Shifts = data;
        });

        CMSService.GetAll('/api/SetUpInfo/GetAllReligion/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Religions = data;
        });

        CMSService.GetAll('/api/SetUpInfo/GetAllGender/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.Genders = data;
        });

        CMSService.GetAll('/api/SetUpInfo/GetAllBlood/').success(function (data) {
            $scope.Bloods = data;
        });
        CMSService.GetAll('/api/SetUpInfo/ProfessionType/' + localStorage.getItem('CompanyID')).success(function (data) {
            $scope.ProfessionTypes = data;
        });

        //$scope.GetSubject = function () {
        //    CMSService.GetAll('/api/SetUpInfo/GetAllSubjectClassWise/' + $scope.Std.ClassID + '/' + $scope.Std.GroupID).success(function (data) {
        //        $scope.Subjects = data;
        //    });
        //}
       
        $scope.ClassSection = function () {
            CMSService.GetAll('/api/SetUpInfo/GetAllGroupByClass/' + $scope.Std.ClassID).success(function (data) {
                $scope.Groups = data;
            });
            CMSService.GetAll('/api/SetUpInfo/GetAllSectionByClass/' + $scope.Std.ClassID).success(function (data) {
                $scope.Sections = data;
            });
        };

         $scope.GetSubjectCourse = function () {
             CMSService.GetAll('/api/SetUpInfo/GetAllSubjectClassWise/' + $scope.Std.ClassID + '/' + $scope.Std.GroupID).success(function (data) {
                $scope.Subjects = data;
            });
             CMSService.GetAll('/api/SetUpInfo/GetAllCourseClassWise/' + $scope.Std.ClassID + '/' + $scope.Std.GroupID).success(function (data) {
                $scope.Courses = data;
            });
        }
        //Add list
        //$scope.obGrid.length = 0;
        $scope.obGrid = [];
        $scope.buttonTextD = "Add to List";
        $scope.SaveDetails = function (obGrid, detail) {
            if ($scope.SubjectDiv == false)
            {
                // if (fnValDet() == true) {
                var vCount = 0; vMaxtDid = 0;
                for (i in $scope.obGrid) {                  
                    //if ($scope.obGrid[i].GroupID != detail.GroupID) {
                    //    toastr.remove();
                    //    toastr.warning("Group Name Must Be Same")
                    //    //vCount = 1;
                    //    return;
                    //}
                    if ($scope.obGrid[i].SubjectID == detail.SubjectID) {
                        toastr.remove();
                        toastr.warning("Subject Name  Already Exist")
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
                            //ClassID: detail.ClassID,
                            //GroupID: detail.GroupID,
                            SubjectID: detail.SubjectID,
                            SubjectName: $scope.Subjects[$scope.detail.SubjectID - 1].SubjectName, //detail.SubjectName,
                            //ClassName: $scope.Classs[$scope.detail.ClassID - 1].ClassName, //detail.ClassName,
                            //GroupName: detail.GroupName,
                        });
                        $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                        //$scope.ClearAllDetails();                       
                        $scope.ClassDisable = true;
                        $scope.GroupDisable = true;

                    }
                }
                if ($scope.buttonTextD == "Update") {
                    $scope.obGrid[detail.ID - 1] = angular.copy(detail);
                    $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                    Gtotal += total;
                    $scope.detail.Total = Gtotal;
                    $scope.Editdisabled = false;
                    $scope.ClearAllDetails();
                }
                // }
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
                    { field: 'SubjectID', displayName: 'Class', visible: true },
                    { field: 'GroupName', displayName: 'Group', visible: true },
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
                function fnValDet() {
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
                    if ($("#SubjectIDId").val() == "") {
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
            }
           

                if ($scope.CourseDiv == false) {
                    // if (fnValDet() == true) {
                    var vCount = 0; vMaxtDid = 0;
                    for (i in $scope.obGrid) {
                        //if ($scope.obGrid[i].ClassID != detail.ClassID) {
                        //    toastr.remove();
                        //    toastr.warning("Class Name Must Be Same")
                        //    // vCount = 1;
                        //    return;
                        //}
                        //if ($scope.obGrid[i].GroupID != detail.GroupID) {
                        //    toastr.remove();
                        //    toastr.warning("Group Name Must Be Same")
                        //    //vCount = 1;
                        //    return;
                        //}
                        if ($scope.obGrid[i].CourseID == detail.CourseID) {
                            toastr.remove();
                            toastr.warning("Course Name Must Already Exist")
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
                                //ClassID: detail.ClassID,
                                //GroupID: detail.GroupID,
                                CourseID: detail.CourseID,
                                CourseName: $scope.Courses[$scope.detail.CourseID - 1].CourseName, //detail.CourseName,
                                //ClassName: $scope.Classs[$scope.detail.ClassID - 1].ClassName, //detail.ClassName,
                                //GroupName: detail.GroupName,
                            });
                            $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                            //$scope.ClearAllDetails();                       
                            $scope.ClassDisable = true;
                            $scope.GroupDisable = true;

                        }
                    }
                    if ($scope.buttonTextD == "Update") {
                        $scope.obGrid[detail.ID - 1] = angular.copy(detail);
                        $scope.getItemPagedDataAsync($scope.pagingItemOptions.pageSize, 1);
                        Gtotal += total;
                        $scope.detail.Total = Gtotal;
                        $scope.Editdisabled = false;
                        $scope.ClearAllDetails();
                    }
                    // }

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
                        { field: 'SubjectID', displayName: 'Class', visible: true },
                        { field: 'GroupName', displayName: 'Group', visible: true },
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
                    function fnValDet() {
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
                        if ($("#SubjectIDId").val() == "") {
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
                }
        }
        
        //End of Add List 




        $("#fupEmpImage").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgEmpImage').attr('src', e.target.result);
                }
                reader.readAsDataURL(this.files[0]);
            }
        });


        $scope.Std = {};
        $scope.buttonText = 'Save';
        $scope.Save = function (Std) {
            if (filedVal() == true) {
                $scope.SaveDisabled = true;
                $scope.msgspinner = false;
                $scope.msgloading = false;
                $scope.msgSave = true;
                if ($scope.buttonText == 'Save') {
                    var data = new FormData();
                    //var other_data = $('form').serializeArray();
                    //$.each(other_data, function (key, input) {
                    //    data.append(input.name, input.value);
                    //});
                    data.append("StudentID", 0);
                    data.append("StudentCode", 0);
                    data.append("StudentName", $scope.Std.StudentName);
                    data.append("DOB", $filter('date')($scope.DOB, 'dd-MM-yyyy'));
                    data.append("BRN", $scope.Std.BRN);
                    data.append("ReligionId", $scope.Std.ReligionId);
                    data.append("GenderID", $scope.Std.GenderID);
                    data.append("BloodID", $scope.Std.BloodID);
                    data.append("PresentAddress", $scope.Std.PresentAddress);
                    data.append("PermanentAddress", $scope.Std.PermanentAddress);
                    data.append("StudentMobile", $scope.Std.StudentMobile || 0);
                    data.append("GuardianMobile", $scope.Std.GuardianMobile);

                    //academic                   
                    data.append("SAcademicID", 0);
                    data.append("ShiftID", $scope.Std.ShiftID);
                    data.append("ClassID", $scope.Std.ClassID);
                    data.append("SectionID", $scope.Std.SectionID);
                    data.append("GroupID", $scope.Std.GroupID);
                    data.append("RollNo", $scope.Std.RollNo);


                    //parents
                    data.append("FMID", 0);
                    data.append("FatherName", $scope.Std.FatherName);
                    data.append("FNID", $scope.Std.FNID);
                    data.append("FProfession", $scope.Std.FProfession);
                    data.append("FProfessionType", $scope.Std.FProfessionType);
                    data.append("FYearlyIncome", 0);
                    data.append("FMobile", 0);
                    data.append("MotherName", $scope.Std.MotherName);
                    data.append("MNID", $scope.Std.MNID);
                    data.append("MProfession", $scope.Std.MProfession);
                    data.append("MProfessionType", $scope.Std.MProfessionType);
                    data.append("MYearlyIncome", 0);
                    data.append("MMobile", 0);

                    // common
                    data.append("Remarks", "");
                    data.append("CompanyID", 1);
                    data.append("Status", Active);
                    data.append("CreatedBy", $scope.UserID);
                    data.append("CreatedDate", $filter('date')(sysDate, 'dd-MM-yyyy'));
                    data.append("ModifyBy", $scope.UserID);
                    data.append("ModifyDate", $filter('date')(sysDate, 'dd-MM-yyyy'));
                    //// Add the uploaded image content to the form data collection
                    var files = $("#fupEmpImage").get(0).files;
                    if (files.length > 0) {
                        data.append("UploadedImage", files[0]);
                    }
                    //Make Ajax request with the contentType = false, and procesDate = false
                    var ajaxRequest = $.ajax({
                        type: "POST",
                        url: "/api/StudentInfo/StudentImage",
                        contentType: false,
                        processData: false,
                        data: data
                    });
                    ajaxRequest.done(function (xhr, textStatus) {
                        //toastr.success(xhr.Result);
                        if (xhr.Result == 'Data Already Exits') {
                            $('#SNameId').css('border-color', 'red');
                            return false;
                        }
                        else {
                            toastr.remove();
                            toastr.success(xhr);
                            $scope.ClearAll();
                        }

                    });
                }
                if ($scope.buttonText == 'Update') {
                    var data = new FormData();
                    var other_data = $('form').serializeArray();
                    $.each(other_data, function (key, input) {
                        data.append(input.name, input.value);
                    });
                    data.append("StudentID", $scope.Std.StudentID);
                    data.append("StudentCode", $scope.Std.StudentCode);
                    data.append("StudentName", $scope.Std.StudentName);
                    data.append("DOB", $filter('date')($scope.DOB, 'dd-MM-yyyy'));
                    data.append("BRN", $scope.Std.BRN);
                    data.append("ReligionId", $scope.Std.ReligionId);
                    data.append("GenderID", $scope.Std.GenderID);
                    data.append("BloodID", $scope.Std.BloodID);
                    data.append("PresentAddress", $scope.Std.PresentAddress);
                    data.append("PermanentAddress", $scope.Std.PermanentAddress);
                    data.append("StudentMobile", $scope.Std.StudentMobile);
                    data.append("GuardianMobile", $scope.Std.GuardianMobile);
                    data.append("CompanyID", 1);
                    data.append("Remarks", 0);
                    //academic                   
                    data.append("SAcademicID", $scope.Std.SAcademicID);
                    data.append("ShiftID", $scope.Std.ShiftID);
                    data.append("ClassID", $scope.Std.ClassID);
                    data.append("SectionID", $scope.Std.SectionID);
                    data.append("GroupID", $scope.Std.GroupID);
                    data.append("RollNo", $scope.Std.RollNo);


                    //parents
                    data.append("FMID", $scope.Std.FMID);
                    data.append("FatherName", $scope.Std.FatherName);
                    data.append("FNID", $scope.Std.FNID);
                    data.append("FProfession", $scope.Std.FProfession);
                    data.append("FProfessionType", $scope.Std.FProfessionType);
                    data.append("FYearlyIncome", 0);
                    data.append("FMobile", 0);
                    data.append("MotherName", $scope.Std.MotherName);
                    data.append("MNID", $scope.Std.MNID);
                    data.append("MProfession", $scope.Std.MProfession);
                    data.append("MProfessionType", $scope.Std.MProfessionType);
                    data.append("MYearlyIncome", 0);
                    data.append("MMobile", 0);
                    //comon
                    data.append("Status", Active);
                    data.append("CreatedBy", $scope.Std.CreatedBy);
                    data.append("CreatedDate", $scope.Std.CreatedDate);
                    data.append("ModifyBy", $scope.UserID);
                    data.append("ModifyDate", $filter('date')(sysDate, 'dd-MM-yyyy'));
                    var files = $("#fupEmpImage").get(0).files;
                    if (files.length > 0) {
                        data.append("UploadedImage", files[0]);
                    }
                    //Make Ajax request with the contentType = false, and procesDate = false
                    var ajaxRequest = $.ajax({
                        type: "POST",
                        url: "/api/StudentInfo/StudentImage",
                        contentType: false,
                        processData: false,
                        data: data
                    });
                    ajaxRequest.done(function (xhr, textStatus) {
                        //toastr.success(xhr.Result);
                        if (xhr.Result == 'Data Already Exits') {
                            $('#SNameId').css('border-color', 'red');
                            return false;
                        }
                        else {
                            toastr.remove();
                            toastr.success(xhr);
                            $scope.ClearAll();
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
                CMSService.GetAll('/api/StudentInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
                CMSService.GetAll('/api/StudentInfo/GetAll/' + localStorage.getItem('CompanyID')).success(function (largeLoad) {
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
        { field: 'StudentID', displayName: 'StudentID', visible: false },
        { field: 'Edit', width: 70, sortable: false, cellTemplate: '<button  ng-hide="edithide" ng-click=edit(row.entity)><i class="fa fa-pencil-square-o grid-edit-icon"></i></button>' },
        { field: 'StudentCode', displayName: 'Student Code', visible: true },
        { field: 'StudentName', displayName: 'StudentName', visible: true },
        { field: 'ShiftName', displayName: 'Shift Name', visible: true },
        { field: 'ClassName', displayName: 'Class Name', visible: true },
        { field: 'RollNo', displayName: 'Roll', width: 100, visible: true },
        ]
    };

    //End of ng-Grid
    //Edit
    $scope.Std = {};
    $scope.edit = function (row) {
        $scope.ClearAll();
        $scope.Std = angular.copy(row);
        $scope.ClassSection();
        $('#imgEmpImage').attr('src', '/CMS/GetWebsiteImage/?StudentID=' + row.StudentID);
        $scope.DOB = angular.copy(row.DOB);
        $scope.buttonText = 'Update';
    }

    //Validation
    // mobile number validation
    $scope.SGetMobile = function () {
        $('#SmobileId').css('border-color', '');
        $('.validation').hide();
        if (($('#SmobileId').val().substring(0, 3) == "013" || $('#SmobileId').val().substring(0, 3) == "014" || $('#SmobileId').val().substring(0, 3) == "015" || $('#SmobileId').val().substring(0, 3) == "016" || $('#SmobileId').val().substring(0, 3) == "017" || $('#SmobileId').val().substring(0, 3) == "018" || $('#SmobileId').val().substring(0, 3) == "019") && $('#SmobileId').val().length == 11) {
            $('#SmobileId').css('border-color', '');
            $('.validation').hide();
        }
        else {
            $('#SmobileId').parent().after("<div class='validation  col-md-8 col-md-offset-4' style='color:red;'>Please Enter Correct mobile number.</div>");
            $('#SmobileId').css('border-color', 'red');
            $('#SmobileId').focus();
            return;
        }
    }
    $scope.GGetMobile = function () {
        $('#GmobileId').css('border-color', '');
        $('.validation').hide();
        if (($('#GmobileId').val().substring(0, 3) == "013" || $('#GmobileId').val().substring(0, 3) == "014" || $('#GmobileId').val().substring(0, 3) == "015" || $('#GmobileId').val().substring(0, 3) == "016" || $('#GmobileId').val().substring(0, 3) == "017" || $('#GmobileId').val().substring(0, 3) == "018" || $('#GmobileId').val().substring(0, 3) == "019") && $('#GmobileId').val().length == 11) {
            $('#GmobileId').css('border-color', '');
            $('.validation').hide();
        }
        else {
            $('#GmobileId').parent().after("<div class='validation  col-md-8 col-md-offset-4' style='color:red;'>Please Enter Correct mobile number.</div>");
            $('#GmobileId').css('border-color', 'red');
            $('#GmobileId').focus();
            return;
        }
    }


    //filedval
    function filedVal() {
        $('.bordercolor').css('border-color', '');
        $('.validation').hide();
        $('#spnMobileClearText').hide();
        toastr.remove();


        if ($("#SNameId").val() == '') {
            $('#SNameId').css('border-color', 'red');
            $('#SNameId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($("#idDateOfBirth").val() == "") {
            $('#idDateOfBirth').css('border-color', 'red');
            $('#idDateOfBirth').focus();
            toastr.warning("Please Selcet Date !");
            return;
        }
        if ($('#BirthRegNoId').val() == '') {
            $('#BirthRegNoId').css('border-color', 'red');
            $('#BirthRegNoId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($("#ReligionId").val() == "") {
            $('#ReligionId').css('border-color', 'red');
            $('#ReligionId').focus();
            toastr.warning("Please Selcet Religion !");
            return;
        }
        if ($("#GenderId").val() == "") {
            $('#GenderId').css('border-color', 'red');
            $('#GenderId').focus();
            toastr.warning("Please Selcet Gender !");
            return;
        }
        if ($("#BloodId").val() == "") {
            $('#BloodId').css('border-color', 'red');
            $('#BloodId').focus();
            toastr.warning("Please Selcet Blood Group !");
            return;
        }
        if ($('#PresentAId').val() == '') {
            $('#PresentAId').css('border-color', 'red');
            $('#PresentAId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#PermanenetAId').val() == '') {
            $('#PermanenetAId').css('border-color', 'red');
            $('#PermanenetAId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#SmobileId').val() != '' && $('#SmobileId').val().length != 11) {
            $('#SmobileId').css('border-color', 'red');
            $('#SmobileId').focus();
            toastr.warning("Please Enter Valid Number!");
            return;
        }
        if ($('#GmobileId').val() == '') {
            $('#GmobileId').css('border-color', 'red');
            $('#GmobileId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#GmobileId').val() != '' && $('#GmobileId').val().length != 11) {
            $('#GmobileId').css('border-color', 'red');
            $('#GmobileId').focus();
            toastr.warning("Please Enter Valid Number!");
            return;
        }
        if ($('#fupEmpImage').val() == '') {
            $("#fupEmpImage").parent().after("<div class='validation  col-md-8 col-md-offset-1' style='color:red;'>This field is required.</div>");
            $('#fupEmpImage').css('border-color', 'red');
            $('#fupEmpImage').focus();
        }
        if ($('#FNameId').val() == '') {
            $('#FNameId').css('border-color', 'red');
            $('#FNameId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#FNID').val() == '') {
            $('#FNID').css('border-color', 'red');
            $('#FNID').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#FProfessionId').val() == '') {
            $('#FProfessionId').css('border-color', 'red');
            $('#FProfessionId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($("#FPTypeId").val() == "") {
            $("#FPTypeId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Profession Type !");
            return;
        }
        if ($('#MNameId').val() == '') {
            $('#MNameId').css('border-color', 'red');
            $('#MNameId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#MNIDId').val() == '') {
            $('#MNIDId').css('border-color', 'red');
            $('#MNIDId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($('#MProfessionId').val() == '') {
            $('#MProfessionId').css('border-color', 'red');
            $('#MProfessionId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        if ($("#MPTypeId").val() == "") {
            $('#MPTypeId').css('border-color', 'red');
            $('#MPTypeId').focus();
            toastr.warning("Please Selcet Type !");
            return;
        }
        if ($("#ShiftId").val() == "") {
            $('#ShiftId').css('border-color', 'red');
            $('#ShiftId').focus();
            toastr.warning("Please Selcet Shift !");
            return;
        }
        if ($("#ClassId").val() == "") {
            $('#ClassId').css('border-color', 'red');
            $('#ClassId').focus();
            toastr.warning("Please Selcet Class !");
            return;
        }
        if ($("#GroupId").val() == "") {
            $('#GroupId').css('border-color', 'red');
            $('#GroupId').focus();
            toastr.warning("Please Selcet Group !");
            return;
        }
        if ($("#SectionId").val() == "") {
            $('#SectionId').css('border-color', 'red');
            $('#SectionId').focus();
            toastr.warning("Please Selcet Section !");
            return;
        }
        if ($('#RollId').val() == '') {
            $('#RollId').css('border-color', 'red');
            $('#RollId').focus();
            toastr.warning("Can't be empty !");
            return;
        }
        else {
            $('#RollId').css('border-color', '');
            $('.validation').hide();
            return true;
        }

    }


    // ng-change        
   


    $('.Number').bind('keypress', function (e) {
        if (e.which != 46 && e.which != 8 && (e.which < 48 || e.which > 57)) {
            return (false);
        }
        if (e.which == 46 && this.value.indexOf(".") != -1) {
            return (false);   // only one decimal allowed
        }
    });

    //$scope.SectionInfo = function () {
    //    CMSService.GetAll('/api/SetUpInfo/GetAllSection/' + $("#ClassId").val()).success(function (data) {
    //        if (data != '') {
    //            $('#SectionId').val('').trigger('change.select2');
    //            $scope.Sections = data;
    //            $(".Sectiondiv").show();
    //        }
    //        else {
    //            $('#SectionId').val('').trigger('change.select2');
    //            $(".Sectiondiv").hide();
    //        }
    //    });
    //}






    ////ng-hide
    //// edit button  group and section

    //$scope.EditGroup = function (GroupId) {
    //    $('#GroupId').val('').trigger('change.select2');
    //    CMSService.GetAll('/api/SetUpInfo/GetSelectedGroup/' + GroupId).success(function (data) {
    //        if (data[0].GroupID > 10) {
    //            $('#GroupId').val(angular.copy(data[0].GroupID));
    //            $('#GroupId').select2().trigger('change.select2');
    //            $(".Groupdiv").show();
    //        }
    //        else {
    //            $('#GroupId').val('').trigger('change.select2');
    //            $(".Groupdiv").hide();
    //        }
    //    });

    //}
    //$scope.EditSection = function (SectionId) {
    //    $('#SectionId').val('').trigger('change.select2');
    //    if (SectionId != '') {
    //        CMSService.GetAll('/api/SetUpInfo/GetSelectedSection/' + SectionId).success(function (data) {
    //            $('#SectionId').val(angular.copy(data[0].SectionID));
    //            $('#SectionId').select2().trigger('change.select2');
    //            $(".Sectiondiv").show();
    //        });
    //    }
    //    else {
    //        $('#SectionId').val('').trigger('change.select2');
    //        $(".Sectiondiv").hide();
    //    }
    //}


});
