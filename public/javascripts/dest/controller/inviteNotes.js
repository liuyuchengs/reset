define(["require", "exports"], function (require, exports) {
    "use strict";
    function inviteNotes($scope, $rootScope, ToolService, AjaxService) {
        //定义样式
        $scope.bgStyle = {
            "width": window.screen.width,
            "height": (window.screen.width / 320) * 122,
        };
        $scope.bgStyle1 = {
            "width": window.screen.width,
            "height": (window.screen.width / 540) * 275,
        };
        $scope.bodyStyle = {
            "width": window.screen.width,
            "min-height": window.screen.height - 10,
        };
        $scope.noNote = false;
        $scope.notes = [];
        let queryNotes = () => {
            AjaxService.post({
                url: ToolService.host + "/wx/withDraw/myBound",
                data: {
                    accessToken: ToolService.getLocal("user").accessToken
                }
            }).then((data) => {
                if (data.code === 0) {
                    if (data.data.length < 1) {
                        $scope.noNote = true;
                    }
                    else {
                        $scope.notes = data.data;
                    }
                }
                else {
                    ToolService.alert("获取邀请记录失败，请稍后再试！");
                }
            });
        };
        queryNotes();
    }
    return inviteNotes;
});
//# sourceMappingURL=inviteNotes.js.map