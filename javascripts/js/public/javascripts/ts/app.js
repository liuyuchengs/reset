/// <reference path="./../../../typings/index.d.ts" />
define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    var app = angular.module("myApp", ['ngRoute']);
    app.run(["$rootScope", "$location", function ($rootScope, $location) {
            $rootScope.navMenuParams;
        }]);
    return app;
});
