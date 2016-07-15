"use strict";
/**
 * Tool
 * 工具类
 */
class Tool {
    constructor() {
    }
    static FilterResult(dest, source) {
        let result = {};
        for (let item of dest) {
            if (source[item]) {
                result[item] = source[item];
            }
            else {
                result[item] = null;
            }
        }
        return result;
    }
}
module.exports = Tool;
//# sourceMappingURL=Tool.js.map