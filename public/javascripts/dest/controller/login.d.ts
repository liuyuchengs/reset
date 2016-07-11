import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
declare function login($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, AjaxService: Ajax, ToolService: Tool): void;
export = login;
