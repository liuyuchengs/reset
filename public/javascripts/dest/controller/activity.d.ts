/// <reference path="../../../../typings/index.d.ts" />
import IRootScope = require("IRootScope");
import ag = require("angular");
import Tool = require("./../modules/Tool");
import Ajax = require("./../modules/Ajax");
declare function activity($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, ToolService: Tool, AjaxService: Ajax): void;
export = activity;
