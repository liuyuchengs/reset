import ag = require("angular");
import IRootScope = require("IRootScope");
import Tool = require("../modules/Tool");
import Ajax = require("../modules/Ajax");
import $ = require("jquery");
function askDoctor($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,$http:ag.IHttpService,ToolService:Tool,AjaxService:Ajax){


    //
    $scope.hasSee = true;
    $scope.content = null;
    $scope.noSelect = true;
    $scope.postData = new FormData();
    $scope.doctorId = null;
    $scope.params = {
        input1:{has:false,url:"",val:"#input1"},
        input2:{has:false,url:"",val:"#input2"},
        input3:{has:false,url:"",val:"#input3"},
        input4:{has:false,url:"",val:"#input4"},
        input5:{has:false,url:"",val:"#input5"},
        input6:{has:false,url:"",val:"#input6"},
    }

    //获取医生id参数
    let getParams = ()=>{
        if($location.search().id){
            $scope.doctorId = $location.search().id;
        }else{
            history.back();
        }
    }
    
    //切换是否医生可见
    $scope.chooseSee = ()=>{
        $scope.hasSee = !$scope.hasSee;
    }

    // 监听input元素选择图片
    let listen = ()=>{
        $("#input1").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input1.has = true;
            $scope.params.input1.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
        $("#input2").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input2.has = true;
            $scope.params.input2.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
        $("#input3").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input3.has = true;
            $scope.params.input3.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
        $("#input4").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input4.has = true;
            $scope.params.input4.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
        $("#input5").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input5.has = true;
            $scope.params.input5.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
        $("#input6").on("change",function(){
            var url = getUrl(this.files[0]);
            $scope.params.input6.has = true;
            $scope.params.input6.url = url;
            $scope.noSelect = false;
            $scope.$apply();
        })
    }

    //获取input元素图片的url，做图片预览
    let getUrl = (obj:any)=>{
        var url:string = null;
        if(URL.createObjectURL(obj)){
            url = URL.createObjectURL(obj);
        }
        return url;
    }


}