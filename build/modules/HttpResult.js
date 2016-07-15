/// <reference path="./../../typings/index.d.ts" />
"use strict";
/**
 * HttpResult
 * http响应对象
 */
class HttpResult {
    /**
     * 构建HttpResult对象
     */
    constructor(data, code, message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }
    /**
     * 静态创建HttpResult对象
     * data->数据主体,code:状态码,message:消息文本
     */
    static CreateResult(data, code, message) {
        return new HttpResult(data, code, message);
    }
    /**
     * 静态创建失败的HttpResult对象
     */
    static CreateFailResult(message) {
        return new HttpResult({}, 1, message);
    }
}
module.exports = HttpResult;
//# sourceMappingURL=HttpResult.js.map