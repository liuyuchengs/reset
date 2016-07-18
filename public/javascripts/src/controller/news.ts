import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
import Swiper = require("Swiper");

function news($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax){
    $scope.news = [];
    $scope.navValue = "综合";
    $scope.currentPage = 1;
    $scope.pageRows = 10;
    $scope.imgStyle = {
        "width":screen.width
    }
    $scope.navParams = [
        {has:true,val:"综合"},
        {has:false,val:"牙科"},
        {has:false,val:"美容"},
        {has:false,val:"妇产科"},
        {has:false,val:"中医理疗"},
    ]

    // 初始化图片轮播插件
    let initSwiper = ()=>{
        var myswiper = new Swiper(".swiper-container",{
            loop: false,
            pagination: '.swiper-pagination',
            autoplay: 5000,
            autoplayDisableOnInteraction:false,
            observeParents:true,
            observer:true,
        })
    }

    // 切换导航栏
    $scope.switch = function(index:number,obj:any[]){
        ToolService.select(index,obj);
        $scope.news = [];
        $scope.navValue = obj[index].val;
        $scope.currentPage = 1;
        $rootScope.followTip.has = false;
        loadNews();
    }

    // 查询数据
    let loadNews = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/health/queryByType",
            data:{type:$scope.navValue,currentPage:$scope.currentPage,pageRows:$scope.pageRows},
        }).then(function(data){
            if(data.code==0){
                if(data.data.length<1){
                    if($scope.news.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty;
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = false;
                }else{
                    $scope.news = $scope.news.concat(data.data);
                }
            }else{
                ToolService.alert(data.message);
            }
        })
    }

    // 跳转到详细页面
    $scope.toDetail = (id:any)=>{
        ToolService.changeRoute("/news/detail","id="+id);
    }

    //初始化页面
    ToolService.reset();
    initSwiper();
    loadNews();
    ToolService.onWindowListen(()=>{
        $scope.currentPage++;
        loadNews();
    })
}

export = news;