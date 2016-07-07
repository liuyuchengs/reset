/**
 * Tool extends ITool
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Tool = (function () {
        function Tool($rootScope, $location, host) {
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.host = host;
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
            return sessionStorage.getItem(key);
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
                if (this.emptyany(user)) {
                    return true;
                }
                else {
                    return false;
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
            this.$rootScope.message = mess;
            this.$rootScope.hasCancel = false;
            this.$rootScope.hasComfirm = true;
            this.$rootScope.hasTip = true;
            if (callback) {
                this.$rootScope.comfirm = callback;
            }
            else {
                this.$rootScope.comfirm = function () {
                    _this.$rootScope.hasTip = false;
                };
            }
        };
        /**
         * 带确认按钮和取消按钮的提示框
         * @params mess->提示文本,callback->确认按钮处理函数,必传
         */
        Tool.prototype.comfirm = function (mess, callback) {
            var _this = this;
            this.$rootScope.message = mess;
            this.$rootScope.hasCancel = true;
            this.$rootScope.hasComfirm = true;
            this.$rootScope.hasTip = true;
            this.$rootScope.cancel = function () {
                _this.$rootScope.hasTip = false;
            };
            this.$rootScope.comfirm = callback;
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
            for (var item in obj) {
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
        Tool.prototype.select = function (index, container) {
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
        };
        /**
         * 将对象转换成字符串
         * @params obj->需要转换的对象
         * return 转换成的字符串
         */
        Tool.prototype.convertParams = function (array) {
            var str = "";
            for (var i = 0; i < array.length; i++) {
                if (array[i][1] != null) {
                    str += "&" + array[i][0] + "=" + array[i][1];
                }
            }
            str = str.slice(0, 1); //截取第一个"&"
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
        return Tool;
    }());
    return Tool;
});
