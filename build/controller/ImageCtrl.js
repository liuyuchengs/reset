"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const MysqlConnect = require("./../modules/MysqlConnect");
/**
 * ImageCtrl
 */
class ImageCtrl {
    constructor() {
    }
    static queryImage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = null;
            if (params.type === "PRODUCT") {
                sql = "select path as url from product_image where flag = 1 and productid = " + params.mainId;
            }
            else if (params.type === "HOSPITAL") {
                sql = "select path as url from hospital_image where hospital_id = " + params.mainId;
            }
            if (sql) {
                try {
                    let result = yield MysqlConnect.query(sql);
                    return new Promise((resolve) => {
                        resolve(result);
                    });
                }
                catch (err) {
                    return new Promise((resolve, reject) => {
                        reject(err);
                    });
                }
            }
        });
    }
}
module.exports = ImageCtrl;
//# sourceMappingURL=ImageCtrl.js.map