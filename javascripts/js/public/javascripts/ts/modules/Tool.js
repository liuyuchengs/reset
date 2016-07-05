define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * 工具模块
     */
    var Tool = (function () {
        function Tool() {
        }
        // 设置local
        Tool.setLocal = function (key, val) {
            localStorage.setItem(key, JSON.stringify(val));
        };
        // 查找local
        Tool.getLocal = function (key) {
            return JSON.parse(localStorage.getItem(key));
        };
        // 删除local
        Tool.removeLocal = function (key) {
            localStorage.removeItem(key);
        };
        // 清除local
        Tool.clearLocal = function () {
            localStorage.clear();
        };
        // 设置session
        Tool.setSession = function (key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        };
        // 查找session
        Tool.getSession = function (key) {
            sessionStorage.getItem(key);
        };
        // 删除session
        Tool.removeSession = function (key) {
            sessionStorage.removeItem(key);
        };
        // 跳转到指定url
        Tool.toUrl = function (url) {
            if (url.length > 0) {
                location.href = url;
            }
        };
        // 判断是否登录
        Tool.checkLogin = function () {
            if (Tool.getLocal("user")) {
                return true;
            }
            else {
                return false;
            }
        };
        // 判断用户是否完成用户信息
        Tool.infoComplete = function () {
            if (Tool.getLocal("user")) {
                var user = this.getLocal("user");
                if (Tool.emptyObject(user)) {
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
        // 判断变量是否为空
        Tool.empty = function (params) {
            var types = typeof params;
            switch (types) {
                case "string":
                    if (params === null || params === "") {
                        return true;
                    }
                    else {
                        return false;
                    }
                case "number":
                    if (params === null) {
                        return true;
                    }
                    else {
                        return false;
                    }
                case "boolean":
                    return params;
                default:
                    return false;
            }
        };
        // 判断对象是否为空,true:为空，false:非空
        Tool.emptyObject = function (obj) {
            var result = false;
            for (var props in obj) {
                if (Tool.empty(obj[props])) {
                    result = true;
                }
            }
            return result;
        };
        // 下拉菜单选择项
        Tool.select = function (pro, obj) {
            for (var proto in obj) {
                if (proto == pro) {
                    if (obj[proto].has) {
                        obj[proto].has = true;
                    }
                }
                else {
                    if (obj[proto].has) {
                        obj[proto].has = false;
                    }
                }
            }
        };
        //获取用户信息
        Tool.getUser = function () {
            if (Tool.checkLogin()) {
            }
        };
        //将对象转换成字符串
        Tool.convertObj = function (obj) {
            var str = "";
            for (var prop in obj) {
                if (obj[prop] != null) {
                    str += "&" + prop + "=" + obj[prop];
                }
            }
            str = str.slice(0, 1); //截取第一个"&"
            return str;
        };
        //获取查询参数
        Tool.queryString = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        };
        //取消window监听
        Tool.cancelWindowListen = function () {
            window.onscroll = null;
        };
        Tool.host = "https://www.uokang.com";
        return Tool;
    }());
});
