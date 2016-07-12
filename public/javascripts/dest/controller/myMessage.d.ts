import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
declare function myMessage($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, ToolService: Tool, AjaxService: Ajax): void;
export = myMessage;
