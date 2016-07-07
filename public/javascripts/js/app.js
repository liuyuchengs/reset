/// <reference path="./../../../typings/index.d.ts" />
/**
 * 项目说明：
 * 1.所有angular依赖注入均为推断注入，压缩js时需防止变量名修改
 * 2.为减少http访问次数，尽量合并代码，减少文件数量
 */
define(["require", "exports", "angular", "./modules/Tool", "./modules/Ajax"], function (require, exports, ag, Tool, Ajax) {
    "use strict";
    var _this = this;
    var host = "https://www.uokang.com";
    var app = ag.module("myApp", ['ngRoute']);
    /**
     * 配置
     * 程序启动前配置$rootScope
     */
    app.run(function ($rootScope, $location) {
        //导航栏参数
        $rootScope.navMenu = {
            home: false,
            doctor: false,
            interaction: false,
            user: false,
            has: false
        };
        //加载提示框变量
        $rootScope.load = {
            has: false,
            src: "../../contents/img/loading.gif",
            val: "加载中...",
        };
        //消息提示框变量
        $rootScope.messageTip = {
            has: false,
            message: "",
            hasCancel: false,
            hasComfirm: false,
            comfirm: null,
            cancel: null,
        };
        //全局属性变量
        $rootScope.globalProp = {
            hasBgColor: false,
        };
        //改变导航栏样式
        $rootScope.switchNavMenu = function (item) {
            if (item === "/home") {
                if (!$rootScope.navMenu.home) {
                    $rootScope.navMenu.home = true;
                    $rootScope.navMenu.doctor = false;
                    $rootScope.navMenu.interaction = false;
                    $rootScope.navMenu.user = false;
                    $rootScope.navMenu.has = true;
                }
            }
            else if (item === "/doctor") {
                if (!$rootScope.navMenu.doctor) {
                    $rootScope.navMenu.doctor = true;
                    $rootScope.navMenu.home = false;
                    $rootScope.navMenu.interaction = false;
                    $rootScope.navMenu.user = false;
                    $rootScope.navMenu.has = true;
                }
            }
            else if (item === "/interaction") {
                if (!$rootScope.navMenu.interaction) {
                    $rootScope.navMenu.interaction = true;
                    $rootScope.navMenu.home = false;
                    $rootScope.navMenu.doctor = false;
                    $rootScope.navMenu.user = false;
                    $rootScope.navMenu.has = true;
                }
            }
            else if (item === "/user") {
                if (!$rootScope.navMenu.interaction) {
                    $rootScope.navMenu.user = true;
                    $rootScope.navMenu.home = false;
                    $rootScope.navMenu.doctor = false;
                    $rootScope.navMenu.interaction = false;
                    $rootScope.navMenu.has = true;
                }
            }
            else {
                $rootScope.navMenu.has = false;
            }
        };
        //路由改变时触发
        $rootScope.$on("$routeChangeStart", function () {
            $rootScope.load.has = true;
            var path = $location.path();
            $rootScope.switchNavMenu(path);
        });
        //路由改变完成后触发
        $rootScope.$on("$routeChangeSuccess", function () {
            $rootScope.load.has = false;
        });
        //导航栏菜单处理事件
        $rootScope.menuClick = function (path) {
            $location.path(path);
        };
        //html中改变路由
        $rootScope.changeRoute = function (path, query) {
            $location.path(path);
            if (query) {
                $location.search(query);
            }
            else {
                $location.search(""); //重置参数部分
            }
        };
    });
    /**
     * 路由
     * 1.主要的四个控制器直接包含在app.js中,无需再require注入
     * 2.其余的控制器通过require动态加载后注入
     */
    app.config(function ($routeProvider, $controllerProvider) {
        $routeProvider.when("/home", {
            templateUrl: "home.html",
            controller: "homeCtrl",
        }).when("/doctor", {
            templateUrl: "doctor.html",
            controller: "doctorCtrl",
        }).when("/interaction", {
            templateUrl: "interaction.html",
            controller: "interactionCtrl",
        }).when("/user", {
            templateUrl: "userCtrl",
            controller: "userCtrl",
        }).when("/doctor/detail", {
            templateUrl: "doctordetail.html",
            controller: "doctorDetailCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/doctorDetail.js",
                name: "doctorDetailCtrl",
            })
        }).when("/doctor/askDoctor", {
            templateUrl: "askdoctor.html",
            controller: "askDoctorCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/askDoctor.js",
                name: "askDoctorCtrl",
            })
        }).when("/interaction/detail", {
            templateUrl: "interactiondetail.html",
            controller: "interactionDetailCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/interactionDetail.js",
                name: "interactionDetailCtrl",
            })
        }).when("/user/userinfo", {
            templateUrl: "userinfo.html",
            controller: "userInfoCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/userinfo.js",
                name: "userInfoCtrl",
            })
        }).when("/user/cush", {
            templateUrl: "cush.html",
            controller: "cushCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/cush.js",
                name: "cushCtrl",
            })
        }).when("/user/cush/read", {
            templateUrl: "cushreadme.html",
            controller: "cushCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/cush.js",
                name: "cushCtrl",
            })
        }).when("/user/cushover", {
            templateUrl: "cushover.html",
            controller: "cushOverCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/cushOver.js",
                name: "cushOverCtrl",
            })
        }).when("/user/userinfochange", {
            templateUrl: "userinfochange.html",
            controller: "userInfoChangeCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/userInfoChange.js",
                name: "userInfoChangeCtrl",
            })
        }).when("/user/order", {
            templateUrl: "order.html",
            controller: "userOrderCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/order.js",
                name: "userOrderCtrl",
            })
        }).when("/activity", {
            templateUrl: "activity.html",
            controller: "activityCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/activity.js",
                name: "activityCtrl",
            })
        }).when("/product/detail", {
            templateUrl: "productdetail.html",
            controller: "productDetailCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/productDetail.js",
                name: "productDetailCtrl",
            })
        }).when("/product", {
            templateUrl: "product.html",
            controller: "productCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/product.js",
                name: "productCtrl",
            })
        }).when("/exam/detail", {
            templateUrl: "examdetail.html",
            controller: "examDetailCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/examDetail.js",
                name: "examDetailCtrl",
            })
        }).when("/discount", {
            templateUrl: "discount.html",
            controller: "discountCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/discount.js",
                name: "discountCtrl",
            })
        }).when("/findpwd/phone", {
            templateUrl: "findpwdphone.html",
            controller: "findPassCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/findPass.js",
                name: "findPassCtrl",
            })
        }).when("/findpwd/code", {
            templateUrl: "findpwdcode.html",
            controller: "findPassCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/findPass.js",
                name: "findPassCtrl",
            })
        }).when("/findpwd/pwd", {
            templateUrl: "findpwdpwd.html",
            controller: "findPassCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/findPass.js",
                name: "findPassCtrl",
            })
        }).when("/grab", {
            templateUrl: "grab.html",
            controller: "grabCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/grab.js",
                name: "grabCtrl",
            })
        }).when("/grab/code", {
            templateUrl: "grabcode.html",
            controller: "grabCodeCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/grabCode.js",
                name: "grabCodeCtrl",
            })
        }).when("/grab/order", {
            templateUrl: "graborder.html",
            controller: "grabOrderCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/grabOrder.js",
                name: "grabOrderCtrl",
            })
        }).when("/login", {
            templateUrl: "login.html",
            controller: "loginCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/login.js",
                name: "loginCtrl",
            })
        }).when("/makeorder", {
            templateUrl: "makeorder.html",
            controller: "makeOrderCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/makeorder.js",
                name: "makeOrderCtrl",
            })
        }).when("/news", {
            templateUrl: "news.html",
            controller: "newsCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/news.js",
                name: "newsCtrl",
            })
        }).when("/news/detail", {
            templateUrl: "newsdetail.html",
            controller: "newsCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/news.js",
                name: "newsCtrl",
            })
        }).when("/order", {
            templateUrl: "order.html",
            controller: "orderCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/order.js",
                name: "orderCtrl",
            })
        }).when("/pay", {
            templateUrl: "pay.html",
            controller: "payCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/pay.js",
                name: "payCtrl",
            })
        }).when("/pay/result", {
            templateUrl: "payresult.html",
            controller: "payResultCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/payResult.js",
                name: "payResultCtrl",
            })
        }).when("/register", {
            templateUrl: "register.html",
            controller: "registerCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/register.js",
                name: "registerCtrl",
            })
        }).when("/agreement", {
            templateUrl: "agreement.html",
        }).when("/write", {
            templateUrl: "write.html",
            controller: "writeCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/write.js",
                name: "writeCtrl",
            })
        }).when("/write/say", {
            templateUrl: "writesay.html",
            controller: "writeCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/write.js",
                name: "writeCtrl",
            })
        }).when("/write/note", {
            templateUrl: "writenote.html",
            controller: "writeCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/write.js",
                name: "writeCtrl",
            })
        }).when("/user/mypost", {
            templateUrl: "mypost.html",
            controller: "myPostCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/myPost.js",
                name: "myPostCtrl",
            })
        }).when("/user/mymessage", {
            templateUrl: "mymessage.html",
            controller: "myMessageCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/myMessage.js",
                name: "myMessageCtrl",
            })
        }).when("/user/myfollow", {
            templateUrl: "myfollow.html",
            controller: "myFollowCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/myFollow.js",
                name: "myFollowCtrl",
            })
        }).when("/exam", {
            templateUrl: "exam.html",
            controller: "examCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/exam.js",
                name: "examCtrl",
            })
        }).when("/invite/new", {
            templateUrl: "invitenew.html",
            controller: "inviteCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/invite.js",
                name: "inviteCtrl",
            })
        }).when("/invite/register", {
            templateUrl: "inviteregister.html",
            controller: "inviteCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/invite.js",
                name: "inviteCtrl",
            })
        }).when("/invite/notes", {
            templateUrl: "invitenotes.html",
            controller: "inviteNotesCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/inviteNotes.js",
                name: "inviteNotesCtrl",
            })
        }).when("/user/paymoney", {
            templateUrl: "paymoney.html",
            controller: "payMoneyCtrl",
            resolve: loadCtrl({
                url: "../javascripts/dest/controller/payMoney.js",
                name: "payMoneyCtrl",
            })
        })
            .otherwise({ redirectTo: "/home" });
    });
    /**
     * 服务
     * 各种小工具
     */
    app.factory("ToolService", function ($rootScope, $location) {
        new Tool($rootScope, $location, host);
    });
    /**
     * 服务
     * ajax数据访问
     * get:get方式异步数据
     * post:post方式异步数据
     */
    app.factory("AjaxService", function ($rootScope, $http, $q, ToolService) {
        new Ajax($rootScope, $http, $q, ToolService);
    });
    /**
     * 指令
     * 图片加载后，使用 设置的图片
     */
    app.directive("fallbackSrc", function () {
        return {
            restrict: "A",
            link: function (scope, iElement, iAttr) {
                iElement.bind("error", function () {
                    ag.element(_this).attr("src", iAttr["fallbackSrc"]);
                });
            },
        };
    });
    /**
     * 指令
     * 项目图片加载失败后，使用默认图片
     * like:<img product-error>
     */
    app.directive("productError", function () {
        return {
            restrict: "A",
            link: function ($scope, iElement, iAttr) {
                iElement.bind("error", function () {
                    ag.element(_this).attr("src", "../contents/img/p_default.png");
                });
            },
        };
    });
    /**
     * 指令
     * 医生图像加载失败后，使用默认图片
     * like:<img doctor-error='男'/>
     */
    app.directive("doctorError", function () {
        return {
            restrict: "A",
            link: function ($scope, iElement, iAttr) {
                iElement.bind("error", function () {
                    ag.element(_this).attr("src", "../contents/img/doc-head.png");
                });
            }
        };
    });
    /**
     * 指令
     * 用户头像加载失败后，使用默认图片
     * like:<img user-error="女">
     */
    app.directive("userError", function () {
        return {
            restrict: "A",
            link: function ($scope, iElement, iAttr) {
                iElement.bind("error", function () {
                    var imgUrl = "../contents/img/men-head.png";
                    if (iAttr["userError"]) {
                        if (iAttr["userError"] === "女") {
                            imgUrl = "../contents/img/women-head.png";
                        }
                    }
                    ag.element(_this).attr("src", imgUrl);
                });
            }
        };
    });
    /**
     * 指令
     * 自适应宽度的正方形图片
     * like:<img zoom-image>
     */
    app.directive("zoomImage", function () {
        return {
            restrict: "A",
            link: function ($scope, iElement, iAttr) {
                var containSize = parseInt(iElement.css("width").slice(0 - 2));
                iElement.css("height", containSize);
                var children = iElement.children();
                children.bind("load", function () {
                    var width = parseInt(children.css("width").slice(0, -2));
                    var height = parseInt(children.css("height").slice(0, -2));
                    if (width > height) {
                        var zWidth = (containSize / height) * width;
                        var zHeight = containSize;
                        children.css("marginLeft", -(zWidth - containSize) / 2);
                    }
                    else {
                        var zHeight = (containSize / width) * height;
                        var zWidth = containSize;
                        children.css("marginTop", -(zHeight - containSize) / 2);
                    }
                    children.css("width", zWidth);
                    children.css("height", zHeight);
                });
            }
        };
    });
    /**
     * 过滤器
     * 图片路径为空时，设置默认的头像
     * sex:使用不同性别的头像
     */
    app.filter("defaultHeadImg", function () {
        return function (input, sex) {
            if (input === null || input === "") {
                input = "../contents/img/men-head.png";
            }
            else {
                input = "../contents/img/women-head.png";
            }
            return input;
        };
    });
    /**
     * 过滤器
     * 图片路径为空时，设置默认图片
     * type:根据不同的类别使用不同的图片,doc->医生,pro->项目
     */
    app.filter("defaultImg", function () {
        return function (input, type) {
            if (input === null || input === "") {
                if (type === "doc") {
                    input = "../contents/img/doc-head.png";
                }
                if (type === "pro") {
                    input = "../contents/img/p_default.png";
                }
            }
            return input;
        };
    });
    /**
     * 加载并注册控制器
     */
    function loadCtrl(obj) {
        return {
            "nothing": function ($q, $controllerProvider) {
                var defered = $q.defer();
                require([obj.url], function (controller) {
                    $controllerProvider.register(obj.name, controller);
                    defered.resolve();
                });
                return defered.promise;
            }
        };
    }
    return app;
});
