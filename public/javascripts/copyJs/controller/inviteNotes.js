define(function(){
    return function($scope,$rootScope,Tool,Ajax){
        //定义样式
        $scope.bgStyle = {
            "width":window.screen.width,
            "height":(window.screen.width/320)*122,
        }
        $scope.bgStyle1 = {
            "width":window.screen.width,
            "height":(window.screen.width/540)*275,
        }
        $scope.bodyStyle = {
            "width":window.screen.width,
            "min-height":window.screen.height-10,
        }
        $scope.noNote = false;
        $scope.notes = [];

        $scope.init = function(){
            $scope.queryNotes();
        }

        $scope.queryNotes = function(){
            Ajax.post({
                url:Tool.host+"/wx/withDraw/myBound",
                params:{
                    accessToken:Tool.getLocal("user").accessToken
                }
            }).then(function(data){
                if(data.code===0){
                    if(data.data.length<1){
                        $scope.noNote = true;
                    }else{
                        $scope.notes = data.data;
                    }
                }else{
                    Tool.alert("获取邀请记录失败，请稍后再试！");
                }
            }).catch(function(){
                Tool.alert("获取邀请记录失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }
    }
})