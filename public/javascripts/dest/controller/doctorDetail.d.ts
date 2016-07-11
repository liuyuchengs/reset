import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
declare function doctorDetail($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, $anchorScroll: ag.IAnchorScrollService, AjaxService: Ajax, ToolService: Tool): void;
export = doctorDetail;
