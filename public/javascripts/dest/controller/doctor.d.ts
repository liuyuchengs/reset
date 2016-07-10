/// <reference path="../../../../typings/index.d.ts" />
import IRootScope = require("IRootScope");
import Tool = require("./../modules/Tool");
import Ajax = require("./../modules/Ajax");
declare function doctor($scope: any, $rootScope: IRootScope.rootScope, ToolService: Tool, AjaxService: Ajax): void;
export = doctor;
