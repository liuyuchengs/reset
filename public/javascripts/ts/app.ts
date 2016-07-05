/// <reference path="./../../../typings/index.d.ts" />

import angular = require("angular");
import User = require("./modules/data/User");
var app = angular.module("myApp",['ngRoute']);
app.run(["$rootScope","$location",function($rootScope,$location){
    $rootScope.navMenuParams
}])

export = app;
