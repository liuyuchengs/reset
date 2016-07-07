/// <reference path="../../../typings/index.d.ts" />
/**
 * 项目说明：
 * 1.所有angular依赖注入均为推断注入，压缩js时需防止变量名修改
 * 2.为减少http访问次数，尽量合并代码，减少文件数量
 */
import ag = require("angular");
declare var app: ag.IModule;
export = app;
