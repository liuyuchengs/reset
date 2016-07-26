/// <reference path="./../../../typings/index.d.ts" />
/**
 * 项目说明：
 * 1.所有angular依赖注入均为推断注入，压缩js时需防止变量名修改
 * 2.为减少http访问次数，尽量合并代码，减少文件数量
 */
import Data = require("Data");
import IRootScope = require("IRootScope");
import ag = require("angular");
import Swiper = require("Swiper");
import wx = require("WX");
import Tool = require("./modules/Tool");
import Ajax = require("./modules/Ajax");
import Weixin = require("./modules/Weixin");
let host:string = "http://192.168.0.104:3000";
var app = ag.module("myApp",['ngRoute']);

/**
 * 配置
 * 程序启动前配置$rootScope
 */
app.run(($rootScope:IRootScope.rootScope,$location:ag.ILocationService,$http:ag.IHttpService)=>{
    //设置默认的ajax headers
    $http.defaults.headers.post = {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"};
    // 导航栏参数
    $rootScope.navMenu = {
        home:false,
        doctor:false,
        interaction:false,
        user:false,
        has:false
    }

    // 加载提示框变量
    $rootScope.load = {
        has:false,
        src:"../../contents/img/loading.gif",
        val:"加载中...",
    }

    // 消息提示框变量
    $rootScope.messageTip = {
        has:false,
        message:"",
        hasCancel:false,
        hasComfirm:false,
        comfirm:null,
        cancel:null,
    }

    // 瀑布流提示文本
    $rootScope.followTip = {
        has:false,
        val:"",
        empty:"暂无信息",
        no:"已经没有了",
    }

    //全局属性变量
    $rootScope.globalProp = {
        hasBgColor:false,
        hasBlackBg:false,
    }

    //改变导航栏样式
    $rootScope.switchNavMenu = (item:string)=>{
        if(item==="/home"){
            if(!$rootScope.navMenu.home){
                $rootScope.navMenu.home = true;
                $rootScope.navMenu.doctor = false;
                $rootScope.navMenu.interaction = false;
                $rootScope.navMenu.user = false;
                $rootScope.navMenu.has = true;
            }
        }else if(item==="/doctor"){
            if(!$rootScope.navMenu.doctor){
                $rootScope.navMenu.doctor = true;
                $rootScope.navMenu.home = false;
                $rootScope.navMenu.interaction = false;
                $rootScope.navMenu.user = false;
                $rootScope.navMenu.has = true;
            }
        }else if(item==="/interaction"){
            if(!$rootScope.navMenu.interaction){
                $rootScope.navMenu.interaction = true;
                $rootScope.navMenu.home = false;
                $rootScope.navMenu.doctor = false;
                $rootScope.navMenu.user = false;
                $rootScope.navMenu.has = true;
            }
        }else if(item==="/user"){
            if(!$rootScope.navMenu.user){
                $rootScope.navMenu.user = true;
                $rootScope.navMenu.home = false;
                $rootScope.navMenu.doctor = false;
                $rootScope.navMenu.interaction = false;
                $rootScope.navMenu.has = true;
            }
        }else{
            $rootScope.navMenu.home = false;
            $rootScope.navMenu.doctor = false;
            $rootScope.navMenu.interaction = false;
            $rootScope.navMenu.user = false;
            $rootScope.navMenu.has =false;
        }
    }

    //路由改变时触发
    $rootScope.$on("$routeChangeStart",()=>{
        $rootScope.load.has = true;
        var path = $location.path();
        $rootScope.switchNavMenu(path);
    })

    //路由改变完成后触发
    $rootScope.$on("$routeChangeSuccess",()=>{
        $rootScope.load.has = false;
    })

    //导航栏菜单处理事件
    $rootScope.menuClick = (path:string)=>{
        $location.path(path);
    }

    //html中改变路由
    $rootScope.changeRoute = (path:string,query?:string)=>{
        $location.path(path);
        if(query){
            $location.search(query);
        }else{
            $location.search(""); //重置参数部分
        }
    }

})

/**
 * 路由
 * 1.主要的四个控制器直接包含在app.js中,无需再require注入
 * 2.其余的控制器通过require动态加载后注入
 */
app.config(($routeProvider:ag.route.IRouteProvider,$controllerProvider:ag.IControllerProvider)=>{
    $routeProvider.when("/home",{
        templateUrl:"home.html",
        controller:"homeCtrl",
    }).when("/doctor",{
        templateUrl:"doctor.html",
        controller:"doctorCtrl",
    }).when("/interaction",{
        templateUrl:"interaction.html",
        controller:"interactionCtrl",
    }).when("/user",{
        templateUrl:"user.html",
        controller:"userCtrl",
    }).when("/doctor/detail",{
        templateUrl:"doctordetail.html",
        controller:"doctorDetailCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/doctorDetail.js",
            name:"doctorDetailCtrl",
        },$controllerProvider)
    }).when("/doctor/askDoctor",{
        templateUrl:"askdoctor.html",
        controller:"askDoctorCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/askDoctor.js",
            name:"askDoctorCtrl",
        },$controllerProvider)
    }).when("/interaction/detail",{
        templateUrl:"interactiondetail.html",
        controller:"interactionDetailCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/interactionDetail.js",
            name:"interactionDetailCtrl",
        },$controllerProvider)
    }).when("/user/userinfo",{
        templateUrl:"userinfo.html",
        controller:"userInfoCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/userinfo.js",
            name:"userInfoCtrl",
        },$controllerProvider)
    }).when("/user/cush",{
        templateUrl:"cush.html",
        controller:"cushCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/cush.js",
            name:"cushCtrl",
        },$controllerProvider)
    }).when("/user/cush/read",{
        templateUrl:"cushreadme.html",
        controller:"cushCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/cush.js",
            name:"cushCtrl",
        },$controllerProvider)
    }).when("/user/cushover",{
        templateUrl:"cushover.html",
        controller:"cushOverCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/cushOver.js",
            name:"cushOverCtrl",
        },$controllerProvider)
    }).when("/user/userinfochange",{
        templateUrl:"userinfochange.html",
        controller:"userInfoChangeCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/userInfoChange.js",
            name:"userInfoChangeCtrl",
        },$controllerProvider)
    }).when("/user/order",{
        templateUrl:"order.html",
        controller:"userOrderCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/order.js",
            name:"userOrderCtrl",
        },$controllerProvider)
    }).when("/activity",{
        templateUrl:"activity.html",
        controller:"activityCtrl",
        resolve:Tool.loadCtrl({
            url:"../../../javascripts/dest/controller/activity.js",
            name:"activityCtrl",
        },$controllerProvider)
    }).when("/product/detail",{
        templateUrl:"productdetail.html",
        controller:"productDetailCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/productDetail.js",
            name:"productDetailCtrl",
        },$controllerProvider)
    }).when("/product",{
        templateUrl:"product.html",
        controller:"productCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/product.js",
            name:"productCtrl",
        },$controllerProvider)
    }).when("/exam/detail",{
        templateUrl:"examdetail.html",
        controller:"examDetailCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/examDetail.js",
            name:"examDetailCtrl",
        },$controllerProvider)
    }).when("/discount",{
        templateUrl:"discount.html",
        controller:"discountCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/discount.js",
            name:"discountCtrl",
        },$controllerProvider)
    }).when("/findpwd/phone",{
        templateUrl:"findpwdphone.html",
        controller:"findPassCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/findPass.js",
            name:"findPassCtrl",
        },$controllerProvider)
    }).when("/findpwd/code",{
        templateUrl:"findpwdcode.html",
        controller:"findPassCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/findPass.js",
            name:"findPassCtrl",
        },$controllerProvider)
    }).when("/findpwd/pwd",{
        templateUrl:"findpwdpwd.html",
        controller:"findPassCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/findPass.js",
            name:"findPassCtrl",
        },$controllerProvider)
    }).when("/grab",{
        templateUrl:"grab.html",
        controller:"grabCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/grab.js",
            name:"grabCtrl",
        },$controllerProvider)
    }).when("/grab/code",{
        templateUrl:"grabcode.html",
        controller:"grabCodeCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/grabCode.js",
            name:"grabCodeCtrl",
        },$controllerProvider)
    }).when("/grab/order",{
        templateUrl:"graborder.html",
        controller:"grabOrderCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/grabOrder.js",
            name:"grabOrderCtrl",
        },$controllerProvider)
    }).when("/login",{
        templateUrl:"login.html",
        controller:"loginCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/login.js",
            name:"loginCtrl",
        },$controllerProvider)
    }).when("/makeorder",{
        templateUrl:"makeorder.html",
        controller:"makeOrderCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/makeorder.js",
            name:"makeOrderCtrl",
        },$controllerProvider)
    }).when("/news",{
        templateUrl:"news.html",
        controller:"newsCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/news.js",
            name:"newsCtrl",
        },$controllerProvider)
    }).when("/news/detail",{
        templateUrl:"newsdetail.html",
        controller:"newsDetailCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/newsDetail.js",
            name:"newsDetailCtrl",
        },$controllerProvider)
    }).when("/order",{
        templateUrl:"order.html",
        controller:"orderCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/order.js",
            name:"orderCtrl",
        },$controllerProvider)
    }).when("/pay",{
        templateUrl:"pay.html",
        controller:"payCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/pay.js",
            name:"payCtrl",
        },$controllerProvider)
    }).when("/pay/result",{
        templateUrl:"payresult.html",
        controller:"payResultCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/payResult.js",
            name:"payResultCtrl",
        },$controllerProvider)
    }).when("/register",{
        templateUrl:"register.html",
        controller:"registerCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/register.js",
            name:"registerCtrl",
        },$controllerProvider)
    }).when("/agreement",{
        templateUrl:"agreement.html",
    }).when("/write",{
        templateUrl:"write.html",
        controller:"writeCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/write.js",
            name:"writeCtrl",
        },$controllerProvider)
    }).when("/write/say",{
        templateUrl:"writesay.html",
        controller:"writeCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/write.js",
            name:"writeCtrl",
        },$controllerProvider)
    }).when("/write/note",{
        templateUrl:"writenote.html",
        controller:"writeCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/write.js",
            name:"writeCtrl",
        },$controllerProvider)
    }).when("/user/mypost",{
        templateUrl:"mypost.html",
        controller:"myPostCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/myPost.js",
            name:"myPostCtrl",
        },$controllerProvider)
    }).when("/user/mymessage",{
        templateUrl:"mymessage.html",
        controller:"myMessageCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/myMessage.js",
            name:"myMessageCtrl",
        },$controllerProvider)
    }).when("/user/myfollow",{
        templateUrl:"myfollow.html",
        controller:"myFollowCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/myFollow.js",
            name:"myFollowCtrl",
        },$controllerProvider)
    }).when("/exam",{
        templateUrl:"exam.html",
        controller:"examCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/exam.js",
            name:"examCtrl",
        },$controllerProvider)
    }).when("/invite/new",{
        templateUrl:"invitenew.html",
        controller:"inviteCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/invite.js",
            name:"inviteCtrl",
        },$controllerProvider)
    }).when("/invite/register",{
        templateUrl:"inviteregister.html",
        controller:"inviteCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/invite.js",
            name:"inviteCtrl",
        },$controllerProvider)
    }).when("/invite/notes",{
        templateUrl:"invitenotes.html",
        controller:"inviteNotesCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/inviteNotes.js",
            name:"inviteNotesCtrl",
        },$controllerProvider)
    }).when("/user/paymoney",{
        templateUrl:"paymoney.html",
        controller:"payMoneyCtrl",
        resolve:Tool.loadCtrl({
            url:"../../javascripts/dest/controller/payMoney.js",
            name:"payMoneyCtrl",
        },$controllerProvider)
    })
    .otherwise({redirectTo:"/home"})
})

/**
 * 服务
 * 各种小工具
 */
app.factory("ToolService",($rootScope:IRootScope.rootScope,$location:ag.ILocationService)=>{
    return new Tool($rootScope,$location,host)
})

/**
 * 服务
 * ajax数据访问
 * get:get方式异步数据
 * post:post方式异步数据
 */
app.factory("AjaxService",($rootScope:IRootScope.rootScope,$http:ag.IHttpService,$q:ag.IQService,ToolService:Tool)=>{
    return new Ajax($rootScope,$http,$q,ToolService);
})

/**
 * 服务
 * 与微信jsapi交互
 */
app.factory("WeixinService",($rootScope:IRootScope.rootScope,AjaxService:Ajax,ToolService:Tool)=>{
    return new Weixin($rootScope,AjaxService,ToolService,wx);
})

/**
 * 指令
 * 图片加载后，使用 设置的图片
 */
app.directive("fallbackSrc",()=>{
    return {
        restrict:"A",
        link:(scope:ag.IScope,iElement:ag.IRootElementService,iAttr:ag.IAttributes)=>{
            iElement.bind("error",()=>{
                iElement.attr("src",iAttr["fallbackSrc"]);
            })
        },
    }
})

/**
 * 指令
 * 项目图片加载失败后，使用默认图片
 * like:<img product-error>
 */
app.directive("productError",()=>{
    return {
        restrict:"A",
        link:($scope:ag.IScope,iElement:ag.IRootElementService,iAttr:ag.IAttributes)=>{
            iElement.bind("error",()=>{
                iElement.attr("src","../contents/img/p_default.png");
            })
        },
    }
})

/**
 * 指令
 * 医生图像加载失败后，使用默认图片
 * like:<img doctor-error='男'/>
 */
app.directive("doctorError",()=>{
    return {
        restrict:"A",
        link:($scope:ag.IScope,iElement:ag.IRootElementService,iAttr:ag.IAttributes)=>{
            iElement.bind("error",()=>{
                iElement.attr("src","../contents/img/doc-head.png");
            })
        }
    }
})

/**
 * 指令
 * 用户头像加载失败后，使用默认图片
 * like:<img user-error="女">
 */
app.directive("userError",()=>{
    return {
        restrict:"A",
        link:($scope:ag.IScope,iElement:ag.IRootElementService,iAttr:ag.IAttributes)=>{
            iElement.bind("error",()=>{
                var imgUrl = "../contents/img/men-head.png";
                if(iAttr["userError"]){
                    if(iAttr["userError"]==="女"){
                        imgUrl = "../contents/img/women-head.png"
                    }
                }
                iElement.attr("src",imgUrl);
            })
        }
    }
})

/**
 * 指令
 * 自适应宽度的正方形图片
 * like:<img zoom-image>
 */
app.directive("zoomImage",()=>{
    return {
        restrict:"A",
        link:($scope:ag.IScope,iElement:ag.IRootElementService,iAttr:ag.IAttributes)=>{
            let containSize = parseInt(iElement.css("width").slice(0,-2));
            iElement.css("height",containSize);
            let children = iElement.children();
            children.bind("load",()=>{
                let width = parseInt(children.css("width").slice(0,-2));
                let height = parseInt(children.css("height").slice(0,-2));
                if(width>height){
                    var zWidth = (containSize/height)*width;
                    var zHeight = containSize;
                    children.css("marginLeft",-(zWidth-containSize)/2);
                }else{
                    var zHeight = (containSize/width)*height;
                    var zWidth = containSize;
                    children.css("marginTop",-(zHeight-containSize)/2);
                }
                children.css("width",zWidth);
                children.css("height",zHeight);
            })
        }
    }
})

/**
 * 过滤器
 * 图片路径为空时，设置默认的头像
 * sex:使用不同性别的头像
 */
app.filter("defaultHeadImg",()=>{
    return (input:string,sex:string)=>{
        if(input===null||input===""||input===undefined){
            if(sex==="女"){
                input = "../contents/img/women-head.png";
            }else{
                input = "../contents/img/men-head.png";
            }
        }
        return input;
    }
})


/**
 * 过滤器
 * 图片路径为空时，设置默认图片
 * type:根据不同的类别使用不同的图片,doc->医生,pro->项目
 */
app.filter("defaultImg",()=>{
    return (input:string,type:string)=>{
        if(input===null||input===""||input===undefined){
            if(type==="doc"){
                input = "../contents/img/doc-head.png";
            }
            if(type==="pro"){
                input = "../contents/img/p_default.png"
            }
        }
        return input;
    }
})

/**
 * home控制器
 */
app.controller("homeCtrl",($scope:any,$rootScope:IRootScope.rootScope,$http:ag.IHttpService,ToolService:Tool,AjaxService:Ajax,WeixinService:Weixin)=>{
    //初始化$scope
    $scope.locationInfo = "深圳市";
    $scope.items = [];
    $scope.banners = [];
    $scope.imgStyle = {
        "width":screen.width
    }

    //逆地址服务，现暂不使用
    $scope.getLocation = (latitude:string,longitude:string)=>{
        let key = "LFQBZ-7UNCX-VDR44-T34PN-OX2VQ-M2BNI";
        let url = "https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&callback=JSON_CALLBACK&location="+latitude+","+longitude+"&key="+key;
        $http.jsonp(url).success((data:any)=>{
            if(data.status==0){
                $scope.locationInfo = data.result.address_component.city;
                var locationInfo = ToolService.getSession("locationInfo");
                locationInfo.city = data.result.address_component.city;
                ToolService.setSession("locationInfo",locationInfo);
            }else{
                $scope.locationInfo = "定位失败";
            }
        }).error(()=>{
            $scope.locationInfo = "定位失败";
        })
    }

    let queryParams = {
        city:"深圳",
        currentPage:1,
    }

    //查询热门推荐
    let loadRecommend = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/product/queryrecommend",
            data:queryParams,
        }).then((data)=>{
            if(data.code===0){
                if(data.data.length<1){
                    if($scope.items.length<1){
                        $rootScope.followTip.val = $rootScope.followTip.empty
                    }else{
                        $rootScope.followTip.val = $rootScope.followTip.no;
                    }
                    $rootScope.followTip.has = true;
                }else{
                    mergeProduct(data.data);
                    $scope.items = $scope.items.concat(data.data);
                }
            }
        })
    }

    // 获取图片轮播
    let queryBanners = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/banner/query",
            data:{"type":"home_banner"},
        }).then((data)=>{
            if(data.code==0){
                $scope.banners = data.data;
            }
        })
    }

    // 分页查询，查询下一页
    let loadNext = ()=>{
        queryParams.currentPage++;
        loadRecommend();
    }

    // 初始化图片轮播插件
    let initSwiper = ()=>{
        var myswiper = new Swiper(".swiper-container",{
            loop:false,
            pagination: '.swiper-pagination',
            autoplay: 2000,
            autoplayDisableOnInteraction:false,
            observeParents:true,  //
            observer:true,
            //第一张轮播图显示6s,其他的2s
            onSlideChangeEnd: (swiper:any)=>{
                if(swiper.activeIndex==0||swiper.activeIndex==1){
                    swiper.stopAutoplay();
                    setTimeout(function(){
                        if(swiper.activeIndex==0||swiper.activeIndex==1){
                            swiper.startAutoplay();
                        }
                    },4000)
                }else{
                    swiper.startAutoplay();
                }
            }
        })
    }

    // 处理热门数据
    let mergeProduct = (items:any)=>{
        items.forEach(function(item:any){
            if(item.priceunit!=null&&item.priceunit!=""){
                item.preferPriceType = item.pricetype+"/"+item.priceunit;
            }else{
                item.preferPriceType = item.pricetype;
            }
        })
    }

    //跳转到详细页面
    $scope.detail = (productId:string,hospitalId:string,type:number)=>{
        if(type===5){
            ToolService.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId);
        }else{
            ToolService.changeRoute("/product/detail","flag=1&productId="+productId+"&hospitalId="+hospitalId);
        }
    }

    //图片轮播跳转
    $scope.activity = (id:number)=>{
        if(id===1){
            ToolService.changeRoute("/activity","flag=2");
        }
        if(id===2){
            ToolService.changeRoute("/invite/new");
        }
        if(id===3){
            ToolService.changeRoute("/activity","flag=1");
        }
    }

    //初始化$rootScope
    $rootScope.followTip.has = false;
    $rootScope.followTip.val = "";
    $rootScope.globalProp.hasBgColor = false;

    //初始化页面
    ToolService.reset();
    loadRecommend();
    queryBanners();
    initSwiper();
    ToolService.onWindowListen(loadNext)
    if(!ToolService.getSession("locationInfo")||!ToolService.getSession("locationInfo").has){
        //WeixinService.wxInit();
        //WeixinService.wxConfig();
    }

})

/**
 * 控制器
 * 医生页面
 */
app.controller("doctorCtrl",($scope:any,$rootScope:IRootScope.rootScope,$http:ag.IHttpService,ToolService:Tool,AjaxService:Ajax)=>{

    $scope.doctors = [];
    $scope.orderParams = ToolService.doctorOrderParams;
    $scope.areaParams = ToolService.areaParams;
    $scope.professionalParams = ToolService.professionalParams;
    $scope.menuParams = [
        {has:false,val:"专科"},
        {has:false,val:"区域"},
        {has:false,val:"排序"}
    ]

    //查询参数
    let queryParams = {
        professionId:"",
        itemid:"",
        orderby:"",
        city:"深圳",
        area:"",
        pageRows:10,
        currentPage:1
    }

    // 加载医生数据
    let queryDoctor = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/doctor/querydoctorbycityandprofession",
            data:queryParams
        }).then((data)=>{
            if(data.data.length<1){
                if($scope.doctors.length<1){
                    $rootScope.followTip.val = $rootScope.followTip.empty;
                }else{
                    $rootScope.followTip.val = $rootScope.followTip.no;
                }
                $rootScope.followTip.has = true;
            }else{
                mergeDoctor(data.data);
                $scope.doctors = $scope.doctors.concat(data.data);
            }
        })
    }

    // 处理医生数据
    let mergeDoctor = (items:any[])=>{
        items.forEach((item)=>{
            if(item.score==""||item.score==null){
                item.score="暂无评";
            }
            if(item.sales==""||item.sales==null){
                item.sales=0;
            }
        })
    }

    // 导航栏菜单切换
    $scope.switchNav = (index:number,obj:any[])=>{
        ToolService.select(index,obj,true);
        $rootScope.globalProp.hasBlackBg = obj[index].has;
    }

    // 区域和排序切换
    $scope.switchDrop = (index:number,obj:any[])=>{
        ToolService.select(index,obj);
        if(obj===$scope.areaParams){
            $scope.menuParams[1].has = false;
            queryParams.area = $scope.areaParams[index].id;
            
        }else if(obj===$scope.doctorOrderParams){
            $scope.menuParams[2].has = false;
            queryParams.orderby = $scope.doctorOrderParams[index].id;
        }
        $rootScope.followTip.has = false;
        $scope.doctors = [];
        queryParams.currentPage = 1;
        queryDoctor();
        $rootScope.globalProp.hasBlackBg = false;
    }

    //切换专科一级菜单
    $scope.switchLevelOne = (index:number,obj:any[])=>{
        ToolService.select(index,obj,true);
    }

    //缓存以选择二级菜单项
    let selected:any = {
        index:0,
        obj:$scope.professionalParams[0],
    }

    // 切换专科二级菜单
    $scope.switchLevelTwo = (index:number,obj:any)=>{
        if(selected.obj!==obj||(selected.obj===obj&&selected.index!=index)){
            ToolService.select(selected.index,selected.obj.children,true);
            selected.index = index;
            selected.obj = obj;
            ToolService.select(index,obj.children);
            $scope.menuParams[0].has = false;
            queryParams.professionId = obj.id;
            queryParams.itemid = obj.children[index].id;
            $rootScope.followTip.has = false;
            $scope.doctors = [];
            queryParams.currentPage = 1;
            queryDoctor();
            $rootScope.globalProp.hasBlackBg = false;
        }
    }

    // 加载下一页数据
    let loadNext = ()=>{
        queryParams.currentPage++;
        queryDoctor();
    }

    // 跳转到详情页面
    $scope.detail = (id:any)=>{
        ToolService.changeRoute("/doctor/detail","id="+id);
    }

    //页面初始化
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = true;
    ToolService.areaParams[0].has = true;
    ToolService.doctorOrderParams[0].has = true;
    ToolService.professionalParams[0].has = true;
    ToolService.professionalParams[0].children[0].has = true;
    ToolService.onWindowListen(loadNext);
    queryDoctor();
    
})

/**
 * 控制器
 * 互动页面
 */
app.controller("interactionCtrl",($scope:any,$rootScope:IRootScope.rootScope,ToolService:Tool,AjaxService:Ajax)=>{
    // 查询参数
    let queryParams = {
        flag:1,
        pageRows:10,
        currentPage:1
    }

    // 选项条参数
    $scope.navParams = [
        {has:true,val:"看牙",id:1},
        {has:false,val:"求美",id:2},
        {has:false,val:"孕·生",id:3},
    ]
    $scope.posts = [];

    // 加载帖子数据
    let queryPost = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/post/postList",
            data:queryParams,
        }).then((data)=>{
            if(data.data.length<1){
                if($scope.posts.length<1){
                     $rootScope.followTip.val = $rootScope.followTip.empty;
                }else{
                    $rootScope.followTip.val = $rootScope.followTip.no;
                }
                $rootScope.followTip.has = true;
            }else{
                mergePost(data.data);
                $scope.posts = $scope.posts.concat(data.data);
            }  
        })
    }

    // 处理帖子数据
    let mergePost = (items:any[])=>{
        items.forEach((item:any)=>{
            if(item.visitNum==null||item.visitNum==""){
                item.visitNum=0;
            }
            if(item.commentNum==""||item.commentNum==null){
                item.commentNum = 0;
            }
            if(item.faceImage!==null||item.faceImage!==""){
                item.faceImage = "https://biz.uokang.com/"+item.faceImage;
            }
            for(var index in item.list2){
                if(item.list2[index]==""||item.list2[index]==null){
                    item.list2.splice(index,1);
                }
            }
        })
    }

    // 切换帖子类型
    $scope.switchType = (index:number)=>{
        queryParams.flag = $scope.navParams[index].id;
        queryParams.currentPage = 1;
        ToolService.select(index,$scope.navParams);
        $rootScope.followTip.has = false;
        $scope.posts = [];
        queryPost();
    }

    //跳转到详细页面
    $scope.detail = (id:number)=>{
        ToolService.changeRoute("/interaction/detail","id="+id);
    }

    // 加载下一页数据
    let loadNext = ()=>{
        queryParams.currentPage++;
        queryPost();
    }

    // 初始化页面
    ToolService.reset();
    $rootScope.globalProp.hasBgColor = false;
    $rootScope.followTip.has = false;
    $rootScope.followTip.val = "";
    ToolService.onWindowListen(loadNext);
    queryPost();
})

/**
 * 控制器
 * 用户页面控制器
 */
app.controller("userCtrl",($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,ToolService:Tool,AjaxService:Ajax)=>{

    $scope.user = {};
    $scope.isLogin = false;
    $scope.countFocusMan = 0;
    $scope.countFansMan = 0;

    //切换用户名称的显示
    let init = ()=>{
        if(ToolService.checkLogin()){
            ToolService.loadUser();
            $scope.user = ToolService.user;
            $scope.isLogin = true;
            if(ToolService.empty($scope.user.nickname)){
                $scope.user.nickname = "还没有填写昵称";
            }
        }else{
            $scope.user.face = "../contents/img/men-head.png";
            $scope.user.tip = "点击登录/注册";
        }
    }
    
    //未开放项目的提示
    $scope.alert = (mess:string)=>{
        ToolService.alert(mess);
    }

    //获取关注数量和粉丝数量
    let queryFocus = ()=>{
        AjaxService.post({
            url:ToolService.host+"/wx/focus/focusManCount",
            data:{"accessToken":ToolService.user.accessToken},
        }).then((data)=>{
            if(data.code==0){
                if(!ToolService.empty(data.data.countFocusMan)){
                    $scope.countFocusMan = data.data.countFocusMan;
                }
                if(!ToolService.empty(data.data.countFansMan)){
                    $scope.countFansMan = data.data.countFansMan;
                }
            }
        })
    }

    //跳转到选项页面
    $scope.goto = (path:string,query:string)=>{
        if(ToolService.checkLogin()){
            ToolService.changeRoute(path,query);
        }else{
            ToolService.changeRoute("/login","");
        }
    }

    //页面初始化
    $rootScope.globalProp.hasBgColor = true;
    ToolService.cancelWindowListen();
    init();
    if(ToolService.checkLogin()){
        ToolService.loadUser();
        queryFocus();
    }
})

export = app;

