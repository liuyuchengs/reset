define(["require", "exports"], function (require, exports) {
    "use strict";
    var Ajax = (function () {
        function Ajax($rootScope, $http, $q, Tool) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$q = $q;
            this.Tool = Tool;
        }
        /**
         * $http get请求
         * @params obj->请求参数，obj.url->地址
         */
        Ajax.prototype.get = function (obj) {
            var _this = this;
            if (obj.url) {
                this.$rootScope.load.has = true;
                var defered_1 = this.$q.defer();
                var headers = {};
                if (obj.headers) {
                    if (obj.headers.accessToken) {
                        headers["accessToken"] = obj.headers.accessToken;
                    }
                }
                this.$http.get(obj.url, {
                    headers: headers
                }).success(function (data) {
                    _this.$rootScope.load.has = false;
                    return defered_1.resolve(data);
                }).error(function (data) {
                    _this.$rootScope.load.has = false;
                    _this.alert("连接数据失败");
                    return defered_1.reject(data);
                });
                return defered_1.promise;
            }
        };
        /**
         * $http post请求
         *
         */
        Ajax.prototype.post = function (obj) {
            var _this = this;
            if (obj.url) {
                this.$rootScope.load.has = true;
                var defered_2 = this.$q.defer();
                var headers = {};
                if (obj.headers) {
                    if (obj.headers.contentType) {
                        headers["Content-Type"] = obj.headers.contentType;
                    }
                    if (obj.headers.accessToken) {
                        headers["accessToken"] = obj.headers.accessToken;
                    }
                }
                var dataStr = this.Tool.convertParams(obj.data);
                this.$http.post(obj.url, dataStr, {
                    headers: headers
                }).success(function (data) {
                    _this.$rootScope.load.has = false;
                    return defered_2.resolve(data);
                }).error(function (data) {
                    _this.$rootScope.load.has = false;
                    _this.alert("连接数据失败");
                    return defered_2.reject(data);
                });
                return defered_2.promise;
            }
        };
        /**
         * 文本提示
         */
        Ajax.prototype.alert = function (mess, callback) {
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
        return Ajax;
    }());
    return Ajax;
});
