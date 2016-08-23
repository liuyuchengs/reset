define(["require", "exports"], function (require, exports) {
    "use strict";
    class Ajax {
        constructor($rootScope, $http, $q, Tool) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$q = $q;
            this.Tool = Tool;
        }
        /**
         * $http get请求
         * @params obj->请求参数，obj.url->地址
         */
        get(obj) {
            if (obj.url) {
                this.$rootScope.load.has = true;
                let defered = this.$q.defer();
                let headers = {};
                if (obj.headers) {
                    if (obj.headers.accessToken) {
                        headers["accessToken"] = obj.headers.accessToken;
                    }
                }
                this.$http.get(obj.url, {
                    headers: headers
                }).success((data) => {
                    this.$rootScope.load.has = false;
                    return defered.resolve(data);
                }).error((data) => {
                    this.$rootScope.load.has = false;
                    this.alert("连接数据失败");
                    return defered.reject(data);
                });
                return defered.promise;
            }
        }
        /**
         * $http post请求
         *
         */
        post(obj) {
            if (obj.url) {
                this.$rootScope.load.has = true;
                let defered = this.$q.defer();
                var headers = {};
                if (obj.headers) {
                    if (obj.headers.contentType) {
                        headers["Content-Type"] = obj.headers.contentType;
                    }
                    if (obj.headers.accessToken) {
                        headers["accessToken"] = obj.headers.accessToken;
                    }
                }
                let dataStr = this.Tool.convertParams(obj.data);
                this.$http.post(obj.url, dataStr, {
                    headers: headers
                }).success((data) => {
                    this.$rootScope.load.has = false;
                    return defered.resolve(data);
                }).error((data) => {
                    this.$rootScope.load.has = false;
                    this.alert("连接数据失败");
                    return defered.reject(data);
                });
                return defered.promise;
            }
        }
        /**
         * 文本提示
         */
        alert(mess, callback) {
            this.$rootScope.messageTip.message = mess;
            this.$rootScope.messageTip.hasCancel = false;
            this.$rootScope.messageTip.hasComfirm = true;
            this.$rootScope.messageTip.has = true;
            if (callback) {
                this.$rootScope.messageTip.comfirm = callback;
            }
            else {
                this.$rootScope.messageTip.comfirm = () => {
                    this.$rootScope.messageTip.has = false;
                };
            }
        }
    }
    return Ajax;
});
//# sourceMappingURL=Ajax.js.map