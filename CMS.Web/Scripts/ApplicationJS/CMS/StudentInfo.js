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
        var sysDate = $filter('date')(Date.now(), 'dd-MM-yyyy');
        $scope.DOB = sysDate;
        $('#fupEmpImage').val('');
        $('#imgEmpImage').attr('src', '/assets/images/NoPreview.jpg');
        $(".Groupdiv").hide();
        $(".Sectiondiv").hide();
        $scope.SCorrect = 1;
        $scope.GCorrect = 1;

        $scope.ClearAll = function () {
            $scope.Clearspinner();
            $scope.Std = {};
            $scope.DOB = sysDate;
            $('#ReligionId').val('').trigger('change.select2');
            $('#GenderId').val('').trigger('change.select2');
            $('#BloodId').val('').trigger('change.select2');
            $('#ShiftId').val('').trigger('change.select2');
            $('#ClassId').val('').trigger('change.select2');
            $('#GroupId').val('').trigger('change.select2');
            $('#SectionId').val('').trigger('change.select2');
            $('#FPTypeId').val('').trigger('change.select2');
            $('#MPTypeId').val('').trigger('change.select2');
            $('.bordercolor').css('border-color', '');
            $scope.filterOptions.filterText = "";
            $('#divMsg').hide();
            $('.validation').hide();
            $(".Groupdiv").hide();
            $(".Sectiondiv").hide();
            fnGetPagedDataAsync($scope.pagingOptions.pageSize, 1);
            $scope.buttonText = 'Save';
            $('#fupEmpImage').val('');
            $('#imgEmpImage').attr('src', '/assets/images/NoPreview.jpg');
        }



        //Dropdown
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
            //$scope.MProfessionTypes = data;
        });

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
                    var other_data = $('form').serializeArray();
                    $.each(other_data, function (key, input) {
                        data.append(input.name, input.value);
                    });                   
                    data.append("StudentID", 0);
                    data.append("StudentCode", 0);
                    data.append("StudentName", $scope.Std.SName);
                    data.append("DOB", $scope.DOB);
                    data.append("BRN", $scope.Std.BirthRegNo);
                    data.append("ReligionId", $('#ReligionId').val());
                    data.append("GenderID", $('#GenderId').val());
                    data.append("BloodID", $('#BloodId').val());
                    data.append("PresentAddress", $scope.Std.PresentA);
                    data.append("PermanentAddress", $scope.Std.PermanenetA);
                    data.append("StudentMobile", $scope.Std.SMobile || 0);
                    data.append("GuardianMobile", $scope.Std.Gmobile);
                    data.append("CompanyID", 1);
                    data.append("Active", Active);
                    data.append("Remarks", 0);
                    data.append("CreatedBy", $scope.UserID);
                    data.append("CreatedDate", sysDate);
                    data.append("ModifyBy", $scope.UserID);
                    data.append("ModifyDate", sysDate);
                    //academic                   
                    data.append("SAcademicID", 0);
                    data.append("ShiftID", $('#ShiftId').val());
                    data.append("ClassID", $('#ClassId').val());
                    data.append("SectionID", $('#SectionId').val());
                    data.append("GroupID", $('#GroupId').val());
                    data.append("RollNo", $scope.Std.Roll);
                    // data.append("CreatedBy", $scope.UserID);
                    //data.append("CreatedDate", $scope.sysDate);
                    // data.append("ModifyBy", $scope.UserID);
                    // data.append("ModifyDate", $scope.sysDate);
                    data.append("Status", Active);
                    alert($scope.Std.Roll)
                    //parents
                    data.append("FMID", 0);
                    data.append("FatherName", $scope.Std.FName);
                    data.append("FNID", $scope.Std.FNID);
                    data.append("FProfession", $scope.Std.FProfession);
                    data.append("FProfessionType", $('#FPTypeId').val());
                    data.append("FYearlyIncome", 0);
                    data.append("MotherName", 0);
                    data.append("MotherName", $scope.Std.MName);
                    data.append("MNID", $scope.Std.MNID);
                    data.append("MProfession", $scope.Std.MProfession);
                    data.append("MProfessionType", $('#MPTypeId').val());
                    data.append("MYearlyIncome", 0);
                    data.append("MMobile", 0);                  
                    // data.append("CreatedBy", $scope.UserID);
                    // data.append("CreatedDate", $scope.sysDate);
                    // data.append("ModifyBy", $scope.UserID);
                    //data.append("ModifyDate", $scope.sysDate);
                    // data.append("Status", Active);                
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
                        toastr.success(xhr.Result);
                        if (xhr.Result == 'Data Already Exits') {
                            $('#SNameId').css('border-color', 'red');
                            return false;
                        }
                        else
                            $scope.ClearAll();
                    });
                }
                if ($scope.buttonText == 'Update') {
                    var data = new FormData();
                    var other_data = $('form').serializeArray();
                    $.each(other_data, function (key, input) {
                        data.append(input.name, input.value);
                    });
                    data.append("StudentID", 0);
                    data.append("StudentCode", 0);
                    data.append("StudentName", $scope.Std.SName);
                    data.append("DOB", $scope.DOB);
                    data.append("BRN", $scope.Std.BirthRegNo);
                    data.append("ReligionId", $('#ReligionId').val());
                    data.append("GenderID", $('#GenderId').val());
                    data.append("BloodID", $('#BloodId').val());
                    data.append("PresentAddress", $scope.Std.PresentA);
                    data.append("PermanentAddress", $scope.Std.PermanenetA);
                    data.append("StudentMobile", $scope.Std.SMobile || 0);
                    data.append("GuardianMobile", $scope.Std.Gmobile);
                    data.append("CompanyID", 1);
                    data.append("Active", Active);
                    data.append("Remarks", 0);
                    data.append("CreatedBy", $scope.UserID);
                    data.append("CreatedDate", sysDate);
                    data.append("ModifyBy", $scope.UserID);
                    data.append("ModifyDate", sysDate);
                    //academic                   
                    data.append("SAcademicID", 0);
                    data.append("ShiftID", $('#ShiftId').val());
                    data.append("ClassID", $('#ClassId').val());
                    data.append("SectionID", $('#SectionId').val());
                    data.append("GroupID", $('#GroupId').val());
                    data.append("RollNo", $scope.Std.Roll);
                    // data.append("CreatedBy", $scope.UserID);
                    //data.append("CreatedDate", $scope.sysDate);
                    // data.append("ModifyBy", $scope.UserID);
                    // data.append("ModifyDate", $scope.sysDate);
                    data.append("Status", Active);
                    alert($scope.Std.Roll)
                    //parents
                    data.append("FMID", 0);
                    data.append("FatherName", $scope.Std.FName);
                    data.append("FNID", $scope.Std.FNID);
                    data.append("FProfession", $scope.Std.FProfession);
                    data.append("FProfessionType", $('#FPTypeId').val());
                    data.append("FYearlyIncome", 0);
                    data.append("MotherName", 0);
                    data.append("MotherName", $scope.Std.MName);
                    data.append("MNID", $scope.Std.MNID);
                    data.append("MProfession", $scope.Std.MProfession);
                    data.append("MProfessionType", $('#MPTypeId').val());
                    data.append("MYearlyIncome", 0);
                    data.append("MMobile", 0);
                    // data.append("CreatedBy", $scope.UserID);
                    // data.append("CreatedDate", $scope.sysDate);
                    // data.append("ModifyBy", $scope.UserID);
                    //data.append("ModifyDate", $scope.sysDate);
                    // data.append("Status", Active);                
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
                        toastr.success(xhr.Result);
                        if (xhr.Result == 'Data Already Exits') {
                            $('#SNameId').css('border-color', 'red');
                            return false;
                        }
                        else
                            $scope.ClearAll();
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
    // mobile number validation
    $scope.SGetMobile = function () {
        $scope.SCorrect = 1;
        $('#SmobileId').css('border-color', '');
        $('.validation').hide();
        if (($('#SmobileId').val().substring(0, 3) == "013" || $('#SmobileId').val().substring(0, 3) == "014" || $('#SmobileId').val().substring(0, 3) == "015" || $('#SmobileId').val().substring(0, 3) == "016" || $('#SmobileId').val().substring(0, 3) == "017" || $('#SmobileId').val().substring(0, 3) == "018" || $('#SmobileId').val().substring(0, 3) == "019") && $('#SmobileId').val().length == 11) {
            $('#SmobileId').css('border-color', '');
            $('.validation').hide();
            $scope.SCorrect = 2;
        }
        else {
            $('#SmobileId').parent().after("<div class='validation  col-md-8 col-md-offset-4' style='color:red;'>Please Enter Correct mobile number.</div>");
            $('#SmobileId').css('border-color', 'red');
            $('#SmobileId').focus();
            return;
        }
    }
    $scope.GGetMobile = function () {
        $scope.GCorrect = 1;
        $('#GmobileId').css('border-color', '');
        $('.validation').hide();
        if (($('#GmobileId').val().substring(0, 3) == "013" || $('#GmobileId').val().substring(0, 3) == "014" || $('#GmobileId').val().substring(0, 3) == "015" || $('#GmobileId').val().substring(0, 3) == "016" || $('#GmobileId').val().substring(0, 3) == "017" || $('#GmobileId').val().substring(0, 3) == "018" || $('#GmobileId').val().substring(0, 3) == "019") && $('#GmobileId').val().length == 11) {
            $('#GmobileId').css('border-color', '');
            $('.validation').hide();
            $scope.GCorrect = 2;
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
            $("#ReligionId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Religion !");
            return;
        }
        if ($("#GenderId").val() == "") {
            $("#GenderId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Gender !");
            return;
        }
        if ($("#BloodId").val() == "") {
            $("#BloodId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
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
        if ($('#SmobileId').val() != '' && $scope.SCorrect != 2) {
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
        if ($('#GmobileId').val() != '' && $scope.GCorrect != 2) {
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
            $("#MPTypeId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Type !");
            return;
        }
        if ($("#ShiftId").val() == "") {
            $("#ShiftId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Shift !");
            return;
        }
        if ($("#ClassId").val() == "") {
            $("#ClassId").select2('open');
            $(".select2-search__field").css('border-color', 'red');
            toastr.warning("Please Selcet Class !");
            return;
        }
        if ($(".Groupdiv") == 'visible') {
            if ($("#GroupId").val() == "") {
                $("#GroupId").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Please Selcet Group !");
                return;
            }
        }
        else if ($(".Sectiondiv") == 'visible') {
            if ($("#SectionId").val() == "") {
                $("#SectionId").select2('open');
                $(".select2-search__field").css('border-color', 'red');
                toastr.warning("Please Selcet Section !");
                return;
            }
        }
        else if ($('#RollId').val() == '') {
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

    //ng-hide

    $('#ClassId').change(function () {
        $scope.GroupInfo();
        $scope.SectionInfo();
    });

    $scope.GroupInfo = function () {
        if ($("#ClassId").val() > 10) {
            CMSService.GetAll('/api/SetUpInfo/GetAllGroup/' + $("#ClassId").val()).success(function (data) {
                $('#GroupId').val('').trigger('change.select2');
                $scope.Groups = data;
                $(".Groupdiv").show();
            });
        }
        else {
            $('#GroupId').val('').trigger('change.select2');
            $(".Groupdiv").hide();
        }
    }
    $scope.SectionInfo = function () {
        CMSService.GetAll('/api/SetUpInfo/GetAllSection/' + $("#ClassId").val()).success(function (data) {
            if (data != '') {
                $('#SectionId').val('').trigger('change.select2');
                $scope.Sections = data;
                $(".Sectiondiv").show();
            }
            else {
                $('#SectionId').val('').trigger('change.select2');
                $(".Sectiondiv").hide();
            }
        });
    }
});
