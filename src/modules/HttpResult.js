/// <reference path="./../../typings/index.d.ts" />
"use strict";
/**
 * @class
 * @classdesc http请求的响应结果
 */
class HttpResult {
    /**
     * 构建HttpResult对象
     * @param {any} data - 响应的数据
     * @param {number} code - 响应的状态码,0->成功,1->失败
     * @param {string} message - 消息文本
     */
    constructor(data, code, message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }
    /**
     * 创建HttpResult对象
     * @static
     * @param {any} data - 数据主体
     * @param {number} code - 状态码
     * @Param {string} message - 消息文本
     * @returns {HttpResult} 创建的HttpResult对象
     */
    static CreateResult(data, code, message) {
        return new HttpResult(data, code, message);
    }
    /**
     * 创建失败结果的HttpResult对象
     * @static
     * @param {string} message - 失败对象的提示文本
     * @returns {HttpResult} 创建的代表失败的HttpResult对象
     */
    static CreateFailResult(message) {
        return new HttpResult({}, 1, message);
    }
    /**
     * 创建成功结果的HttpResult对象
     * @static
     * @param {any} obj - 数据主体
     * @returns {HttpResult} 创建的代表成功的HttpResult对象
     */
    static CreateSuccessResult(obj) {
        return new HttpResult(obj, 0, "success");
    }
}
module.exports = HttpResult;
//# sourceMappingURL=HttpResult.js.map