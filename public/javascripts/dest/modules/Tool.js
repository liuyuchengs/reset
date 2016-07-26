define(["require", "exports"], function (require, exports) {
    "use strict";
    var Tool = (function () {
        function Tool($rootScope, $location, host) {
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.host = host;
            /**
             * 区域分类参数
             */
            this.areaParams = [
                { has: true, val: "全部区域", id: "" },
                { has: false, val: "福田区", id: "福田区" },
                { has: false, val: "南山区", id: "南山区" },
                { has: false, val: "罗湖区", id: "罗湖区" },
                { has: false, val: "宝安区", id: "宝安区" },
                { has: false, val: "龙华新区", id: "龙华新区" },
                { has: false, val: "龙岗区", id: "龙岗区" },
                { has: false, val: "盐田区", id: "盐田区" },
            ];
            /**
             * 牙科页面项目分类参数
             */
            this.yakeParams = [
                { has: true, val: "全部", id: null, src: "../contents/svg/yake/all.svg" },
                { has: false, val: "种植牙", id: 19, src: "../contents/svg/yake/zzy.svg" },
                { has: false, val: "洗牙", id: 20, src: "../contents/svg/yake/xiya.svg" },
                { has: false, val: "烤瓷牙", id: 80, src: "../contents/svg/yake/kcy.svg" },
                { has: false, val: "补牙", id: 22, src: "../contents/svg/yake/buya.svg" },
                { has: false, val: "拔牙", id: 23, src: "../contents/svg/yake/baya.svg" },
                { has: false, val: "牙齿美容", id: 24, src: "../contents/svg/yake/ycmr.svg" },
                { has: false, val: "牙齿矫正", id: 64, src: "../contents/svg/yake/jiaozheng.svg" },
                { has: false, val: "义齿", id: 65, src: "../contents/svg/yake/yichi.svg" },
                { has: false, val: "牙周治疗", id: 63, src: "../contents/svg/yake/yzzl.svg" },
                { has: false, val: "其他", id: 60, src: "../contents/svg/yake/qita.svg" },
            ];
            /**
             * 美容页面项目分类参数
             */
            this.meirongParams = [
                { has: true, val: "全部", id: null, src: "../contents/svg/meirong/all.svg" },
                { has: false, val: "眼部整形", id: 7, src: "../contents/svg/meirong/yanmei.svg" },
                { has: false, val: "面部整形", id: 8, src: "../contents/svg/meirong/mianbu.svg" },
                { has: false, val: "鼻部整形", id: 9, src: "../contents/svg/meirong/bibu.svg" },
                { has: false, val: "胸部整形", id: 45, src: "../contents/svg/meirong/xiong.svg" },
                { has: false, val: "吸脂塑形", id: 12, src: "../contents/svg/meirong/xizhi.svg" },
                { has: false, val: "私密整形", id: 78, src: "../contents/svg/meirong/simi.svg" },
                { has: false, val: "注射美容", id: 79, src: "../contents/svg/meirong/zhushe.svg" },
                { has: false, val: "激光美肤", id: 80, src: "../contents/svg/meirong/jiguang.svg" },
                { has: false, val: "口唇整形", id: 81, src: "../contents/svg/meirong/koucun.svg" },
                { has: false, val: "其他", id: 13, src: "../contents/svg/meirong/qita.svg" },
            ];
            /**
             * 妇产科项目分类参数
             */
            this.fckParams = [
                { has: true, val: "全部", id: null, src: "../contents/svg/fck/all.svg" },
                { has: false, val: "产前检查", id: 48, src: "../contents/svg/fck/jiancha.svg" },
                { has: false, val: "分娩", id: 49, src: "../contents/svg/fck/fenmian.svg" }
            ];
            /**
             * 中医页面项目分类参数
             */
            this.zhongyiParams = [
                { has: true, val: "全部", id: null, src: "../contents/svg/zhongyi/all.svg" },
                { has: false, val: "头部", id: 51, src: "../contents/svg/zhongyi/toubu.svg" },
                { has: false, val: "肩颈", id: 52, src: "../contents/svg/zhongyi/jianjing.svg" },
                { has: false, val: "腰部", id: 53, src: "../contents/svg/zhongyi/yaobu.svg" },
                { has: false, val: "腿部", id: 54, src: "../contents/svg/zhongyi/tuibu.svg" },
                { has: false, val: "全身", id: 55, src: "../contents/svg/zhongyi/quanshen.svg" },
                { has: false, val: "经络", id: 56, src: "../contents/svg/zhongyi/jingluo.svg" },
                { has: false, val: "其他", id: 57, src: "../contents/svg/zhongyi/qita.svg" }
            ];
            /**
             * 体检页面项目分类参数
             */
            this.tijianParams = [
                { has: true, val: "全部项目", id: null },
                { has: false, val: "商业体检", id: 75 },
                { has: false, val: "常规体检", id: 67 },
                { has: false, val: "中年体检", id: 69 },
                { has: false, val: "老年体检", id: 70 },
                { has: false, val: "入职体检", id: 71 },
                { has: false, val: "孕前体检", id: 72 },
                { has: false, val: "青年体检", id: 68 },
                { has: false, val: "儿童体检", id: 74 },
                { has: false, val: "慢病体检", id: 73 },
            ];
            /**
             * 排序参数
             */
            this.orderParams = [
                { has: true, val: "全部项目", id: "" },
                { has: false, val: "价格最低", id: "prefer_price asc" },
                { has: false, val: "价格最高", id: "prefer_price desc" },
                { has: false, val: "评分最高", id: "hospital_score asc" },
                { has: false, val: "销量最高", id: "sales desc" },
                { has: false, val: "距离最近", id: "locationes" },
            ];
            /**
             * 性别排序
             */
            this.sexParams = [
                { has: true, val: "通用", id: "" },
                { has: false, val: "男", id: "男" },
                { has: false, val: "女", id: "女" },
            ];
            /**
             * 医生页面排序参数
             */
            this.doctorOrderParams = [
                { has: true, val: "默认排序", id: "" },
                { has: false, val: "按职称", id: "profession_title desc" },
                { has: false, val: "按评分", id: "score desc" },
            ];
            /**
             * 医生页面专科参数
             */
            this.professionalParams = [
                { has: true, val: "全部项目", id: null, children: [{ has: false, val: "全部", id: "" }] },
                { has: false, val: "牙科", id: 2, children: this.yakeParams.slice(1) },
                { has: false, val: "医学美容", id: 3, children: this.meirongParams.slice(1) },
                { has: false, val: "高端妇产科", id: 4, children: this.fckParams.slice(1) },
                { has: false, val: "中医理疗", id: 6, children: this.zhongyiParams.slice(1) },
                { has: false, val: "体检", id: 5, children: this.tijianParams.slice(1) }
            ];
        }
        /**
         * 设置local
         * @params key:localStorage键,val:localStorage值
         */
        Tool.prototype.setLocal = function (key, val) {
            localStorage.setItem(key, JSON.stringify(val));
        };
        /**
         * 查找local
         * @params key:localStorage键
         * return localStorage值
         */
        Tool.prototype.getLocal = function (key) {
            return JSON.parse(localStorage.getItem(key));
        };
        /**
         * 删除local
         * @params key->localStorage键
         */
        Tool.prototype.removeLocal = function (key) {
            localStorage.removeItem(key);
        };
        /**
         * 清除所有local
         */
        Tool.prototype.clearLocal = function () {
            localStorage.clear();
        };
        /**
         * 设置session
         * @params key->session键,val->session值
         */
        Tool.prototype.setSession = function (key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        };
        /**
         * 查找session
         * @params key->session键
         * return session值
         */
        Tool.prototype.getSession = function (key) {
            return JSON.parse(sessionStorage.getItem(key));
        };
        /**
         * 删除session
         * @params key->需要删除的session键
         */
        Tool.prototype.removeSession = function (key) {
            sessionStorage.removeItem(key);
        };
        /**
         * 跳转到指定url
         * @params url->需要跳转的完整url
         */
        Tool.prototype.toUrl = function (url) {
            if (url.length > 0) {
                location.href = url;
            }
        };
        /**
         * 改变路由
         * @params path->路径,search->查询字符串
         */
        Tool.prototype.changeRoute = function (path, search) {
            this.$location.path(path);
            if (search) {
                this.$location.search(search);
            }
            else {
                this.$location.search("");
            }
        };
        /**
         * 通过检查localStorage,判断是否登录
         */
        Tool.prototype.checkLogin = function () {
            if (this.getLocal("user")) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 判断用户是否完成用户信息,检查所有项
         */
        Tool.prototype.infoComplete = function () {
            if (this.getLocal("user")) {
                var user = this.getLocal("user");
                if (this.empty(user.phone) || this.empty(user.realname) || this.empty(user.age) || this.empty(user.age)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        };
        /**
         * 确认按钮的提示框
         * @params mess->提示文本，callback->确认按钮处理函数，不传则使用默认处理函数
         */
        Tool.prototype.alert = function (mess, callback) {
            var _this = this;
            this.$rootScope.messageTip.message = mess;
            this.$rootScope.messageTip.hasCancel = false;
            this.$rootScope.messageTip.hasComfirm = true;
            this.$rootScope.messageTip.has = true;
            if (callback) {
                this.$rootScope.messageTip.comfirm = callback;
            }
            else {
                this.$rootScope.messageTip.comfirm = function () {
                    _this.$rootScope.messageTip.has = false;
                };
            }
        };
        /**
         * 带确认按钮和取消按钮的提示框
         * @params mess->提示文本,callback->确认按钮处理函数,必传
         */
        Tool.prototype.comfirm = function (mess, callback) {
            var _this = this;
            this.$rootScope.messageTip.message = mess;
            this.$rootScope.messageTip.hasCancel = true;
            this.$rootScope.messageTip.hasComfirm = true;
            this.$rootScope.messageTip.has = true;
            this.$rootScope.messageTip.cancel = function () {
                _this.$rootScope.messageTip.has = false;
            };
            this.$rootScope.messageTip.comfirm = callback;
        };
        /**
         * 获取用户信息
         */
        Tool.prototype.loadUser = function () {
            this.user = this.getLocal("user");
        };
        /**
         * 判断变量是否为空
         * @params params->判断该变量是否为空，支持string,number,boolean
         * return ture->为空,false->非空
         */
        Tool.prototype.empty = function (params) {
            if (typeof params === "string") {
                if (params === null || params === "") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (typeof params === "number") {
                if (params === null) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (typeof params === "boolean") {
                return params;
            }
            else {
                return false;
            }
        };
        /**
         * 判断对象是否为空
         * @params obj->判断该对象是否为空，检查所有属性
         * return true->为空，false->非空
         */
        Tool.prototype.emptyany = function (obj) {
            var result = false;
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var item = obj_1[_i];
                if (this.empty(item)) {
                    result = true;
                }
            }
            return result;
        };
        /**
         * 设置下拉菜单项为选择状态
         * @params index->需要设置为选择状态的下拉对象索引，container->下拉对象容器
         */
        Tool.prototype.select = function (index, container, cancel) {
            if (cancel === void 0) { cancel = false; }
            //如果已经选择则不做处理
            if (!container[index].has) {
                for (var _i = 0, container_1 = container; _i < container_1.length; _i++) {
                    var item = container_1[_i];
                    if (item.has) {
                        item.has = false;
                    }
                }
                container[index].has = true;
            }
            else if (cancel) {
                container[index].has = false;
            }
        };
        /**
         * 将对象转换成字符串
         * @params obj->需要转换的对象
         * return 转换成的字符串
         */
        Tool.prototype.convertParams = function (obj) {
            var str = "";
            for (var key in obj) {
                if (obj[key] !== null) {
                    str += key + "=" + obj[key] + "&";
                }
            }
            str = str.slice(0, str.length - 1); //截取第一个"&"
            return str;
        };
        /**
         * 获取查询参数
         * @params name->查询参数的key
         * return 查询参数的值，如果有
         */
        Tool.prototype.queryString = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        };
        /**
         * 取消window的scroll监听
         */
        Tool.prototype.cancelWindowListen = function () {
            window.onscroll = null;
        };
        /**
         * 添加window的scroll监听
         */
        Tool.prototype.onWindowListen = function (fn) {
            var _this = this;
            window.onscroll = function () {
                if (!(_this.$rootScope.load.has || _this.$rootScope.followTip.has)) {
                    var body = document.body;
                    var html = document.documentElement;
                    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                    if (height > window.innerHeight) {
                        if (height - window.scrollY - window.innerHeight < 100) {
                            fn();
                        }
                    }
                }
            };
        };
        /**
         * 加载并注册控制器
         */
        Tool.loadCtrl = function (obj, $controllerProvider) {
            return {
                nothing: function ($q) {
                    var defered = $q.defer();
                    require([obj.url], function (controller) {
                        $controllerProvider.register(obj.name, controller);
                        defered.resolve();
                    });
                    return defered.promise;
                }
            };
        };
        /**
         * 重置全局变量
         */
        Tool.prototype.reset = function () {
            this.$rootScope.followTip.has = false;
            this.$rootScope.followTip.val = null;
            this.$rootScope.globalProp.hasBgColor = false;
            this.$rootScope.globalProp.hasBlackBg = false;
            this.cancelWindowListen();
        };
        return Tool;
    }());
    return Tool;
});
