import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");
import Weixin = require("../modules/Weixin");
declare function invite($scope: any, $rootScope: IRootScope.rootScope, $location: ag.ILocationService, ToolService: Tool, AjaxService: Ajax, WeixinService: Weixin): void;
export = invite;
