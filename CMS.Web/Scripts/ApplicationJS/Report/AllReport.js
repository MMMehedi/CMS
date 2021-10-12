App.controller('AllReportCtrl', function ($scope, CMSService) {

    if (localStorage.getItem('UserID') === null) {
        window.location = '../Home/Index';
    }
    else {
        //CMSService.GetAll('/api/SuitInfo/GetAll').success(function (data) {
        //    $scope.SuitNo = data;
        //});
        //CMSService.GetAll('/api/OrderOpposition/GetAll/' + "01710527492" + '/' + 1).success(function (data) {
        //    $scope.OrderNumber = data;
        //});
        //$scope.OrNo = function () {
        //    CMSService.GetAll('/api/OrderInfo/GetOrderIDBySuitNo/' + $scope.rpt.SuitNo.SuitNo).success(function (data) {
        //        $scope.OrderNumber = data;
        //    });
        //}

        $scope.checked = true;
        $scope.btnradio = 2;
        $scope.Preview = function () {
            if (filedVal() == true) {
                if ($scope.btnradio == 2) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/SuitRegisterReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 3) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/OrderReport/' + $scope.rpt.SuitNo.SuitNo + '=' + $scope.rpt.OrderNum.OrdID);
                }
                else if ($scope.btnradio == 4) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/OrderOppositionReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 5) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/OrderWitnessReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 6) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/NominationGuidelinesReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 7) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/MemberNominationFormReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 8) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/MemberAttendanceRequestLetterReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 9) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/CompromiseReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 10) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/SuitPresentReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 11) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/SuitAttendanceSlipReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 12) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/DecreeorOrderFormReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 14) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/FeeFineReeiptReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 17) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/DecreeorOrderFormReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 20) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/FineCompensationReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 21) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/SendingCaseToJudicialCourtReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 22) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/FineReeiptReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 23) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/ApplicationReport/' + $scope.rpt.SuitNo.AppID);
                }
                else if ($scope.btnradio == 24) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/MemberNominationFormReportOpposition/' + $scope.rpt.SuitNo.SuitNo);
                }
                else if ($scope.btnradio == 25) {
                    window.open(window.location.protocol + '//' + window.location.host + '/AllReport/NominationGuidelinesOppositionReport/' + $scope.rpt.SuitNo.SuitNo);
                }
                else {
                    alert("Please select radio button")
                    return;
                }
            }
        }

        $scope.ClearAll = function () {
            $scope.rpt = {};
            $('#SuitNos').hide();
            $('#OrderNum').hide();
            $('.validation').hide();
            $scope.checked = true;
            $scope.btnradio = 2;
        }
        $scope.Common = function () {
            if ($scope.btnradio == 3) {
                $('#OrderNoHideShow').show();
            } else
                $('#OrderNoHideShow').hide();
            $scope.rpt = {};
            $('#SuitNos').hide();
            $('#OrderNum').hide();
            $('.validation').hide();
        }


        $scope.rpt = {};
        $('#SuitNos').hide();
        $('#OrderNoHideShow').hide();
        $('#OrderNum').hide();
        function filedVal() {
            $('#SuitNos').hide();
            $('#OrderNum').hide();
            $('#SuitNos').css('border-color', '');
            $('.validation').hide();

            if ($scope.btnradio == 2 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 3 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 3 && $scope.rpt.OrderNum == undefined || $scope.rpt.OrderNum == "") {
                $scope.MsgOrderNum = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#OrderNum').show();
                return false;
            }
            else if ($scope.btnradio == 4 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 5 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 6 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 7 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 8 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 9 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 10 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 11 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 12 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 14 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 17 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 20 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 21 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else if ($scope.btnradio == 25 && $scope.rpt.SuitNo == undefined || $scope.rpt.SuitNo == "") {
                $scope.MsgSuitNo = "ঘরটি অবশ্যই পূরণ করতে হবে ।";
                $('#SuitNos').show();
                return false;
            }
            else {
                $('#SuitNos').css('border-color', '');
                $('.validation').hide();
                return true;
            }
        }



    }
});
