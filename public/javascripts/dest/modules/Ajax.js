define(["require", "exports"], function (require, exports) {
    "use strict";
    var Ajax = (function () {
        function Ajax($rootScope, $http, $q, ToolService) {
            this.$rootScope = $rootScope;
            this.$http = $http;
            this.$q = $q;
            this.ToolService = ToolService;
        }
        /**
         * $http get请求
         * @params obj->请求参数，obj.url->地址
         */
        Ajax.prototype.get = function (obj) {
            if (obj.url) {
                this.$rootScope.load.has = true;
                var defered_1 = this.$q.defer();
                this.$http.get(obj.url, {
                    headers: {
                        accessToken: obj.headers.accessToken
                    },
                }).success(function (data) {
                    return defered_1.resolve(data);
                }).error(function (data) {
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
            if (obj.url) {
                this.$rootScope.load.has = true;
                var defered_2 = this.$q.defer();
                var headers = {
                    "accessToken": "",
                    "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
                };
                if (obj.headers) {
                    if (obj.headers.contentType) {
                        headers["Content-type"] = obj.headers.contentType;
                    }
                    if (obj.headers.accessToken) {
                        headers["accessToken"] = obj.headers.accessToken;
                    }
                }
                var paramsStr = this.ToolService.convertParams(obj.data);
                this.$http.post(obj.url, paramsStr, {
                    headers: headers
                }).success(function (data) {
                    return defered_2.resolve(data);
                }).error(function (data) {
                    return defered_2.reject(data);
                });
                return defered_2.promise;
            }
        };
        return Ajax;
    }());
    return Ajax;
});
