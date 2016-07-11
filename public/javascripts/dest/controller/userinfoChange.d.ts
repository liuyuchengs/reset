import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
declare function userChange($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, $timeout: ag.ITimeoutService, $http: ag.IHttpService, AjaxService: Ajax, ToolService: Tool): void;
export = userChange;
