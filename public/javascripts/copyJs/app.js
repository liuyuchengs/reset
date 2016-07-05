/**
 * myApp模块,所有服务打包在一起，减少http请求
 */
define(["angular","wx"],function(angular,wx){
    /**
     * 定义模块和$rootScope
     */
    var app = angular.module("myApp",["ngRoute"]);
    app.run(["$rootScope","$location",function($rootScope,$location){
        //导航栏样式参数
        $rootScope.navMenuParams = {
            home:false,
            doctor:false,
            interaction:false,
            user:false,
        }
        $rootScope.hasNav = false;
        //加载框参数
        $rootScope.loading = false;
        //提示框参数
        $rootScope.message = null;
        $rootScope.hasCancel = null;
        $rootScope.hasComfirm = null;
        $rootScope.hasTip = null;
        $rootScope.comfirm = null;
        $rootScope.cancel = null;
        //body背景色
        $rootScope.hasBgColor = false;

        //获取url决定导航栏样式
        $rootScope.switchNavMenu = function(item){
            for(var index in $rootScope.navMenuParams){
                if(index===item){
                    $rootScope.navMenuParams[item] = true;
                }else{
                    $rootScope.navMenuParams[index] = false;
                }
            }
        }

        //导航栏菜单处理事件
        $rootScope.menuClick = function(item){
            $location.path(item);  
        }

        //路由改变时触发
        $rootScope.$on("$routeChangeStart",function(){
            $rootScope.loading = true;
            if($location.path()==="/home"){
                $rootScope.switchNavMenu("home");
                $rootScope.hasNav = true;
            }else if($location.path()==="/doctor"){
                $rootScope.switchNavMenu("doctor");
                $rootScope.hasNav = true;
            }else if($location.path()==="/interaction"){
                $rootScope.switchNavMenu("interaction");
                $rootScope.hasNav = true;
            }else if($location.path()==="/user"){
                $rootScope.switchNavMenu("user");
                $rootScope.hasNav = true;
            }else{
                $rootScope.hasNav = false;
            }
        })

        //路由改变完成后触发
        $rootScope.$on("$routeChangeSuccess",function(){
            $rootScope.loading = false;
        })

        //后台按钮处理时间
        $rootScope.changeRoute = function(path,query){
            $location.path(path);
            if(query){
                $location.search(query);
            }else{
                $location.search("");
            }
        }
    }])

    /**
     * 路由部分
     */

    //配置路由
    app.config(["$routeProvider","$controllerProvider",function($routeProvider,$controllerProvider){
        $routeProvider.when("/home",{
            templateUrl:"home.html",
            controller:"homeCtrl",
            /*resolve:{
                home: loadController({
                    url:"../javascripts/dest/controller/home.js",
                    name:"homeCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax","Weixin"],   
                },$controllerProvider)
            }*/
        }).when("/doctor",{
            templateUrl:"doctor.html",
            controller:"doctorCtrl",
            /*resolve:{
                doctor: loadController({
                    url:"../javascripts/dest/controller/doctor.js",
                    name:"doctorCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax","Params"],   
                },$controllerProvider)
            }*/
        }).when("/doctor/askDoctor",{
            templateUrl:"askdoctor.html",
            controller:"askDoctorCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/askDoctor.js",
                    name:"askDoctorCtrl",
                    inject:["$scope","$rootScope","$location","$http","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/doctor/detail",{
            templateUrl:"doctordetail.html",
            controller:"doctorDetailCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/doctorDetail.js",
                    name:"doctorDetailCtrl",
                    inject:["$scope","$rootScope","$location","$anchorScroll","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/interaction",{
            templateUrl:"interaction.html",
            controller:"interactionCtrl",
            /*resolve:{
                interaction: loadController({
                    url:"../javascripts/dest/controller/interaction.js",
                    name:"interactionCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax"],   
                },$controllerProvider)
            }*/
        }).when("/interaction/detail",{
            templateUrl:"interactiondetail.html",
            controller:"interactionDetailCtrl",
            resolve:{
                interaction: loadController({
                    url:"../javascripts/dest/controller/interactionDetail.js",
                    name:"interactionDetailCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],   
                },$controllerProvider)
            }
        }).when("/user",{
            templateUrl:"user.html",
            controller:"userCtrl",
            /*resolve:{
                interaction: loadController({
                    url:"../javascripts/dest/controller/user.js",
                    name:"userCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],   
                },$controllerProvider)
            }*/
        }).when("/user/userinfo",{
            templateUrl:"userinfo.html",
            controller:"userInfoCtrl",
            resolve:{
                userinfo:loadController({
                    url:"../javascripts/dest/controller/userinfo.js",
                    name:"userInfoCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],   
                },$controllerProvider)
            }
        }).when("/user/cush",{
            templateUrl:"cush.html",
            controller:"cushCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/cush.js",
                    name:"cushCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/cush/read",{
            templateUrl:"cushreadme.html",
            controller:"cushCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/cush.js",
                    name:"cushCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/cushover",{
            templateUrl:"cushover.html",
            controller:"cushOverCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/cushOver.js",
                    name:"cushOverCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/userinfochange",{
            templateUrl:"userinfochange.html",
            controller:"userInfoChangeCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/userInfoChange.js",
                    name:"userInfoChangeCtrl",
                    inject:["$scope","$rootScope","$location","$timeout","$http","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/user/order",{
            templateUrl:"order.html",
            controller:"userOrderCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/order.js",
                    name:"userOrderCtrl",
                    inject:["$scope","$rootScope","$location","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/activity",{
            templateUrl:"activity.html",
            controller:"activityCtrl",
            resolve:{
                activity:loadController({
                    url:"../javascripts/dest/controller/activity.js",
                    name:"activityCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],   
                },$controllerProvider)
            }
        }).when("/product/detail",{
            templateUrl:"productdetail.html",
            controller:"productDetailCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/productDetail.js",
                    name:"productDetailCtrl",
                    inject:["$scope","$rootScope","$location","$http","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/product",{
            templateUrl:"product.html",
            controller:"productCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/product.js",
                    name:"productCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/exam/detail",{
            templateUrl:"examdetail.html",
            controller:"examDetailCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/examDetail.js",
                    name:"examDetailCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/discount",{
            templateUrl:"discount.html",
            controller:"discountCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/discount.js",
                    name:"discountCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/findpwd/phone",{
            templateUrl:"findpwdphone.html",
            controller:"findPassCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/findPass.js",
                    name:"findPassCtrl",
                    inject:["$scope","$rootScope","$location","$interval","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/findpwd/code",{
            templateUrl:"findpwdcode.html",
            controller:"findPassCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/findPass.js",
                    name:"findPassCtrl",
                    inject:["$scope","$rootScope","$location","$interval","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/findpwd/pwd",{
            templateUrl:"findpwdpwd.html",
            controller:"findPassCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/findPass.js",
                    name:"findPassCtrl",
                    inject:["$scope","$rootScope","$location","$interval","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/grab",{
            templateUrl:"grab.html",
            controller:"grabCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/grab.js",
                    name:"grabCtrl",
                    inject:["$scope","$rootScope","$window","$location","Tool","Ajax","Weixin"],
                },$controllerProvider)
            }
        }).when("/grab/code",{
            templateUrl:"grabcode.html",
            controller:"grabCodeCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/grabCode.js",
                    name:"grabCodeCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/grab/order",{
            templateUrl:"graborder.html",
            controller:"grabOrderCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/grabOrder.js",
                    name:"grabOrderCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/login",{
            templateUrl:"login.html",
            controller:"loginCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/login.js",
                    name:"loginCtrl",
                    inject:["$scope","$rootScope","$location","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/makeorder",{
            templateUrl:"makeorder.html",
            controller:"makeOrderCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/makeorder.js",
                    name:"makeOrderCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/news",{
            templateUrl:"news.html",
            controller:"newsCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/news.js",
                    name:"newsCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/news/detail",{
            templateUrl:"newsdetail.html",
            controller:"newsCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/news.js",
                    name:"newsCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/order",{
            templateUrl:"order.html",
            controller:"orderCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/order.js",
                    name:"orderCtrl",
                    inject:["$scope","$rootScope","$location","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/pay",{
            templateUrl:"pay.html",
            controller:"payCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/pay.js",
                    name:"payCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Weixin"],
                },$controllerProvider)
            }
        }).when("/pay/result",{
            templateUrl:"payresult.html",
            controller:"payResultCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/payResult.js",
                    name:"payResultCtrl",
                    inject:["$scope","$rootScope","$location","Tool"],
                },$controllerProvider)
            }
        }).when("/register",{
            templateUrl:"register.html",
            controller:"registerCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/register.js",
                    name:"registerCtrl",
                    inject:["$scope","$rootScope","$location","$interval","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/agreement",{
            templateUrl:"agreement.html",
        }).when("/write",{
            templateUrl:"write.html",
            controller:"writeCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/write.js",
                    name:"writeCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/write/say",{
            templateUrl:"writesay.html",
            controller:"writeCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/write.js",
                    name:"writeCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/write/note",{
            templateUrl:"writenote.html",
            controller:"writeCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/write.js",
                    name:"writeCtrl",
                    inject:["$scope","$rootScope","$http","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/mypost",{
            templateUrl:"mypost.html",
            controller:"myPostCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/myPost.js",
                    name:"myPostCtrl",
                    inject:["$scope","$rootScope","$location","Ajax","Tool"],
                },$controllerProvider)
            }
        }).when("/user/mymessage",{
            templateUrl:"mymessage.html",
            controller:"myMessageCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/myMessage.js",
                    name:"myMessageCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/myfollow",{
            templateUrl:"myfollow.html",
            controller:"myFollowCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/myFollow.js",
                    name:"myFollowCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/exam",{
            templateUrl:"exam.html",
            controller:"examCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/exam.js",
                    name:"examCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/invite/new",{
            templateUrl:"invitenew.html",
            controller:"inviteCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/invite.js",
                    name:"inviteCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax","Weixin"],
                },$controllerProvider)
            }
        }).when("/invite/register",{
            templateUrl:"inviteregister.html",
            controller:"inviteCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/invite.js",
                    name:"inviteCtrl",
                    inject:["$scope","$rootScope","$location","Tool","Ajax","Weixin"],
                },$controllerProvider)
            }
        }).when("/invite/notes",{
            templateUrl:"invitenotes.html",
            controller:"inviteNotesCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/inviteNotes.js",
                    name:"inviteNotesCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        }).when("/user/paymoney",{
            templateUrl:"paymoney.html",
            controller:"payMoneyCtrl",
            resolve:{
                askDoctor:loadController({
                    url:"../javascripts/dest/controller/payMoney.js",
                    name:"payMoneyCtrl",
                    inject:["$scope","$rootScope","Tool","Ajax"],
                },$controllerProvider)
            }
        })
        .otherwise({redirectTo:"/home"})
    }])

    //将require的控制器注册到Module中
    function loadController(obj,$controllerProvider){
        return function($q){
            var deferred = $q.defer();
            require([obj.url],function(controller){
                controller.$inject = obj.inject;
                $controllerProvider.register(obj.name,controller);
                deferred.resolve();
            })
            return deferred.promise;
        }
    }

    /**
     * 指令区域
     */

    // 图片加载失败后，使用设置的图片
    app.directive('fallbackSrc', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
            }
        }
        return fallbackSrc;
    });

    // 项目图片加载失败后，使用默认图片
    app.directive("productError",function(){
        return {
            restrict:"A",
            link:function(scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    angular.element(this).attr("src","../contents/img/p_default.png");
                })
            }
        }
    })

    // 医生图片加载失败后，使用默认图片
    app.directive("doctorError",function(){
        return {
            restrict:"A",
            link:function(scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    angular.element(this).attr("src","../contents/img/doc-head.png");
                })
            }
        }
    })

    // 用户头像加载失败后，使用默认图片
    app.directive("userError",function(){
        return {
            restrict:"A",
            link:function($scope,iElement,iAttrs){
                iElement.bind("error",function(){
                    var imgUrl = "../contents/img/men-head.png";
                    if(iAttrs.userError){
                        if(iAttrs.userError==="女"){
                            imgUrl = "../contents/img/women-head.png"
                        }
                    }
                    angular.element(this).attr("src",imgUrl);
                })
            }
        }
    })

    //自适应宽度的正方形
    app.directive("zoomImage",function(){
        return {
            restrict:"A",
            link:function($scope,iElement,iAttrs){
                var containSize = iElement.css("width").slice(0,-2);
                iElement.css("height",containSize);
                var children = iElement.children();
                children.bind("load",function(){
                    var width = children.css("width").slice(0,-2);
                    var height = children.css("height").slice(0,-2);
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
     * 过滤器部分
     */

    // 设置默认的头像
    app.filter("defaultHeadImg",function(){
        return function(input,sex){
            if(input===null||input===""){
                if(sex==="男"||sex===null||sex===""||sex===undefined){
                    input = "../contents/img/men-head.png";
                }else{
                    input = "../contents/img/women-head.png";
                }
            }
            return input;
        }
    })
    
    // 设置默认图片
    app.filter("defaultImg",function(){
        return function(input,type){
            if(input==null||input==""){
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
     * 服务部分
     */

     // 数据访问服务
    app.service("Ajax",["$rootScope","$http","$q","Tool",function($rootScope,$http,$q,Tool){
        //使用promise封装ajax
        this.get = function (obj) {
                if (obj.url) {
                    $rootScope.loading = true;
                    var defered = $q.defer();
                    $http.get(obj.url,{
                        headers:obj.headers,
                    }).success(function (data) {
                        return defered.resolve(data);
                    }).error(function (data) {
                        return defered.reject(data);
                    });
                    return defered.promise;
                }
            };
        this.post = function (obj) {
            if (obj.url) {
                var defered = $q.defer();
                if(obj.headers) {
                    if(!obj.headers["Content-type"]){
                        obj.headers["Content-type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
                    }
                }else{
                    obj.headers = {
                        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    };
                }
                $rootScope.loading = true;
                //将参数对象转换成参数字符串
                obj.params = Tool.convertParams(obj.params);
                $http.post(obj.url, obj.params, {
                    headers: obj.headers
                }).success(function (data) {
                    defered.resolve(data);
                }).error(function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
        };
    }]);

    // 工具服务
    app.service("Tool",["$rootScope","$location",function($rootScope,$location){
        
        //变量
        //this.host = "http://192.168.0.102:3000";
        //this.host = "https://192.168.0.222:8555/www"
        //this.host = "https://www.uokang.com";
        this.userInfo = {};
        /*
        ** 操作localStorage和sessionStorage
        */
        this.getLocal = function(key){
            return JSON.parse(localStorage.getItem(key));
        };
        this.setLocal = function(key,value){
            localStorage.setItem(key,JSON.stringify(value));
        };
        this.removeLocal = function(key){
            localStorage.removeItem(key);
        };
        this.clearLocal = function(){
            localStorage.clear();
        }
        this.getSession = function(key){
            return JSON.parse(sessionStorage.getItem(key));
        }
        this.setSession = function(key,value){
            sessionStorage.setItem(key,JSON.stringify(value));
        }
        this.removeSession = function(key){
            sessionStorage.removeItem(key);
        }
        //跳转到指定url
        this.goUrl = function(url){
            if(url.length>0){
                location.href = url;
            }
        }

        //改变路由
        this.changeRoute = function(path,search){
            $location.path(path);
            if(search){
                $location.search(search);
            }else{
                $location.search("");
            }
        }

        //判断是否登录
        this.checkLogin = function(){
            if(this.getLocal("user")){
                return true;
            }else{
                return false;
            }
        }

        //判断是否完成用户信息
        this.isUserInfoComplete = function(){
            var userInfo = this.getLocal("user");
            if(userInfo.realname==""||userInfo.realname==null||userInfo.sex==""||userInfo.sex==null||userInfo.age==""||userInfo.age==null||userInfo.phone==""||userInfo.phone==null){
                return false;
            }else{
                return true;
            }
        }
        this.select = function(params,obj){
            for(var proto in obj){
                if(proto==params){
                    if(!obj[params].has){
                        obj[params].has = true;
                    }
                }else{
                    if(obj[proto].has){
                        obj[proto].has = false;
                    }
                }
            }
        }

        //确认按钮的提示框
        this.alert = function(mess,callback){
            $rootScope.message = mess;
            $rootScope.hasCancel = false;
            $rootScope.hasComfirm = true;
            $rootScope.hasTip = true;
            if(callback){
                $rootScope.comfirm = callback;
            }else{
                $rootScope.comfirm = function(){
                    $rootScope.hasTip = false;
                }
            }
        }

        //确认和取消按钮的提示框
        this.comfirm = function(mess,callback){
            $rootScope.message = mess;
            $rootScope.hasCancel = true;
            $rootScope.hasComfirm = true;
            $rootScope.hasTip = true;
            $rootScope.cancel = function(){
                $rootScope.hasTip = false;
            }
            $rootScope.comfirm = callback;
        }

        //获取用户信息
        this.loadUserinfo = function(){
            this.userInfo = this.getLocal("user");
        }

        //将对象转换成查询字符串
        this.convertParams = function(obj){
            var params = "";
            for(var property in obj){
                if(obj[property]!=null){
                    params += property+"="+obj[property]+"&";
                }
            }
            //截取掉最后一个"&"
            params = params.slice(0,params.length-1);
            return params;
        }

        //不监听window滚动
        this.noWindowListen = function(){
            window.onscroll = null;
        }

        this.getQueryString = function(name){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    }])

    // 微信服务
    app.service("Weixin",["$rootScope","Ajax","Tool",function($rootScope,Ajax,Tool){
        //初始化完成后，检查客户端版本 --first--
        this.wxInit = function($scope,callback){
            //wx初始化后检查客户端
            wx.ready(function(){
                wx.checkJsApi({
                    //需要检测的JS接口列表
                    jsApiList: ['getLocation','chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'],
                    success: function(result) {
                        //以键值对的形式返回，可用的api值true，不可用为false
                        if(!result.checkResult.getLocation||!result.checkResult.chooseWXPay){
                            Tool.alert("客户端版本过低，请微信升级客户端!");
                        }
                    }
                })
                if(callback){
                    wx.getLocation({
                        type:"wgs84",
                        success:function(res){
                            var locationInfo = {
                                latitude:res.latitude, //维度
                                longitude:res.longitude //经度
                            }
                            Tool.setSession("locationInfo",locationInfo);
                            callback(locationInfo.latitude,locationInfo.longitude);
                        },
                        fail:function(){
                            $scope.locationInfo = "定位失败";
                        }
                    });
                }
            })
        }

        //初始化wx对象 --second--
        this.wxConfig = function(scope){
            var params = {
                debug:false,
                appId : "",
                timestamp : "",
                nonceStr : "",
                signature : "",
                jsApiList : ['getLocation','chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo'],
            };
            Ajax.post({
                url:Tool.host+"/weixin/check/getjsconfig",
                params: {url:encodeURIComponent(location.href)},
            }).then(function(data){
                params.appId = data.appId;
                params.timestamp = data.timestamp;
                params.nonceStr = data.nonceStr;
                params.signature = data.signature;
                wx.config(params);
            }).catch(function(){
                Tool.alert("初始化WX对象失败，请稍后再试！");
            }).finally(function(){
                $rootScope.loading =false;
            })
        }

        //自定义分享内容,可分享至微信好友，微信朋友圈，qq好友，qq空间，腾讯微博
        this.wxShare = function(obj){
            /**
             * title:分享标题, desc:分享描述, link:分享链接, imgUrl:分享图标, type：分享类型，默认为link， dataUrl：分享数据的连接
             */
            wx.onMenuShareTimeline({
                title: obj.title,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel: obj.cancel,
            });
            wx.onMenuShareAppMessage({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                type: obj.type,
                dataUrl: obj.dataUrl,
                success:obj.success,
                cancel: obj.cancel
            });
            wx.onMenuShareQQ({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success:obj.success,
                cancel:obj.cancel
            });
            wx.onMenuShareQZone({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel:obj.cancel,
            });
            wx.onMenuShareWeibo({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: obj.success,
                cancel: obj.cancel,
            });
        }

        //检查微信支付的参数是否完整
        this.wxCheckPayParams = function(params){
            if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
                return false;
            }else{
                return true;
            }
        }

        //获取支付参数，并发起支付
        this.wxPay = function(orderId,code){
            var params = {
                timestamp: "",
                nonceStr: '',
                package: '',
                signType: '',
                paySign: '',
                success:function() {
                    window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=success";
                },
                cancel:function(){
                    window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=fail";
                },
                fail:function(){
                    window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=fail";
                }
            };
            if(orderId!=""&orderId!=null){
                var url = Tool.host+"/wx/order/weixin";
                var params = {payType:"JSAPI",orderId:orderId,"code":code};
                Ajax.post({
                    url:url,
                    params:params,
                    headers:{
                        'accessToken':Tool.getLocal("user").accessToken,
                    }
                }).then(function(data){
                    params.timestamp = data.data.timeStamp;
                    params.nonceStr = data.data.nonceStr;
                    params.package = data.data.package;
                    params.signType = "MD5";
                    params.paySign = data.data.sign;
                    if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
                        Tool.alert("请求支付参数失败，请稍后再试!");
                    }else{
                        wx.chooseWXPay(params);
                    }
                }).catch(function(){
                    Tool.alert("请求支付参数失败，请稍后再试!");
                }).finally(function(){
                    $rootScope.loading = false;
                })
            }
        }
    }])

    // 存储菜单变量
    app.service("Params",function(){
        this.defaultParams = {
            default:{has:true,id:""}
        }
        this.areaParams = {
            default:{has:true,val:""},
            futian:{has:false,val:"福田区"},
            nanshan:{has:false,val:"南山区"},
            luohu:{has:false,val:"罗湖区"},
            baoan:{has:false,val:"宝安区"},
            longhua:{has:false,val:"龙华新区"},
            longgang:{has:false,val:"龙岗区"},
            yantian:{has:false,val:"盐田区"},
        }
        this.yakeParams = {
            all:{has:true,id:""},
            zzy:{has:false,id:19},
            xiya:{has:false,id:20},
            kcy:{has:false,id:82},
            buya:{has:false,id:22},
            baya:{has:false,id:23},
            ycmr:{has:false,id:24},
            jiaozheng:{has:false,id:64},
            yichi:{has:false,id:65},
            yzzl:{has:false,id:63},
            qita:{has:false,id:60},
        };
        this.meirongParams = {
            all:{has:true,id:""},
            yanbu:{has:false,id:7},
            mianbu:{has:false,id:8},
            bibu:{has:false,id:9},
            xiong:{has:false,id:45},
            xizhi:{has:false,id:12},
            simi:{has:false,id:78},
            zhushe:{has:false,id:79},
            jiguang:{has:false,id:80},
            koucun:{has:false,id:81},
            qita:{has:false,id:13},
        };
        this.fckParams = {
            all:{has:true,id:""},
            jiancha:{has:false,id:48},
            fenmian:{has:false,id:49}
        };
        this.zhongyiParams = {
            all:{has:true,id:""},
            toubu:{has:false,id:51},
            jianjing:{has:false,id:52},
            yaobu:{has:false,id:53},
            tuibu:{has:false,id:54},
            quanshen:{has:false,id:55},
            jingluo:{has:false,id:56},
            qita:{has:false,id:57}
        }
        this.tijianParams = {
            default:{has:true,val:""},
            shangye:{has:false,val:75},
            changgui:{has:false,val:67},
            zhongnian:{has:false,val:69},
            laonian:{has:false,val:70},
            ruzhi:{has:false,val:71},
            yunqian:{has:false,val:72},
            qingnian:{has:false,val:68},
            ertong:{has:false,val:74},
            manbing:{has:false,val:73},
        }
        this.professionalParams = {
            default:{has:true,val:this.defaultParams,proId:""},
            yake:{has:false,val:this.yakeParams,proId:"2"},
            meirong:{has:false,val:this.meirongParams,proId:"3"},
            fck:{has:false,val:this.fckParams,proId:"4"},
            zhongyi:{has:false,val:this.zhongyiParams,proId:"6"},
            tijian:{has:false,val:this.tijianParams,proId:"5"}
        }
    })

    /**
     * 打包主要控制器
     */
    app.controller("homeCtrl",["$scope","$rootScope","$http","Tool","Ajax","Weixin",function($scope,$rootScope,$http,Tool,Ajax,Weixin){
		$scope.items = [];
		$scope.currentPage = 1;
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.banners = [];
		//$scope.key = "LFQBZ-7UNCX-VDR44-T34PN-OX2VQ-M2BNI"; //个人私钥，后续可更换为企业密钥
		$scope.locationInfo ="深圳市"
		$scope.imgStyle = {
			"width":screen.width
		}
		$scope.gotoMenu = function(path){
			Tool.goPage(path);
		}

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			$scope.loadRecommend();
			$scope.queryBanner();
			$scope.initSwiper();
			if(Tool.getSession("locationInfo")){
				$scope.locationInfo = Tool.getSession("locationInfo").city;
			}else{
				Weixin.wxInit($scope,$scope.getLocation);
				Weixin.wxConfig($scope);
			}
		}

		// 逆地址服务暂不用 
		$scope.getLocation = function(latitude,longitude){
			var url = "https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&callback=JSON_CALLBACK&location="+latitude+","+longitude+"&key="+$scope.key;
			$http.jsonp(url).success(function(data){
				if(data.status==0){
					$scope.locationInfo = data.result.address_component.city;
					var locationInfo = Tool.getSession("locationInfo");
					locationInfo.city = data.result.address_component.city;
					Tool.setSession("locationInfo",locationInfo);
				}else{
					$scope.locationInfo = "定位失败";
				}
			}).error(function(){
				$scope.locationInfo = "定位失败";
			})
		}

		// 滚动监听
		window.onscroll = function(){
			if($scope.loading||$scope.noProduct){
				return;
			}
			var body = document.body;
			var html = document.documentElement;
			var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
			if(height>window.innerHeight){
				if (height - window.scrollY - window.innerHeight < 100) {
					$scope.loadNext();
				}
			}
		}

		// 查询热门推荐
		$scope.loadRecommend = function(){
            $rootScope.loading = true;
			var url = Tool.host+"/wx/product/queryrecommend";
			var params = "city=深圳&currentPage="+$scope.currentPage;
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					if(data.data.length<1){
						if($scope.items.length<1){
							$scope.noProductText = "暂时没有热门项目";
						}else{
							$scope.noProductText = "已经没有项目了!";
						}
						$scope.noProduct = true;
					}else{
						$scope.mergeProdcut(data.data);
						$scope.items = $scope.items.concat(data.data);
					}
				}
                $rootScope.loading = false;
			}).error(function(){
				Tool.alert("获取热门推荐数据失败，请稍后再试!");
				$scope.noProduct = true;
                $rootScope.loading = false;
			})
		}

		// 处理数据
		$scope.mergeProdcut = function(items){
			items.forEach(function(item){
				if(item.priceunit!=null&&item.priceunit!=""){
					item.preferPriceType = item.pricetype+"/"+item.priceunit;
				}else{
					item.preferPriceType = item.pricetype;
				}
				if(item.samllimg==""||item.samllimg==null){
					item.samllimg = "../contents/img/p_default.png";
				}
			})
		}

		// 获取图片轮播
		$scope.queryBanner = function(){
            $rootScope.loading = true;
			var url = Tool.host+"/wx/banner/query";
			var params = "type=home_banner";
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					$scope.banners = data.data;
				}
                $rootScope.loading = false;
			}).error(function(){
                $rootScope.loading = false;
				Tool.alert("获取主页图片失败，请稍后再试!");
			})
		}

		// 初始化图片轮播插件
		$scope.initSwiper = function(){
			//初始化swiper
			var myswiper = new Swiper(".swiper-container",{
				loop:false,
				pagination: '.swiper-pagination',
				autoplay: 2000,
				autoplayDisableOnInteraction:false,
				observeParents:true,  //
				observer:true,
				//第一张轮播图显示6s,其他的2s
				onSlideChangeEnd: function(swiper){
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

		// 跳转到详细页面
		$scope.detail = function(productId,hospitalId,type){
			if(type===5){
				Tool.changeRoute("/exam/detail","productId="+productId+"&hospitalId="+hospitalId);
			}else{
				Tool.changeRoute("/product/detail","flag=1&productId="+productId+"&hospitalId="+hospitalId);
			}
			
		}

		// 图片轮播跳转
		$scope.activity = function(id){
            if(id===1){
				Tool.changeRoute("/activity","flag=2");
			}
			if(id===2){
				Tool.changeRoute("/invite/new");
			}
			if(id===3){
				Tool.changeRoute("/activity","flag=1");
			}
		}

		// 分页查询，查询下一页
		$scope.loadNext = function(){
			$scope.currentPage++;
			$scope.loadRecommend();
		}
	}])

    app.controller("doctorCtrl",["$scope","$rootScope","$http","Tool","Ajax","Params",function($scope,$rootScope,$http,Tool,Ajax,Params){
        $scope.hasBg = false;
        $scope.profValue = "default";
        $scope.profItemValue = "default";
        $scope.doctors = [];
        $scope.noProduct = false;
        $scope.noProductText = "";
        // 下拉菜单项变量
        $scope.orderParams ={
            default:{has:true,val:""},
            title:{has:false,val:"profession_title desc"},
            score:{has:false,val:"score desc"}
        }
        $scope.areaParams = Params.areaParams;
        $scope.professionalParams = Params.professionalParams;

        // 查询参数
        $scope.queryParams = {
            professionId:"",
            itemid:"",
            orderby:"",
            city:"深圳",
            area:"",
            pageRows:10,
            currentPage:1
        }

        // 导航栏变量，需定义在上述变量的后面
        $scope.menuParams = {
            area:{has:false,val:$scope.areaParams},
            order:{has:false,val:$scope.orderParams},
            professional:{has:false,val:$scope.professionalParams},
        }

        // 初始化页面
        $scope.init = function(){
            $rootScope.hasBgColor = true;
            $scope.loadDoctor();
        }

        // 滚动监听
        window.onscroll = function(){
            if($rootScope.loading||$scope.noProduct){
                return;
            }
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
            if(height>window.innerHeight){
                if (height - window.scrollY - window.innerHeight < 100) {
                    $scope.loadNext();
                }
            }
        }

        // 切换导航菜单
        $scope.switchMenu = function(menu){
            $scope.switchObj(menu,$scope.menuParams,true);
        }

        // 选择区域和排序项目
        $scope.selectMenu = function(item,obj){
            var ob = $scope.menuParams[obj].val;
            $scope.switchObj(item,ob);
            if(obj=="area"){
                $scope.queryParams.area = ob[item].val;
            }
            if(obj=="order"){
                $scope.queryParams.orderby = ob[item].val;
            }
            $scope.switchMenu(obj);
            $scope.resetDate();
            $scope.loadDoctor();
        }

        // 选择专科
        $scope.selectProfression = function(item){
            $scope.switchObj(item,$scope.professionalParams);
        }

        // 选择专科项目
        $scope.selectProfressionItem = function(item,pro){
            if(item!=$scope.profItemValue){
                if($scope.profValue==""&&$scope.profItemValue==""){
                    $scope.professionalParams[pro].val[item].has = true;
                }else{
                    $scope.professionalParams[$scope.profValue].val[$scope.profItemValue].has = false;
                    $scope.professionalParams[pro].val[item].has = true;
                }
                $scope.profItemValue = item;
                $scope.profValue = pro;
                $scope.queryParams.professionId = $scope.professionalParams[pro].proId;
                $scope.queryParams.itemid = $scope.professionalParams[pro].val[item].id;
                $scope.switchMenu("professional");
                $scope.resetDate();
                $scope.loadDoctor();

            }
        }

        // 切换对象的值
        $scope.switchObj = function(item,obj,hasBg){
            for(var pro in obj){
                if(pro==item){
                    obj[pro].has = !obj[pro].has;
                    if(hasBg){
                        $scope.hasBg = obj[pro].has;
                    }
                }else{
                    obj[pro].has = false;
                }
            }
        }

        // 加载医生数据
        $scope.loadDoctor = function(){
            Ajax.post({
                url:Tool.host+"/wx/doctor/querydoctorbycityandprofession",
                params:$scope.queryParams
            }).then(function(data){
                if(data.data.length<1){
                    if($scope.doctors.length<1){
                        $scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
                    }else{
                        $scope.noProductText = "已经没有项目了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergeDoctor(data.data);
                    $scope.doctors = $scope.doctors.concat(data.data);
                }
            }).catch(function(){
                $scope.noProduct = true;
                Tool.alert("数据加载失败，请稍后再试!");
            }).finally(function(){
                $rootScope.loading =false;
            })
        }

        // 处理医生数据
        $scope.mergeDoctor = function(items){
            items.forEach(function(item){
                if(item.score==""||item.score==null){
                    item.score="暂无评";
                }
                if(item.sales==""||item.sales==null){
                    item.sales=0;
                }
            })
        }

        // 加载下一页数据
        $scope.loadNext = function(){
            $scope.queryParams.currentPage++;
            $scope.loadDoctor();
        }

        // 重置查询数据
        $scope.resetDate = function(){
            $scope.queryParams.currentPage = 1;
            $scope.noProduct = false;
            $scope.noProductText = "";
            $scope.doctors = [];
        }

        // 跳转到详情页面
        $scope.detail = function(id){
            Tool.changeRoute("/doctor/detail","id="+id);
        }
    }])

    app.controller("interactionCtrl",["$scope","$rootScope","$http","Tool","Ajax",function($scope,$rootScope,$http,Tool,Ajax){
        $scope.noProductText = "";
        $scope.noProduct = false;
        $scope.hasInteractionMenu = true;
        $scope.queryParams = {
            flag:1,
            pageRows:10,
            currentPage:1
        }
        $scope.navParams = {
            kanya:{has:true,val:1},
            shumei:{has:false,val:2},
            yunsheng:{has:false,val:3}
        }
        $scope.posts = [];

        //初始化页面
        $scope.init = function(){
            $rootScope.hasBgColor = false;
            $scope.queryPost();
        }

        // 加载帖子数据
        $scope.queryPost = function(){
            Ajax.post({
                url:Tool.host+"/wx/post/postList",
                params:$scope.queryParams,
            }).then(function(data){
                if(data.data.length<1){
                    if($scope.posts.length<1){
                        $scope.noProductText = "还没有帖子信息";
                    }else{
                        $scope.noProductText = "已经没有项目了!";
                    }
                    $scope.noProduct = true;
                }else{
                    $scope.mergePost(data.data);
                    $scope.posts = $scope.posts.concat(data.data);
                }
            }).catch(function(){
                Tool.alert("获取帖子信息失败!");
            }).finally(function(){
                $rootScope.loading = false;
            })
        }

        // 处理帖子数据
        $scope.mergePost = function(items){
            items.forEach(function(item){
                if(item.visitNum==null||item.visitNum==""){
                    item.visitNum=0;
                }
                if(item.commentNum==""||item.commentNum==null){
                    item.commentNum = 0;
                }
                if(item.faceImage!==null|item.faceImage!==""){
                    item.faceImage = "https://biz.uokang.com/"+item.faceImage;
                }
                for(var index in item.list2){
                    if(item.list2[index]==""||item.list2[index]==null){
                        item.list2.splice(index,1);
                    }
                }
            })
        }

        // 加载下一页数据
        $scope.loadNext = function(){
            $scope.queryParams.currentPage++;
            $scope.queryPost();
        }

        // 滚动监听
        window.onscroll = function(){
            if($rootScope.loading||$scope.noProduct){
                return;
            }
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
            if(height>window.innerHeight){
                if (height - window.scrollY - window.innerHeight < 100) {
                    $scope.loadNext();
                }
            }
        }

        // 切换帖子类型
        $scope.switchNav = function(item){
            $scope.queryParams.flag = $scope.navParams[item].val;
            Tool.select(item,$scope.navParams);
            $scope.queryParams.currentPage = 1;
            $scope.noProduct = false;
            $scope.noProductText = "";
            $scope.posts = [];
            $scope.queryPost();
        }

        // 跳转到详细页面
        $scope.detail = function(id){
            Tool.changeRoute("/interaction/detail","id="+id);
        }

    }])

    app.controller("userCtrl",["$scope","$rootScope","$location","Tool","Ajax",function($scope,$rootScope,$location,Tool,Ajax){
        $scope.user = {};
        $scope.isLogin = false;

        //页面初始化
        $scope.init = function(){
            $rootScope.hasBgColor = true;
            Tool.noWindowListen();
            $scope.initText();
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.queryFocus();
            }
        }

        //切换用户名称的显示
        $scope.initText = function(){
            if(Tool.checkLogin()){
                Tool.loadUserinfo();
                $scope.user = Tool.userInfo;
                $scope.isLogin = true;
                if($scope.user.nickname===""||$scope.user.nickname===null){
                    $scope.user.nickname = "您还没有填写昵称";
                }
            }else{
                $scope.user.face = "../contents/img/men-head.png";
                $scope.user.tip = "点击登录注册";
            }
        }

        // 未开放项目的提示
        $scope.alert = function(mess){
            Tool.alert(mess);
        }

        //获取关注数量和粉丝数量
        $scope.queryFocus = function(){
            Ajax.post({
                url:Tool.host+"/wx/focus/focusManCount",
                params: {"accessToken":Tool.userInfo.accessToken},
            }).then(function(data){
                 if(data.code==0){
                    if(data.data.countFocusMan===null||data.data.countFocusMan===""){
                        data.data.countFocusMan = 0;
                    }
                    if(data.data.countFansMan===null||data.data.countFansMan ===""){
                        data.data.countFansMan =0;
                    }
                    $scope.countFocusMan = data.data.countFocusMan;
                    $scope.countFansMan = data.data.countFansMan;
                }
            }).catch(function(){
                $scope.countFocusMan = 0;
                $scope.countFansMan = 0;
                Tool.alert("获取粉丝信息失败!");
            }).finally(function(){
				$rootScope.loading = false;
			})
        }
        
        //跳转到选项页面
        $scope.goto = function(path,query){
            if(Tool.checkLogin()){
                Tool.changeRoute(path,query);
            }else{
                Tool.changeRoute("/login","");
            }
        };
    }])

    return app;
})