
//Controller
App.controller('WelcomeCtrl', function (CMSService, $scope) {
    if (localStorage.getItem("LsUserName") === null) {
        window.location = CMSService.MainWebUrlPrefix + "/Home/Index";
    } else {

        /* if my var reload isn't set locally.. in the first time it will be true */
        if (!localStorage.getItem("reload")) {
            /* set reload locally and then reload the page */
            localStorage.setItem("reload", "true");
            location.reload();
        }
            /* after reload clear the localStorage */
        else {
            localStorage.removeItem("reload");
            // localStorage.clear(); // an option
        }

        CMSService.Save("/api/Menu/GetSessionValue/", localStorage.getItem('LsUserName')).success(function (result) {

            localStorage.setItem('lsUserSession', JSON.stringify(result));

            $('#spUserCode').text(result.userCode);
            $('#spUserName').text(result.userName);
            $('#spBranchName').text(result.branchName);
            $('#spRoutingNo').text(result.routingNo);
            if (result.transactionDate.match('T')) {
                $('#spTrandate').text(result.transactionDate.split('T')[0]);
                localStorage.setItem("spTrandate", result.transactionDate.split('T')[0]);
            }
            localStorage.setItem("spUserCode", result.userCode);
            localStorage.setItem("spUserName", result.userName);
            localStorage.setItem("spBranchName", result.branchName);
            localStorage.setItem("spRoutingNo", result.routingNo);
        });
        CMSService.GetAll('/api/OwnBranch/GetAll').success(function (data) {
            $scope.ownBranchs = data;
            localStorage.setItem('lsBranchSession', JSON.stringify(data));
        });     

    }

});
//End of Controller